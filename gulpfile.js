var gulp = require('gulp');
var browserify = require('gulp-browserify');
var karma = require('karma').server;
var lint = require('gulp-eslint');

var paths = {
  js: 'app/**/*.js',
  css: 'app/**/*.css',
  html: 'app/**/*.html'
};

gulp.task('watch', ['build'], function () {
  gulp.watch(paths.js, ['build:js']);
  gulp.watch(paths.css, ['build:css']);
  gulp.watch(paths.html, ['build:html']);
});

gulp.task('build', ['build:js', 'build:css', 'build:html']);


gulp.task('build:js', function() {
    gulp.src('app/app.js')
      .pipe(browserify())
      .pipe(gulp.dest('./build/'))
});

gulp.task('build:css', function () {
  gulp.src('app/styles.css')
    .pipe(gulp.dest('./build/'));
});

gulp.task('build:html', function () {
  gulp.src('app/index.html')
    .pipe(gulp.dest('./build/'));
});

gulp.task('test', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    action: 'watch'
  }, done);
});

gulp.task('lint', function () {
  gulp.src(paths.js)
    .pipe(lint())
    .pipe(lint.format());
});
