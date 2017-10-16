var gulp         = require('gulp');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var spritesmith  = require('gulp.spritesmith');
var imagemin     = require('gulp-imagemin');
var plumber      = require('gulp-plumber');
var notify       = require('gulp-notify');
var jshint       = require('gulp-jshint'); // Notify on JS errors
var uglify       = require('gulp-uglify');
var minifyCSS    = require('gulp-minify-css');
var gutil        = require('gulp-util'); // used to check the param passed from command line
var gulpif       = require('gulp-if'); // Conditionally run a task
var stripDebug   = require('gulp-strip-debug'); // Strip out console.log messages etc
var concat       = require('gulp-concat'); // combines the JS int one file
var filter       = require('gulp-filter'); // ensures that only *.css files ever reach .reload - this way we'll still get CSS injecting.
var browserSync  = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var sizereport   = require('gulp-sizereport');
var babel        = require('gulp-babel'); // ES6
var htmlInjector = require("bs-html-injector");
var rename       = require("gulp-rename");

// Set some defaults
var isDev  = true;
var isProd = false;

// If "prod" is passed from the command line then update the defaults
if(gutil.env._[0] === 'prod') {
  isDev  = false;
  isProd = true;
}

var plumberErrorHandler = { errorHandler: notify.onError({
    title: 'Gulp',
    message: 'Error: <%= error.message %>'
  })
};


// Gulp Sass Task
gulp.task('sass', function() {
  return gulp.src('./assets/sass/{,*/}*.{scss,sass}')
    .pipe(plumber(plumberErrorHandler))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer({
        browsers: ["> 1%", "last 2 versions", "Firefox ESR"]
      }))
    .pipe(gulpif(isProd, minifyCSS()))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./assets/css'))
    .pipe(filter('**/*.css')) // Filtering stream to only css files
    .pipe(browserSync.reload({stream:true}));
})


gulp.task('sizereport', function () {
   return gulp.src('./assets/css/*.css')
     .pipe(sizereport({
        gzip: true
      }));
});


gulp.task('sprite', function () {
  var spriteData = gulp.src('./assets/images/sprites/*.png').pipe(spritesmith({
    // retinaSrcFilter: ['./assets/images/sprites/*@2x.png'],
    imgName: 'sprite.png',
    // retinaImgName: 'sprite@2x.png',
    cssName: '_sprites.scss',
    imgPath: '../images/sprite.png',
    retinaImgPath: '../assets/images/sprite@2x.png'
  }));

  // Pipe image stream through image optimizer and onto disk
  spriteData.img
    // .pipe(imagemin())
    .pipe(gulp.dest('./assets/images/'));

  spriteData.css.pipe(gulp.dest('./assets/sass/1-tools/'));
});

gulp.task('scriptsmin', function() {
  return gulp.src('./assets/js/*.js')
    .pipe(plumber(plumberErrorHandler))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./assets/js/dist/'))
    .pipe(notify({ message: 'Script min task complete.' }));
});

// Gulp Sass minify task
gulp.task('sassmin', function() {
  return gulp.src('./assets/sass/{,*/}*.{scss,sass}')
    .pipe(plumber(plumberErrorHandler))
    .pipe(sass())
    .pipe(autoprefixer({
        browsers: ["> 1%", "last 5 versions", "Firefox ESR"]
      }))
    .pipe(minifyCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./assets/css'))
    .pipe(filter('**/*.css')) // Filtering stream to only css files
});

gulp.task('jshint', function() {
  return gulp.src('./assets/js/src/*.js')
    .pipe(plumber(plumberErrorHandler))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'))
    .pipe(filter('**/*.js')) // Filtering stream to only js files
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('babel-es6', function() {
  return gulp.src('./assets/js/src/*.js')
    .pipe(plumber(plumberErrorHandler))

     .pipe(babel({
        presets: ['es2015'] // ES6
      }))
    .pipe(gulp.dest('./assets/js/'))
    .pipe(notify({ message: 'Babel has run' }));

})

gulp.task('scripts', function() {
  return gulp.src('./assets/js/src/*.js')
    .pipe(plumber(plumberErrorHandler))
    .pipe(concat('script.min.js'))
    .pipe(stripDebug())
    .pipe(gulpif(isProd, uglify()))
    .pipe(gulp.dest('./assets/js/'))
    .pipe(notify({ message: 'Scripts task complete: combined, debug stripped, uglified' }));
});


gulp.task('browser-sync', function() {
  browserSync.use(htmlInjector, {
      files: "./templates/**/*.twig"
  });
  browserSync.init(null, {
    proxy: "gina.dev",
    host: "192.168.75.110",
    open: true
  });
});


gulp.task('twig-watch', function() {
  return gulp.src('./views/**/*.twig')
    .pipe(browserSync.reload({stream:true}));
});


gulp.task('bs', ['sass', 'babel-es6', 'browser-sync', 'jshint', 'sizereport'], function () {
   // do stuff after 'sass', 'sprite', 'browser-sync' etc are done.
  gulp.watch('./assets/sass/**/*.{scss,sass}', ['sass'])
  gulp.watch('./assets/js/src/**/*.js', ['babel-es6','jshint']);
  gulp.watch('./assets/css/*.css', ['sizereport'] );
});


gulp.task('default', ['sass', 'babel-es6', 'jshint', 'sizereport'], function () {
   //do stuff after 'sass', 'jshint' etc are done.
  gulp.watch('./assets/sass/**/*.{sass,scss}', ['sass'])
  gulp.watch('./assets/js/src/**/*.js', ['babel-es6', 'jshint']);
  gulp.watch('./assets/css/*.css', [ 'sizereport'] );
});


gulp.task('prod', ['sass', 'sassmin',  'scripts', 'jshint', 'scriptsmin'], function () {

});
