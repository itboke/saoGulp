var src = './src';
var build = './build';
var dist = './dist';
// ceshi 
var staticPath = '//localhost:8000/build';
var publishStaticPath = '//localhost:8000/dist';
var args = require('yargs').argv;
var env = (ref = args.e || args.env) != null ? ref : 'local';
config = {
    root:process.env.INIT_CWD,
    host:'localhost',
    port:'8000',
    env:env,
    staticPath: staticPath,
    publishStaticPath : publishStaticPath,
    hashLength:'10',
    watchFiles:[src + '/less/**/*.less',src + '/js/**/*js',src + '/html/**/*.html',src + '/fonts/**/*',src + '/img/**/*',src + '/tpl/**/*.html',src + '/sprite/**/*'],
    htmlPath:'src/html/',
    jsAppPath:'src/js/app/',
    htmlOutputPath:'build/html/',
    spriteOutPut:'dist/',
    isOpenAvalon:false,
    less:{
        src:src + '/less/**',
        build:build + '/css',
        dist:dist + '/css'
    },
    images:{
        src: src + '/img/**/*',
        build:build + '/img',
        dist: dist + '/img'
    },
    js:{
        src:src + '/js/**/*.js',
        build:build + '/js',
        dist:dist +'/js'
    },
    html:{
        src:src + '/html/**/*.html',
        build:build + '/html'
    },
    fonts:{
        src:src + '/fonts/**/*',
        build:build + '/fonts',
        dist : dist + '/fonts'
    },
    tpl:{
        src:src + '/tpl',
        build: src + '/js/_tpl'
    },
    sprite:{
        src:src + '/sprite',
        build:'../img/sprite',
        outPutBuild:build + '/img/sprite',
        lessOutputPath:src + '/less/_sprite'
    },
    coreJs:{
        seaJs: staticPath + '/js/core/sea',
        jquery:staticPath + '/js/core/jquery',
        avalon:staticPath + '/js/core/avalon',
        distCoreJs: publishStaticPath + '/js/',
        coreName:'coreLibs.js'
    },
    seajsConfig:'seajs.config({base:"/build/js/app"});'
}


module.exports = config;
