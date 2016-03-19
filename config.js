var src = './src';
var build = './build';
var dist = './dist';
var staticPath = '//localhost:8000/build';
config = {
    root:process.env.INIT_CWD,
    host:'localhost',
    port:'8000',
    env:'local',
    staticPath:'//localhost:8000/build',
    hashLength:'10',
    watchFiles:[src + '/less/**/*.less',src + '/js/**/*js',src + '/html/**/*.html',src + '/fonts/**/*',src + '/img/**/*',src + '/tpl/**/*.html',src + '/sprite/**/*'],
    htmlPath:'src/html/',
    htmlOutputPath:'build/html/',
    spriteOutPut:'dist/',
    less:{
        src:src + '/less/**',
        build:build + '/css'
    },
    images:{
        src: src + '/img/**/*',
        build:build + '/img'
    },
    js:{
        src:src + '/js/**/*.js',
        build:build + '/js'
    },
    html:{
        src:src + '/html/**/*.html',
        build:build + '/html'
    },
    fonts:{
        src:src + '/fonts/**/*',
        build:build + '/fonts'
    },
    tpl:{
        src:src + '/tpl',
        build: src + '/js/_tpl'
    },
    sprite:{
        src:src + '/sprite',
        build:'../img/sprite',
        outPutBuild:build + '/img/sprite',
        lessOutputPath:src + '/less/sprite'
    },
    coreJs:{
        seaJs: staticPath + '/js/core/sea',
        jquery:staticPath + '/js/core/jquery',
        avalon:staticPath + '/js/core/avalon'
    }

}


module.exports = config;