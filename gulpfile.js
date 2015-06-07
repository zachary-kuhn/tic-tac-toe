var gulp = require('gulp');
var karma = require('karma').server;
var lint = require('gulp-eslint');

var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var ngAnnotate = require('browserify-ngannotate');

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

gulp.task('build:js', function () {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: 'app/app.js',
    debug: false,
    transform: [ngAnnotate]
  });

  return b.bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./build/'));
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
