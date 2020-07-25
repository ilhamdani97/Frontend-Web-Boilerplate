const fs = require('fs');
const FN = require('./function.js');
const configs = require('./configs.js');

const [, , ...args] = process.argv;

class BaseClass {
    constructor(){
        this.args = args;
        this.cmd = FN.cmdOptions(args, configs);
        this.dir = FN.getDir();

        const { cmd, dir } = this;
        this.options = FN.generateOptions(configs, cmd, dir);
    }
}

class Create extends BaseClass {

    async checkIsExist(options){
        const { fileCreate } = options;
        if (fs.existsSync(fileCreate.path)) {
            FN.message(`${fileCreate.nameWithExtention} is already exists`, "error");
        }
    }

    async createFile(options){
        const { fileCreate, fileGenerator } = options;
        const fileContent = fs.readFileSync(`${fileGenerator}`, 'utf8');

        return fs.writeFile(fileCreate.path, FN.updateFileContent(fileContent, fileCreate.name), (err)=> {
            if (err) throw err;
            FN.message(`Create ${fileCreate.nameWithExtention} on \n${fileCreate.path}`, "success");
        });

    }

    async reMapingFiles(options){
        const { remapFile, targetPath } = options;

        let filesList = FN.findFilesInDir(targetPath, '.js');
        filesList = FN.filesLists(filesList);
        filesList = FN.cleanArray(filesList, "index");

        const indexContent = FN.createIndexContent(filesList);
        const indexFile = targetPath + "/" + remapFile;

        return fs.writeFile(indexFile, indexContent, (err)=> {
            if (err) throw err;
            FN.message(`Remaping index.js \n${indexContent} on \n${indexFile}`, "success");
        });
    }

    async run(options){
        await this.checkIsExist(options);
        await this.createFile(options);
        if( options.remap){
            await this.reMapingFiles(options);
        }
    }

    init(){
        const { options } = this;
        this.run(options);
    }
}

const runCreate = new Create();
runCreate.init();
