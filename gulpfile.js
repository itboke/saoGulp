/**
 * saoGulp - gulpfile.js
 * Created by hzl
 */

'use strict';



var gulp = require('gulp');
var setting = require('./config');
var mainBuild = require('./tasks/main');

// MD5戳
//var rev = require('gulp-rev');
//var revCollector = require('gulp-rev-collector');
var runSequence = require('run-sequence');

var clean = require('gulp-clean');
//监控
gulp.task('watch',function(){
  mainBuild.watch();
});
//开始服务
gulp.task('server',function(){
  mainBuild.server();
});
//本地开发环境
gulp.task('local',function(){
  mainBuild.less(function(){
    mainBuild.img(function(){
      mainBuild.sprite(function(){
        mainBuild.js(function(){
          mainBuild.html(function(){
            mainBuild.fonts(function(){
              mainBuild.tpl(function(){
                  gulp.start(['watch','server']);
              })
            });
          });
        });
      });
    });
  });
});
//打包 压缩 资源整合

var publish = function(callback){
  mainBuild.less(function(){
    mainBuild.js(function(){
      mainBuild.img(function(){
        callback();
      })
    })
  });
};

gulp.task('release',function(){
  var _startTime = (new Date()).getTime();
  publish(function(){
    var _endTime = (new Date()).getTime();
    console.log("耗时：" + (_endTime - _startTime) / 1000 + "s...");
  })
});


gulp.task('clean',function(done){
  var rootDir = './build';
  var clearDir = [];
  if(setting.env == 'local'){
    rootDir = './build';
    clearDir = [rootDir + '/img/**/*',rootDir + '/html/**/*.html',rootDir + '/js/**/*.js',rootDir + '/css/*.css'];
  }else{
    rootDir = './dist';
    clearDir = [rootDir + '/img/**/*',rootDir + '/css/*.css',rootDir + '/map/*.json',rootDir + '/js/*.js'];
  }
  gulp.src(clearDir)
      .pipe(clean())
      .on('end',done);
});

gulp.task('default',function(){
  if(setting.env == 'local'){
    runSequence([
      'clean',
      'local'
    ]);
  }else{
    runSequence([
      'clean',
      'release'
    ]);
  }
});


