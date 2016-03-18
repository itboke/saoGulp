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

        var type = (path.parse(filePath).ext).replace('.', '');
        return type;
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