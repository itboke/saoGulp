var gulp = require('gulp');
var config = require('../config');
/*js 构建*/


var buildJs = function(data){

};

var jsCombine = function(callback){
    gulp.src(config.js.src)
        .pipe(gulp.dest(config.js.build)).on('end',function(){
            console.log('js构建完成!');
            callback && callback();
        });
};

module.exports = jsCombine;