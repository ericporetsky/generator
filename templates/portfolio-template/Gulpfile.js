var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var del = require("del");
var browserSync = require('browser-sync').create();



function clean() {
  return del(["public/dist/assets"]);
}

// Compile pug files into HTML
gulp.task('pug', function () {
  return gulp.src('views/**/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('public/dist'));
});

gulp.task('assets', function () {
  return gulp.src('public/src/assets/*')
    .pipe(gulp.dest('public/dist/assets'));
});


// Compile sass files into CSS
gulp.task('sass', function () {
  return gulp.src('public/src/scss/styles.scss')
    .pipe(sass({
      includePaths: ['src/scss'],
      errLogToConsole: true,
      outputStyle: 'compressed'
    }))
    .on('error', function (err) {
            console.log(err.toString());
            this.emit('end');
    })
    .pipe(gulp.dest('./public/dist/css'))
    .pipe(browserSync.stream());
});

// Serve and watch sass/pug files for changes
gulp.task('watch', ['pug', 'sass', 'assets'], function () {
  browserSync.init({
      server: 'public/dist'
  }),
  gulp.watch('public/src/scss/*.scss', ['sass']);
  gulp.watch('public/src/assets/*', ['assets']);
  gulp.watch('views/**/*.pug', ['pug']);
  gulp.watch('public/dist/*.html').on('change', browserSync.reload);
  gulp.on('end', function() {
    return clean();
  })
});

gulp.task('default', ['watch']);


