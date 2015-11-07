var gulp = require('gulp');
var plumber = require('gulp-plumber');
var runSequence = require('run-sequence');
var img64 = require('gulp-img64');
var cssImg64 = require('gulp-base64');
var sass = require('gulp-sass');
var htmlmin = require('gulp-minify-html');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var inlineSource = require('gulp-inline-source');
var webserver = require('gulp-webserver');
var watch = require('gulp-watch');

// ローカルサーバー構築
gulp.task('webserver', function(){
  gulp
    .src('./')
    .pipe(webserver({
      livereload: true,
      directoryListing: true
    }))
});

// sassのコンパイル
gulp.task('sass', function(){
  return gulp.src('./sass/*.sass')
    .pipe(plumber())
    .pipe(sass({
      errLogToConsole: true,
      sourceComments: 'normal'
    }))
    .pipe(gulp.dest('./css'));
});

// html最適化
gulp.task('htmlOpt', function() {
  var opts = {
    conditionals: true,
    spare:true
  };

  return gulp.src('./*.html')
    .pipe(inlineSource())
    .pipe(img64())
    .pipe(htmlmin(opts))
    .pipe(gulp.dest('./dist/'));
});

//css最適化
gulp.task('cssOpt', function(){
  return gulp
    .src('./css/*.css')
    .pipe(cssImg64({
      maxImageSize: 0
    }))
    .pipe(concat('all.css'))
    .pipe(gulp.dest('./gen/'));
});

// js uglify
gulp.task('uglify', function(){
  gulp
    .src('./app/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});

// watchタスク
gulp.task('reloadHtml', function(){
  gulp.src('./**/*.html')
    .pipe(webserver.reload());
});
gulp.task('reloadJs', function(){
  gulp.src('./js/**/*.js')
    .pipe(webserver.reload());
});

gulp.task('watch', function(){
  gulp.watch(['./sass/**/*.sass'], ['sass']);
});


gulp.task('default', ['sass', 'webserver', 'watch']);
gulp.task('release', function(callback) {
  runSequence('sass', 'cssOpt', 'htmlOpt', callback);
});
