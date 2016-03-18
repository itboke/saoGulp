gulp.task('publish-js', function () {
  return gulp.src(['./js'])
    .pipe(webpack(config))
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./build'))
    .pipe(qn({
      qiniu: qiniu,
      prefix: 'gmap'
    }))
    .pipe(rev.manifest())
    .pipe(gulp.dest('./build/rev/js'));
});
gulp.task('publish-css', function () {
  return gulp.src(['./css/main.css', './css/view.css'])
    .pipe(concat('app.css'))
    .pipe(shrink())
    .pipe(rev())
    .pipe(gulp.dest('./build'))
    .pipe(qn({
      qiniu: qiniu,
      prefix: 'gmap'
    }))
    .pipe(rev.manifest())
    .pipe(gulp.dest('./build/rev/css'));
});
gulp.task('publish-html', function () {
  return gulp.src(['./build/rev/**/*.json', './index.html'])
    .pipe(revCollector({
      dirReplacements: {
        'build/': ''
      }
    }))
    .pipe(gulp.dest('./dist/'));
});
gulp.task('publish', function (callback) {
  runSequence(
    ['publish-css', 'publish-js'],
    'publish-html',
    callback);
});