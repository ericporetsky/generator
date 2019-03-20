var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();


// Compile pug files into HTML
gulp.task('pug', function () {
  return gulp.src('views/**/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('public/dist'));
});

// Compile sass files into CSS
gulp.task('sass', function () {
  return gulp.src('public/src/scss/styles.scss')
    .pipe(sass({
      includePaths: ['src/scss'],
      errLogToConsole: true,
      outputStyle: 'compressed',
      onError: browserSync.notify
    }))
    .pipe(gulp.dest('./public/dist/css'))
    .pipe(browserSync.stream());
});

// Serve and watch sass/pug files for changes
gulp.task('watch', ['pug', 'sass'], function () {
  browserSync.init({
      server: 'public/dist'
  }),
  gulp.watch('public/src/scss/*.scss', ['sass']);
  gulp.watch('views/*.pug', ['pug']);
  gulp.watch('public/dist/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['watch']);
