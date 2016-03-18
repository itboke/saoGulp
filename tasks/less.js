var setting = require('./config');
var gulp = require('gulp');
var path = require('path');
var less = require('gulp-less');

module.exports = function(){


    var lessPath = setting.srcPath + 'less/**/*.less',
        outPutPath  = setting.buildPath + 'css';


    gulp.src('../src/less/**/*.less')
      .pipe(less())
      .pipe(gulp.dest('/build/css'));


};