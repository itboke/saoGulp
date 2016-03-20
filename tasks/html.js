var gulp = require('gulp');
var path = require('path');
var fs = require('fs');
var fileinclude  = require('./include');
var Helper = require('./helper');
var config = require('../config');

//匹配图片路径正则表达式
var imgReg = /<img[\s\S]*?[^(src)]src=('|")([^'|^"]*)('|")/g;
var srcReg = /src=('|")([^'|^"]*)('|")/;
var imgPathReg = '../';

//替换html文件中的图片路径
var replaceHtmlImgPath = function(resource){

  resource.replace(imgReg,function(str){
    /*if(str.indexOf('{{staticPath}}') === -1){
      return false;
    }*/
    var imgPathName = " ";
    str.replace(srcReg,function(word){
      imgPathName = word.replace(/src=/,'').replace(/(\'|\")|(\'|\"$)/g,'');
    })
    var name = imgPathName.replace(imgPathReg,"/");
    var staticPath = "//" + config.host + ":" + config.port + "/build";
    var outputPath = staticPath + name + '?t=' + String(new Date().getTime()).substr(0, config.hashLength);
    resource = resource.replace(imgPathName,outputPath);
  })
  return resource;
};

var buildHtml = function(data){


  var filePath = String(data.path).replace(/\\/g,'/');
  //console.log(filePath);
  //过滤_目录下的文件
  if(filePath.indexOf(config.htmlPath + '_') > -1){
    return false;
  }
  var fileName = filePath.split(config.htmlPath)[1];
  var outputPath = path.join(config.root,config.htmlOutputPath,fileName);
  var resource = String(data.contents);
  resource = replaceHtmlImgPath(resource);
  //构建新建的文件目录
  Helper.mkdirsSync(path.dirname(outputPath));
  fs.writeFileSync(outputPath,resource,"utf-8");

  //输出提示
  var logText = fileName + '合并成功!';
  console.log(logText)
};

var html = function(file,callback) {
    console.log('开始构建html......');

    //var hashMaps = Helper.getHashMaps();
    gulp.src(config.html.src)
        .pipe(fileinclude({
          prefix: '@@',
          basepath: '@file'
        }))
        .on('data',function(resouce){
          try{
            buildHtml(resouce);
          }catch(error){
            var e = error;
            console.log(e);
          }
        }).on('end',function(){
          callback && callback();
        });
};

module.exports = html;