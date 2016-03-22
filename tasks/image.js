//图片构建

var gulp = require('gulp');
var config = require('../config');
var rev = require('gulp-rev');

var image = function(callback){

    if(config.env === 'test' || config.env === 'www'){
        imagePublish(callback);
    }else{
        imageBuild(callback);
    }
};

var imageBuild = function(callback){
    gulp.src(config.images.src)
        .pipe(gulp.dest(config.images.build)).on('end',function(){
        console.log('图片复制完成......');
        callback && callback();
    });
};

var imagePublish = function(callback){
     gulp.src(config.images.build + '/**/*')
         .pipe(rev())
         .pipe(gulp.dest(config.images.dist))
         .pipe(rev.manifest({
            merge:true
         }))
         .pipe(gulp.dest('./dist/map'))
         .on('end',function(){
            console.log('图片复制完成......');
            callback && callback();
         });
};

module.exports = image;