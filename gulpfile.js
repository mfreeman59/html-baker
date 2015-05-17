var gulp = require('gulp');
var plumber = require('gulp-plumber');
var imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');
var cssmin = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
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
  gulp.src('./sass/*.sass')
    .pipe(plumber())
    .pipe(sass({
      errLogToConsole: true,
      sourceComments: 'normal'
    }))
    .pipe(gulp.dest('./css'))
    .pipe(connect.reload());
});

// css minify
gulp.task('cssmin', function(){
  gulp
    .src('./css/**/*.css')
    .pipe(cssmin())
    .pipe(gulp.dest('./dist/css'));
});


// 画像のminify
gulp.task('imagemin', function(){
  gulp.src('./img/*.{png, jpg}')
    .pipe(imagemin());
});

// js uglify
gulp.task('uglify', function(){
  gulp
    .src('./app/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});

//concat
gulp.task('concat', function(){
  // gulp
  //   .src('./')
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
  gulp.watch(['./**/*.html'], ['reloadHtml']);
  gulp.watch(['./sass/**/*.sass'], ['sass']);
  gulp.watch(['./js/**/*.js'], ['reloadJs']);
});


gulp.task('default', ['sass', 'imagemin', 'webserver', 'watch']);
gulp.task('release', ['imagemin','sass', 'cssmin', 'uglify', '']);
