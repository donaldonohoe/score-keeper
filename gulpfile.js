// Requires
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass')(require('sass'));
//const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default; // Necessary to use ES version to support use of const
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const merge = require('gulp-merge');
//const browserSync = require('browser-sync').create();



// HTML
function pipeHTML() {
  return gulp
    .src(['src/**/*.html'])
    .pipe(gulp.dest('test/'))
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true,
      minifyJS: false,
      removeEmptyAttributes: false
    }))
    //.pipe(rename({ extname: '.min.html' }))
    .pipe(gulp.dest('dist/'))
    //.pipe(browserSync.stream())
}


// IMG
function images() {
  return gulp
    .src(['src/img/**/*.{png,jpg,jpeg,gif,svg}'])
    .pipe(gulp.dest('test/img/'))
    .pipe(gulp.dest('dist/img/'))
}



// SCSS
function scss(cb) {
  return gulp
    .src('src/scss/**/*.scss')
    .pipe(sass({
      outputStyle: 'expanded' // compressed/expanded
    }))
    .on('error', sass.logError)
    .pipe(gulp.dest('test/css/')) // pipe to test/
    .pipe(sass({
      outputStyle: 'compressed' // compressed/expanded
    }))
    .on('error', sass.logError)
    //.pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('dist/css/')) // pipe to dist/
    //.pipe(browserSync.stream())
}



// Define JS files to be compiled
const jsCompile = [
  {
    compileTo : 'scripts.js',
    partials : [
      {
        declarations : [
          'global-variables.js',
          'elements.js'
        ],
        plugins : [
          //'interact.min.js'
        ],
        components : [
          'buttons.js',
          'keyboards.js'
        ],
        functions : [
          'handle-timestamp.js',
          'get-ordinal.js',
          'open-close-drawer.js',
          'draggable.js',
          'load-game.js',
          'update-leaderboard.js',
          'update-game-info.js',
          'update-settings.js',
          'apply-score.js',
          'create-new-game.js',
          'restart-game.js',
          'create-player.js',
          'remove-player.js',
          'misc.js'
        ],
        layers : [
          'intro.js',
          'main.js',
          'add-player-drawer.js',
          'player-drawer.js',
          'settings-drawer.js',
          'game-info-drawer.js'
        ]
      }
    ]
  }
];

// Create relative paths for all partials
jsCompile.forEach(function(page, index) { // each page
  page.relativePartials = [];
  page.partials.forEach(function(item) { // each partial array item
    for (const [key, value] of Object.entries(item)) { // each partial key/value
      value.forEach(function(file) { // each partial value array item (file)
        var filePath = 'src/js/' + key + '/' + file;
        page.relativePartials.push(filePath);
      });
    }
  });
  //console.log(page.relativePartials);
});

// JS
function scripts(cb) {
  var tasks = jsCompile.map(function(page) {
    return gulp
    .src(page.relativePartials) // Grab all partials
    .pipe(concat(page.compileTo)) // Concat to file in same obj
    .pipe(gulp.dest('test/js/'))
    .pipe(uglify())
    //.pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('dist/js/'))
    //.pipe(browserSync.stream())
  });
  return merge(tasks); // Merge all gulp tasks for each page
}






/* GLOBAL WATCH FUNCTION */
function watch(cb) {
  gulp.watch('src/**/*.html', gulp.series(pipeHTML));
  gulp.watch('src/scss/**/*.scss', gulp.series(scss));
  gulp.watch('src/js/**/*.js', gulp.series(scripts));
  gulp.watch('src/img/**/*.{png,jpg,jpeg,gif,svg}', gulp.series(images));
  cb();
}

/* GLOBAL BUILD FUNCTION */
const build = gulp.series(pipeHTML, scss, scripts, images);

// Export the build tasks to run via the command line
exports.build = build;
exports.buildHTML = pipeHTML;
exports.buildCSS = scss;
exports.buildJS = scripts;
exports.buildIMG = images;

module.default = gulp.task('default', gulp.series(watch));