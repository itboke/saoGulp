/*全局的工具方法*/
var path = require('path');
var helper = {


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