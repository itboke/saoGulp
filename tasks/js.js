/*combinejs*/
var gulp = require('gulp');
var jsPack = require('gulp-seajs-combo');

/*合并依赖js并压缩*/
var buildJs = function(data){
  var filePath = String(data.path).replace(/\\/g,'/');
  var fileName = "";
  var appJs = "";
  var appJsPath = config.jsAppPath;
  if(filePath.indexOf('/app') > -1){
      fileName = filePath.split(config.jsAppPath)[1];
      if(fileName.indexOf('/') === -1){
        console.log(fileName);
        appJs = fileName;
        appJsPath = appJsPath + '/' + appJs;
        gulp.src(appJsPath)
            .pipe(jsPack())
            .pipe(gulp.dest(config.js.dist));
      }
  }
};
var jsCombine=function(callback){
    gulp.src(config.js.src)
        .pipe(gulp.dest(config.js.build)).on('end',function(){
            console.log('js构建完成!');
            callback && callback();
        });
        /*
        .on('data',function(data){
          buildJs(data);
        })
        */
};

module.exports = jsCombine;