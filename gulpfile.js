/**
 * learning-gulp - gulpfile.js
 * Created by mengdesen on 15/4/14.
 * Last modified by nieweidong on 2015/04/15
 */

'use strict';



var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var shrink = require('gulp-cssshrink');
var setting = require('./config');
var mainBuild = require('./tasks/main');

// MD5戳
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var runSequence = require('run-sequence');


//监控
gulp.task('watch',function(){
  mainBuild.watch();
});
//开始服务
gulp.task('server',function(){
  mainBuild.server();
});

gulp.task('local',function(){
  mainBuild.less(function(){
    mainBuild.img(function(){
      mainBuild.js(function(){
        mainBuild.html(function(){
          mainBuild.fonts(function(){
            mainBuild.tpl(function(){
              mainBuild.sprite(function(){
                gulp.start(['watch','server']);
              })
            })
          });
        });
      });
    });
  });
});

gulp.task('default',function(){
  if(setting.env == 'local'){
    gulp.start('local')
  }
});


