# Local Bootstrap Theming in a Few Easy Steps (Single)

[Local Bootstrap Multi-Theme Development Here](https://github.com/JSDesign/Multi)

## Step 1: Navigate to the project root, enter the following into command line

If you're not trying to make a git repo for the project, omit `git` command below, and skip **Step 2**.

```TERMINAL
git init
```

```TERMINAL
npm init -y
```

```TERMINAL
touch .gitignore
```

## Step 2: Add the following to `.gitignore`

Plus any other stuff you don't need to commit.

```TEXT
node_modules/

.DS_Store

.vscode/
.idea/
```

## Step 3: Enter the following into command line

```TERMINAL
npm install --save-dev node-sass autoprefixer gulp gulp-clean-css gulp-postcss gulp-rename gulp-sass gulp-sourcemaps browser-sync
```

```TERMINAL
npm install bootstrap popper.js@1.16.0 jquery
```

## Step 4: Build the following file structure

```TEXT
root/
    build/
        js/
        scss/
____________OPTIONAL_BREAKDOWN________________________________________________
            base/                       - Fonts, colors, etc.
            components/                 - Component styles used throughout app
            pages/                      - Page-specific styles
            utils/                      - Mixins, functions, etc.
            vendors/                    - External libraries
    dist/
        assets/
            css/
            images/
            js/
```

## Step 5: Create the following files within the above file structure

```TEXT
/build/scss/main.scss
/dist/index.html
/gulpfile.js
```

## Step 6: Add the following to `gulpfile.js`

```JS
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
```

## Step 7: Add a `start` script and a `browserslist` to `package.json`

The `start` script will call the "start" task from our Gulp file.

```JSON
"scripts": {
    "start": "gulp start",
    "test": "echo \"Error: no test specified\" && exit 1"
}
```

The `browserslist` is used by `autoprefixer` to determine which CSS prefixes to add - "defaults" is good for [most users](https://www.npmjs.com/package/browserslist#best-practices).

```JSON
"browserslist": [
    "defaults"
]
```

## Step 8: Add the Bootstrap core SCSS using `@import`

The SCSS file we created earlier must import Bootstrap - we'll get it from the `node_modules` directory thusly:

```SCSS
// Variable Overwrites First
// You may (re)define any core Bootstrap variables here
// Or import a separate file

// Bootstrap Source
@import '../../node_modules/bootstrap/scss/bootstrap';

// Theme Customizations
// You may create custom SCSS here
// Or import a separate file
```

## Step 9: At project root, enter the following into command line

Either will work - npm infers the "run" part of `start` commands.

```TERMINAL
npm run start
```

```TERMINAL
npm start
```

## Step 10: Link minified CSS file to `head` of HTML index file

```HTML
<link rel="stylesheet" href="assets/css/main.min.css">
```

## Step 11: Start building your theme
