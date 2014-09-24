var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var connect = require('gulp-connect');
var watch = require('gulp-watch');

gulp.task('connect', function(){
  connect.server({
    livereload: true
  });
});

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

gulp.task('imagemin', function(){
  gulp.src('./img/*.{png, jpg}')
    .pipe(imagemin());
});

// watchタスク
gulp.task('html', function(){
  gulp.src('./**/*.html')
    .pipe(connect.reload());
});
gulp.task('js', function(){
  gulp.src('./js/**/*.js')
    .pipe(connect.reload());
});

gulp.task('watch', function(){
  gulp.watch(['./**/*.html'], ['html']);
  gulp.watch(['./sass/**/*.sass'], ['sass']);
  gulp.watch(['./js/**/*.js'], ['js']);
});


gulp.task('default', ['sass', 'imagemin', 'connect', 'watch']);

