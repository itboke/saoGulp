
/*字体文件简单构建*/
var config = require('../config');
var gulp = require('gulp');
var fonts = function(callback){


    if(config.env !== 'local'){

        gulp.src(config.fonts.src)
            .pipe(gulp.dest(config.fonts.dist)).on('end',function(){
                console.log('字体文件构建完成......');
                callback && callback();
            });

    }else{

        gulp.src(config.fonts.src)
            .pipe(gulp.dest(config.fonts.build)).on('end',function(){
                console.log('字体文件构建完成......');
                callback && callback();
            });
    }

};

module.exports = fonts;