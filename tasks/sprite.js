var gulp=require("gulp");
var spritesmith=require('gulp.spritesmith');
var config = require('../config');
var fs = require('fs');
var gulpif = require('gulp-if');

var sprite = function(callback){
    var spriteDir = config.sprite.src;
    fs.readdirSync(spriteDir).forEach(function(file){
        var file_name = file;
        var imgPath = spriteDir + '/' + file + '/*.png';
        /*fs.readdirSync(childDir).forEach(function(file){
            console.log(file);
        })*/
        var less2imgPath = config.sprite.build + '/' + file + '.png';
        var imgName = file_name + '.png';
        var cssName = file_name + '.less';
        //雪碧图和less的输出路径
        var outputImgPath = config.sprite.outPutBuild;
        var outputLessPath = config.sprite.lessOutputPath;
        gulp.src(imgPath)
            .pipe(spritesmith({
                imgName:imgName,
                cssName:cssName,
                padding:5,
                imgPath:less2imgPath,
                algorithm:'binary-tree',
                cssTemplate:function(data){
                    var arr=[];
                    data.sprites.forEach(function (sprite) {
                        arr.push(".icon-"+sprite.name+
                        "{" +
                        "background-image: url('"+sprite.escaped_image+"');"+
                        "background-position: "+sprite.px.offset_x+" "+sprite.px.offset_y+";"+
                        "width:"+sprite.px.width+";"+
                        "height:"+sprite.px.height+";"+
                        "}\n");
                    });
                    return arr.join("");
                }
            }))
            .pipe(gulpif('*.png', gulp.dest(outputImgPath)))
            .pipe(gulpif('*.less', gulp.dest(outputLessPath)));
    });
    console.log("雪碧图构建完成!!!!!!");
    callback && callback();
};

module.exports = sprite;