

/*构建入口*/
var path = require('path');
var gulp = require('gulp');
var less = require('gulp-less');
var log = require('gulp-util');
var server = require('gulp-server-livereload');
var watch = require('gulp-watch');
var config = require('../config');
var Helper = require('./helper');
var html = require('./html');
var tpl = require('./tpl');
var sprite = require('./sprite');
var color = log.colors;

main = {

    less:function(callback){
        console.log('开始构建css!');
        var lessPath = config.less.src;
        var file = [path.join(lessPath, '*.less'), "!" + (path.join(lessPath, '_*.less'))];
        gulp.src(file)
            .pipe(less({
                compress:false,
                paths:[lessPath]
            }))
            .pipe(gulp.dest(config.less.build)).on('end',function(){
                log.log(color.red('less 已经构建成 css!'));
                callback && callback();
            })
    },
    js:function(callback){
        console.log('开始构建js......');
        gulp.src(config.js.src)
        .pipe(gulp.dest(config.js.build)).on('end',function(){
            console.log('js构建完成!');
            callback && callback();
        });
    },
    html:function(file,callback){
        var _file = config.html.src;
        var cb;
        if(typeof file == 'function'){
            cb = file;
        }else{
            _file = file || _file;
            cb = callback || function(){};
        }
        html(_file,cb);
    },
    fonts:function(callback){
        console.log('开始构建字体文件......');
        gulp.src(config.fonts.src)
            .pipe(gulp.dest(config.fonts.build)).on('end',function(){
                console.log('字体文件构建完成......');
                callback && callback();
            });
    },
    tpl:function(callback){
        console.log('开始构建tpl.html--到---tpl.js');
        tpl(callback);
    },
    img:function(callback){
        console.log('图片复制中......');
        gulp.src(config.images.src)
            .pipe(gulp.dest(config.images.build)).on('end',function(){
                console.log('图片复制完成......');
                callback && callback();
            });
    },
    sprite:function(callback){
        console.log('构建雪碧图开始......');
        sprite(callback);
        //callback && callback();
    },
    watch:function(){
        var _self = this;
        watch(config.watchFiles,function(file){
            //console.log(file.event);
            //判断文件更新的状态
            var e = file.event;//if e === 'change'
            try {
                if(e !== 'undefined'){
                    //判断是否是linux下的路径
                    var filePath = file.path.replace(/\\/g,'/');
                    //获取改变的文件的类型
                    var type = Helper.getFileType(filePath);
                    //判断字体和图片
                    /*var imgArr = ['jpg','png','gif','svg'];
                    if(imgArr.indexOf(type) != '-1'){
                        type = 'img';
                    }*/
                    console.log(type);
                    switch(type){
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
                }
            } catch(err){
                //console.log(err);
            }
        });
    },
    server:function(){
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