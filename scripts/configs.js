const configs = {
    component : {
        target : '{ROOT}/src/scripts/components',
        file : '{ROOT}/scripts/generator/component.js',
        entention : '.js',
        remap : true,
        remapFile : "index.js"
    },
    page : {
        target : '{ROOT}/src/scripts/pages',
        file : '{ROOT}/scripts/generator/pages.js',
        entention : '.js',
        remap : true,
        remapFile : "index.js"
    },
    pug : {
        target : '{ROOT}/src/scripts/pages',
        file : '{ROOT}/scripts/generator/pages.js'
    }
}

module.exports = configs;