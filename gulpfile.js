var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var del = require('del');
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');

var onError = function (err) {
    console.log(err);
  };

// Set the browser that you want to support
const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
];

// Clean output directory
gulp.task('clean', () => del(['dist']));

// Gulp task to move files that we get with npm
gulp.task('move-bootstrap-styles', function() {
    console.log("Moving all files in styles folder");
    gulp.src(['./node_modules/bootstrap/dist/css/*.css'])
        .pipe(plumber({
            errorHandler: onError
          }))
        .pipe(gulp.dest('./dist/styles/bootstrap'));
  });

// Gulp task to minify CSS files
gulp.task('styles', function () {
    return gulp.src('./styles/**/*.css')
        .pipe(plumber({
            errorHandler: onError
        }))
        // Auto-prefix css styles for cross browser compatibility
        .pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
        .pipe(concat('style.min.css'))
        // Minify the file
        .pipe(csso())
        // Output
        .pipe(gulp.dest('./dist/styles'))
  });

/**
 * Copy over third-party scripts - jQuery
 */
gulp.task('third-party-scripts', function() {
    gulp.src(['./node_modules/requirejs/require.js', './node_modules/jquery/dist/jquery.min.js', 
        './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js', './scripts/main.js'])
        .pipe(plumber({
            errorHandler: onError
          }))
        .pipe(gulp.dest('./dist/scripts'));
  });

/**
 * Copy over third-party scripts - jQuery
 */
gulp.task('scripts', function() {
    gulp.src(['scripts/**/*.js', '!scripts/main.js'])
        .pipe(plumber({
            errorHandler: onError
          }))
        .pipe(uglify())
        .pipe(concat('scripts.min.js'))
        .pipe(gulp.dest('./dist/scripts'));
  });

/**
 * Default Gulp task 
 * run with: gulp 
 * @NOTE: 'styles' has to go before 'move-bootstrap-styles'
 */
gulp.task('default', ['clean'], function() {
    runSequence(
        'styles',
        'move-bootstrap-styles',
        'scripts',
        'third-party-scripts',
        
    );
});