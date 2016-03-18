/*全局的工具方法*/
var path = require('path');
var fs = require('fs');
var helper = {

    //创建构建目录
    mkdirsSync:function(dirpath,mode){
        if (fs.existsSync(dirpath)) {
           return true;
        } else {
          if (helper.mkdirsSync(path.dirname(dirpath), mode)) {
            fs.mkdirSync(dirpath, mode);
            return true;
          }
        }
    },
    //获取监控下文件修改的类型
    getFileType:function(filePath){
        var typeList = ['src/less','src/js','src/img','src/html','src/tpl'];
        var fileDirName = path.dirname(filePath);
        var type = '';
        typeList.map(function(value){
            if(fileDirName.indexOf(value) !== -1){
                type = value.replace('src/','');
            }
        })

        //var type = (path.parse(filePath).ext).replace('.', '');
        //console.log(type);
        return type;
    },
    //html内容格式化
    htmlMinify : function(source){
        var source;
        source = source.replace(/\/\*([\s\S]*?)\*\//g, '').replace(/<!--([\s\S]*?)-->/g, '').replace(/^\s+$/g, '').replace(/\n/g, '').replace(/\t/g, '').replace(/\r/g, '').replace(/\n\s+/g, ' ').replace(/\s+/g, ' ').replace(/>([\n\s]*?)</g, '><');
        return source;
    },
    getHashMaps:function(){
        var jsMap = {},
            cssMap = {},
            e;
        try{

        }catch(err){
            console.log(err);
        }
    }


};

module.exports = helper;