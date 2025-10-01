const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

// Compile SASS
function style() {
  return gulp.src('./src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
}

// Serve and watch
function serve() {
  browserSync.init({
    server: {
      baseDir: './'
    },
    notify: false
  });
  gulp.watch('./src/**/*.scss', style);
  gulp.watch('./*.html').on('change', browserSync.reload);
  gulp.watch('./dist/css/*.css').on('change', browserSync.reload);
}

exports.style = style;
exports.serve = gulp.series(style, serve);
