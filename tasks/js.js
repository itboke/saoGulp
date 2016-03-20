/*combinejs*/
var gulp = require('gulp');
var jsPack = require('gulp-seajs-combo');

var buildJs = function(data){
  var filePath = String(data.path).replace(/\\/g,'/');
  var fileName = "";
  var appJs = "";
  var appJsPath = config.jsAppPath;
  if(filePath.indexOf('/app') > -1){
      fileName = filePath.split(config.jsAppPath)[1];
      if(fileName.indexOf('/') === -1){
        appJs = fileName;
        appJsPath = appJsPath + '/' + appJs;
        gulp.src(appJsPath)
            .pipe(jsPack())
            .pipe(gulp.dest('build/js/'));
      }
  }
};
var jsCombine=function(callback){
      gulp.src(config.js.src)
          .on('data',function(data){
            buildJs(data);
          })
          .pipe(gulp.dest(config.js.build)).on('end',function(){
              console.log('js构建完成!');
              callback && callback();
          });
};

module.exports = jsCombine;