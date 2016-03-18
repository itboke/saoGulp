var gulp = require('gulp');
var config = require('../config').images;
var vfs = require('vinyl-fs');



module.exports = function(livereload,server){

    gulp.src(config.src)
        .pipe(livereload(server));
        .pipe(gulp.dest(config.build));


};
