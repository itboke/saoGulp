/*文件操作*/
var fs = require('fs');
var file = {
    iterator: function(url,dirs) {
        var _self = this;
        var stat = fs.statSync(url);
        if (stat.isDirectory()) {
            dirs.unshift(url); //收集目录
            _self.inner(url,dirs);
        } else if (stat.isFile()) {
            fs.unlinkSync(url); //直接删除文件
        }
    },
    inner: function(path,dirs) {
        var _self = this;
        var arr = fs.readdirSync(path);
        for (var i = 0, el; el = arr[i++];) {
            _self.iterator(path + "/" + el,dirs);
        }
    },
    rmdirSync: function(dir,cb) {
        cb = cb || function(){};
        var _self = this;
        var dirs = [];
        try {
            _self.iterator(dir, dirs);
            for(var i = 0, el ; el = dirs[i++];){
                fs.rmdirSync(el);//一次性删除所有收集到的目录
            }
            cb();
        } catch (e){
             e.code === "ENOENT" ? cb() : cb(e);
        }
    }

};


module.exports = file;
