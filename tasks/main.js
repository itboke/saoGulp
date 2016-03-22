/*构建入口*/
var path = require('path');
var gulp = require('gulp');
var less = require('gulp-less');
var cssmin = require('gulp-minify-css');
var log = require('gulp-util');
var server = require('gulp-server-livereload');
var watch = require('gulp-watch');
var config = require('../config');
var Helper = require('./helper');
var html = require('./html');
var tpl = require('./tpl');
var sprite = require('./sprite');
var jsCombine = require('./js');
var image = require('./image');
var fonts = require('./fonts');
var color = log.colors;
var rev = require('gulp-rev');

main = {

    less: function(callback) {
        console.log('开始构建css!');
        var lessPath = config.less.src;
        var file = [path.join(lessPath, '*.less').replace(/\\/g, '/'), '!src/less/_**/*.less'.replace(/\\/g, '/')];

        var outPutEnvPath = '';
        //判断是否是发布环节
        if (config.env === 'test' || config.env === 'www') {
            outPutEnvPath = config.less.dist;
            gulp.src(file)
                .pipe(less({
                    compress: false,
                    paths: [lessPath]
                }))
                .pipe(cssmin())
                .pipe(rev())
                .pipe(gulp.dest(outPutEnvPath))
                .pipe(rev.manifest({
                    merge: true
                }))
                .pipe(gulp.dest('./dist/map'))
                .on('end', function() {
                    log.log(color.red('less 已经构建成 css!'));
                    callback && callback();
                })
        } else {
            outPutEnvPath = config.less.build;
            gulp.src(file)
                .pipe(less({
                    compress: false,
                    paths: [lessPath]
                }))
                .pipe(gulp.dest(outPutEnvPath)).on('end', function() {
                    log.log(color.red('less 已经构建成 css!'));
                    callback && callback();
                })
        }
    },
    js: function(callback) {
        console.log('开始构建js......');
        jsCombine(callback);
    },
    html: function(file, callback) {
        var _file = config.html.src;
        var cb;
        if (typeof file == 'function') {
            cb = file;
        } else {
            _file = file || _file;
            cb = callback || function() {};
        }
        html(_file, cb);
    },
    fonts: function(callback) {
        console.log('开始构建字体文件......');
        fonts(callback);
    },
    tpl: function(callback) {
        console.log('开始构建tpl.html--到---tpl.js');
        tpl(callback);
    },
    img: function(callback) {
        console.log('图片复制中......');
        image(callback);
    },
    sprite: function(callback) {
        console.log('构建雪碧图开始......');
        sprite(callback);
    },
    watch: function() {
        var _self = this;
        watch(config.watchFiles, function(file) {
            //判断文件更新的状态
            var e = file.event; //if e === 'change'
            try {
                if (e !== 'undefined' && e !== 'unlink') {
                    //判断是否是linux下的路径
                    var filePath = file.path.replace(/\\/g, '/');
                    //获取改变的文件的类型
                    var type = Helper.getFileType(filePath);
                    switch (type) {
                        case 'less':
                            _self.less();
                            break;
                        case 'js':
                            _self.js();
                            break;
                        case 'html':
                            _self.html();
                            break;
                        case 'img':
                            _self.img();
                            break;
                        case 'tpl':
                            _self.tpl();
                            break;
                        case 'sprite':
                            _self.sprite();
                            break;
                    }
                } else {
                    console.log('删除文件成功,如果有其他文件引用你删除的文件,请调整过来哦!');
                }
            } catch (err) {
                //console.log(err);
            }
        });
    },
    server: function() {
        var root = config.root;
        gulp.src(root).pipe(server({
            livereload: false,
            directoryListing: true,
            open: false,
            host: config.host,
            port: config.port
        }));
    }

};

module.exports = main;
