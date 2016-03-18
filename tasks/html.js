var gulp = require('gulp');
var fileinclude  = require('./include');
var Helper = require('./helper');

var html = function(file,callback) {
    console.log('开始构建html......');

    //var hashMaps = Helper.getHashMaps();
    gulp.src(config.html.src)
        .pipe(fileinclude({
          prefix: '@@',
          basepath: '@file'
        }))
       .pipe(gulp.dest(config.html.build)).on('end',function(){
            console.log('html构建完成......');
            callback && callback();
       });
};

module.exports = html;