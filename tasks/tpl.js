//tpl.html to tpl.js
var path = require('path');
var fs = require('fs');
var Helper = require('./helper');
var config = require('../config');


/*
    在tpl目录下 建立 单个html静态文件,文件名称不能重复,不能建立目录！！
    buildPath : js/_tpl/*.js
*/

var tpl = function(callback){

        var tplPath = config.tpl.src;
        var tplOutPath = config.tpl.build;
        fs.readdirSync(tplPath).forEach(function(file){
            var source,
                file_name,
                tpl_soure,
                file,
                tplData = {},
                filePath = path.join(tplPath, file);
            if (file.indexOf('.html') !== -1 && file.indexOf('.') !== 0) {
                file_name = file.replace('.html', '');
                source = fs.readFileSync(filePath, 'utf8');
                source = Helper.htmlMinify(source);
                tplData[file_name] = source;
                tpl_soure = "define(function(){return " + (JSON.stringify(tplData)) + ";});";
                file = path.join(tplOutPath, file_name + '.js');
                if(!fs.existsSync(tplOutPath)){
                     fs.mkdirSync(tplOutPath);
                }
                fs.writeFileSync(file, tpl_soure, 'utf8');
            }
        })

        console.log('构建tpl.html--到---tpl.js完成');
        callback && callback();
};

module.exports = tpl;