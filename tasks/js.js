/*combinejs*/
var gulp = require('gulp');
var jsPack = require('gulp-seajs-combo');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var config = require('../config');

/*合并依赖js并压缩*/
var buildJs = function(callback){

    gulp.src('./src/js/app/*.js')
        .pipe(jsPack())
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest(config.js.dist))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./dist/map/js'))
        .on('end',callback);
    console.log('js构建完成!!!!!!');
};
var jsCombine=function(callback){
    if(config.env === 'test' || config.env ==='www'){
        jsPublish(callback);
    }else{
        jsBuild(callback);
    }
};
/*开发环节 调用*/
var jsBuild = function(callback){
    gulp.src(config.js.src)
        .pipe(gulp.dest(config.js.build)).on('end',function(){
            console.log('js构建完成!');
            callback && callback();
        });
};
/* 发布环节 调用 */
var jsPublish = function(callback){
    /*合成核心JS*/
    gulp.src(['./src/js/core/sea.js','./src/js/core/jquery.js','./src/js/core/avalon.js'])
        .pipe(concat(config.coreJs.coreName))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest(config.js.dist))
        .pipe(rev.manifest('coreJs.json'))
        .pipe(gulp.dest('./dist/map/'))
        .on('end',function(){
            buildJs(callback);
        })
};

module.exports = jsCombine;