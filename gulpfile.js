const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const rename = require('gulp-rename');

//compile scss into css
function style() {
    //1.where is my scss
    return gulp.src('resources/sass/**/*.scss') //gets all files ending with .scss in src/scss
    //2. pass that file through sass compiler
    .pipe(sass().on('error',sass.logError))
    //3. where do I save the compiled css file
    .pipe(gulp.dest('resources/css'))
    //4. stream change to all browsers
    .pipe(browserSync.stream());
}


// Copy bootstrap Javascript files into /src/js folder
function js() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js'])
        .pipe(gulp.dest("resources/js"))
        .pipe(browserSync.stream());

}

function copyBootstrapFonts() {
    return gulp.src('node_modules/bootstrap-icons/font/fonts/*')
      .pipe(gulp.dest('resources/fonts'));
  }

function watch() {
    browserSync.init({
        server: {
            baseDir: "./",
            index: "/index.html"
        }
    });
    gulp.watch('resources/sass/**/*.scss', style);
    gulp.watch('./*.html').on('change',browserSync.reload);
    gulp.watch('./resources/js/**/*.js').on('change', browserSync.reload);
}

exports.style    = style;
exports.copyBootstrapFonts    = copyBootstrapFonts;
exports.js    = js;
exports.watch    = watch;