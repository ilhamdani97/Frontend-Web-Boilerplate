const fs = require('fs');
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const os = require("os");

const FN = {};

FN.execAsync = async (cmd) => {
    return exec(cmd)
}

FN.error = (msg) => {
    console.log(msg || "Is not valid command");
    process.exit(1);
}

FN.toCapital = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

FN.createFullDir = (path, root) => {
    return path.replace("{ROOT}", root)
}

FN.strToArry = (str, splitBy) => {
    return str.split(splitBy);
}

FN.cutString = (str, cut) => {
    return str.replace(cut, "");
}

FN.cleanArray = (arr, clean) => {
    const temp = [];
    for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        if( element != clean){
            temp.push(element);
        }
    }
    return temp
}

FN.filesLists = (arr) => {
    const temp = [];
    for (let index = 0; index < arr.length; index++) {
        let element = arr[index];
        element = FN.strToArry(element, "/")
        element = FN.getLastArray(element);
        element = FN.cutString(element, ".js");
        temp.push(element);
    }
    return temp;
}

FN.createImportList = (arr) => {
    const temp = [];
    for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        temp.push(`import ${element} from './${element}';`)
    }
    return temp.join("\n");
}

FN.createMapList = (arr) => {
    return `{ ${arr.join(", \n    ")} }`
}

FN.createIndexContent = (arr) => {
    const importList = FN.createImportList(arr);
    const mapList = FN.createMapList(arr);
    return importList + "\n\nexport " + mapList;
}

FN.generateOptions = (configs, cmd, dir) => {
    const configTemp = configs[cmd.type];
    const name = cmd.name;
    const nameWithExtention = cmd.name + configTemp.entention

    const options = {
        targetPath : FN.createFullDir(configTemp.target, dir.root),
        fileGenerator : FN.createFullDir(configTemp.file, dir.root),
        fileCreate : {
            path : FN.createFullDir(configTemp.target, dir.root) + "/" + nameWithExtention,
            name : name,
            nameWithExtention : nameWithExtention
        }
    }

    return {...configTemp, ...options}

} 

FN.getDir = () => {
    const root = process.cwd();
    return {
        current: root,
        root: root,
        dirname: __dirname,
    }
}


FN.getLastArray = (arr) => {
    if(arr && arr.length){
        return arr[arr.length - 1]
    }
}

FN.replaceAll = (data, find, to) => {
    const re = new RegExp(find, "g");
    return data.replace(re, to);
}

FN.validateName = (str) => {
    return FN.replaceAll(str, `[0-9]`, "");
}

FN.cmdValidation = (args, configs) => {
    let type = args[0];
    let name = args[1];

    name = FN.validateName(name);

    let validComponent = /c|comp|component|components/.test(type);
    let validPage = /p|pg|page|pages/.test(type);

    if( validComponent){
        type = "component"
    }

    if( validPage ){
        type = "page"
    }

    if( typeof configs[type] == "undefined"){
        FN.message("Type not in config", "error");
    }

    return {
        type,
        name : FN.toCapital(name)
    }
}

FN.cmdOptions = (args, configs) => {
    if( args.length === 1){
        FN.message("Require name", "error")
    }
    if( args.length == 2){
        return FN.cmdValidation(args, configs)
    }
}

FN.findFilesInDir = (startPath, filter) => {
    let results = [];
    if (!fs.existsSync(startPath)) {
        console.log("no dir ", startPath);
        return;
    }
    const files = fs.readdirSync(startPath);
    for (let i = 0; i < files.length; i++) {
        let filename = path.join(startPath, files[i]);
        let stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            results = results.concat(FN.findFilesInDir(filename, filter)); //recurse
        }
        else if (filename.indexOf(filter) >= 0) {
            results.push(filename);
        }
    }
    return results;
}

FN.printDate = (dt) => {
    const months = [
        "Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul",
        "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const days = [
        "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
    ];

    const d = new Date(dt);
    const year = d.getFullYear()
    const month = d.getMonth();
    const date = d.getDate();
    const day = d.getDay();

    if (year ){
        return `${days[parseInt(day)]}, ${date} ${months[parseInt(month)]} ${year}`
    }
    return null

}
FN.updateFileContent = (content, name) => {
    const by = os.userInfo().username;
    const on = FN.printDate(Date.now())
    const commnet = FN.commentTemplate(name, by, on);
    return commnet + FN.replaceAll(content, '__NAME__', name);
}

FN.commentTemplate = (name, by, on) => {
    const temp =
`/*
name : ${name}
auto create By : ${by}
auto create On : ${on}
*/

`
    return temp
}

FN.message = (msg, type = "default", calback) => {
    function cb() {
        if (typeof calback == "function") {
            calback()
        }
        return void 0
    }
    if (type == "error") {
        console.log('\x1b[31m')
        console.log(`/***********************/`)
        console.log(msg)
        cb()
        console.log(`/***********************/`)
        console.log('\x1b[0m');
        process.exit(1);
    }
    if (type == "warning") {
        console.log('\x1b[33m')
        console.log(`/***********************/`)
        console.log(msg)
        cb()
        console.log('\x1b[33m')
        console.log(`/***********************/`)
        console.log('\x1b[0m');
    }
    if (type == "success") {
        console.log('\x1b[32m')
        console.log(`/***********************/`)
        console.log(`/******* SUCCESS *******/`)
        console.log(msg)
        cb()
        console.log('\x1b[32m')
        console.log(`/***********************/`)
        console.log('\x1b[0m');
    }
    if (type == "default") {
        console.log(msg)
        cb()
    }
}

module.exports = FN;
