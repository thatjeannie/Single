// Gulp Config File

// Depedencies
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

// Multiple tasks are created as individual functions to be combined at the end (Gulp 4.xx)

// Function to use Browsersync to watch HTML, CSS, and image files for changes to reload the browser
function syncBrowser(done) {
    browserSync.init({
        files: [
            './dist/*.html',
            './dist/assets/css/*.css',
            './dist/assets/js/*.js',
        ],
        server: './dist',
        port: 8080,
        // Set to false to turn off the default Browsersync notification overlay on the browser
        notify: false
    });
    done();
}

// Function to compile the main site SCSS files
function compileSiteStyles() {
    return gulp.src('./build/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(postcss([ autoprefixer() ]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/assets/css'))
        .pipe(cleanCss())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./dist/assets/css'))
        .pipe(browserSync.stream());
}

// Function to watch files, and rebuild on changes
function watchFiles() {
    gulp.watch('./build/scss/*.scss', compileSiteStyles);
}

// The single task function
// Task functions must be grouped into a single `gulp-task(...)` function utilizing the `gulp.series(...)` method (Gulp 4.x)
gulp.task('start', gulp.series(syncBrowser, compileSiteStyles, watchFiles));
