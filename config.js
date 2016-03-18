var src = './src';
var build = './build';
var dist = './dist';
config = {
    root:process.env.INIT_CWD,
    host:'localhost',
    port:'8000',
    env:'local',
    staticPath:'//localhost:8800/build',
    hashLength:'10',
    watchFiles:[src + '/less/**/*.less',src + '/js/**/*js',src + '/html/**/*.html',src + '/fonts/**/*',src + '/img/**/*',src + '/tpl/**/*.html'],
    htmlPath:'src/html/',
    htmlOutputPath:'build/html/',
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
    }
}


module.exports = config;