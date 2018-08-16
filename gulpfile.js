var gulp = require('gulp');
var cssnano = require('gulp-cssnano');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
//for es6: var uglify = require('gulp-uglify-es').default;
//the sass shizz:
gulp.task('sass', function() {
  return gulp
    .src(['app/styles/reset.css', 'app/styles/style.scss'])
    .pipe(concat('style.css'))
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('dist/css'));
});

//if there are plugins, etc.
gulp.task('js', function() {
  return gulp
    .src(['app/js/plugins/*.js', 'app/js/*.js'])
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch('app/styles/*.scss', ['sass']);
  gulp.watch('app/js/**/*.js', ['js']);
});

gulp.task('default', ['sass', 'js', 'watch']);

/*one-file.js
gulp.task('js', function() {
  return gulp
    .src('app/*.js') // * for all the js things
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});
*/
/*
if there are plugins, etc.
gulp.task('js', function(){
   return gulp.src(['app/js/plugins/*.js', 'app/js/*.js'])
      .pipe(concat('all.js'))
      .pipe(uglify())
      .pipe(gulp.dest('dist'));
});
*/
