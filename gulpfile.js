// include plug-ins
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-clean-css');
var del = require('del');
var bower = require('gulp-bower');
var strip = require('gulp-strip-comments');
//var sourcemaps = require('gulp-sourcemaps');

var config = {
    vendorSrc: [
       "bower_components/jquery/dist/jquery.min.js",
         "bower_components/google-infobox/google-infobox.js",
         "bower_components/flickity/dist/flickity.pkgd.min.js"
    ],

    cssSrc: [
       'bower_components/flickity/dist/flickity.min.css',
       'assets/css/common.css',
       'assets/css/mobile.css',
       'assets/css/tablet.css',
       'assets/css/desktop.css',
       'bower_components/ionicons/css/ionicons.css'
    ],


    fontawsomefonts: 'bower_components/ionicons/fonts/*.*',

    fontsout: 'assets/fonts',
    cssout: 'assets/css'

}

//Create a jquery bundled file
gulp.task('vendor-bundle', ['bower-restore'], function () {
    return gulp.src(config.vendorSrc)
     .pipe(concat('script.js'))
     .pipe(gulp.dest('assets/js'));
});


gulp.task('clean-scripts', [], function (cb) {
    del(['assets/js/script.js'], cb);
});

//Create a bootstrap bundled file
//gulp.task('bootstrap-bundle', ['clean-vendor-scripts', 'bower-restore'], function () {
//    return gulp.src(config.bootstrapsrc)
//     .pipe(sourcemaps.init())
//     .pipe(concat('bootstrap-bundle.min.js'))
//     .pipe(sourcemaps.write('maps'))
//     .pipe(gulp.dest('Scripts'));
//});


// Combine and the vendor files from bower into bundles (output to the Scripts folder)
gulp.task('scripts', ['vendor-bundle'], function () {

});


gulp.task('css', ['bower-restore'], function () {
    return gulp.src(config.cssSrc)
     .pipe(concat('app.min.css'))
     .pipe(minifyCSS({ 'keepSpecialComments': 0 }))
     .pipe(gulp.dest(config.cssout));
});

gulp.task('fonts', ['bower-restore'], function () {
    gulp.src(config.fontawsomefonts)
        .pipe(gulp.dest(config.fontsout));
});

// Combine and minify css files and output fonts
gulp.task('styles', ['css', 'fonts'], function () {

});

//Restore all bower packages
gulp.task('bower-restore', function () {
    return bower();
});

//Set a default tasks
gulp.task('default', ['scripts', 'styles'], function () {

});