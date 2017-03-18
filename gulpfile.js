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
       'bower_components/underscore/underscore-min.js',
         'bower_components/angular/angular.min.js',
          "bower_components/jquery/dist/jquery.slim.min.js",
         'bower_components/bootstrap/dist/js/bootstrap.min.js',
         "bower_components/angular-route/angular-route.min.js",
         "bower_components/angular-animate/angular-animate.min.js",
         "wwwroot/vendors/ui-bootstrap-custom-tpls-2.5.0.min.js",
         "bower_components/ng-rating/js/ng-rating.js",
         //'bower_components/angular-animate/angular-animate.min.js',
         //'bower_components/angular-block-ui/dist/angular-block-ui.min.js',
         'bower_components/angular-toastr/dist/angular-toastr.tpls.min.js',
    ],

    cssSrc: [
        //'bower_components/angular-block-ui/dist/angular-block-ui.min.css',
       'bower_components/bootstrap/dist/css/bootstrap.min.css',
       'bower_components/ng-rating/css/ng-rating.css',
       'bower_components/font-awesome/css/font-awesome.min.css',

        //'bower_components/angular-loading-bar/build/loading-bar.min.css',
        'bower_components/angular-toastr/dist/angular-toastr.min.css',
         'wwwroot/assets/css/app.css'
    ],


    fontawsomefonts: 'bower_components/font-awesome/fonts/*.*',

    fontsout: 'wwwroot/assets/fonts',
    cssout: 'wwwroot/assets/css'

}

//Create a jquery bundled file
gulp.task('vendor-bundle', ['bower-restore'], function () {
    return gulp.src(config.vendorSrc)
     .pipe(concat('vendor-bundle.min.js'))
     .pipe(gulp.dest('wwwroot/assets/vendor'));
});


gulp.task('clean-scripts', ['vendor-bundle'], function (cb) {
    del(['www/scripts/vendor-bundle.min.js'], cb);
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
gulp.task('scripts', ['clean-scripts'], function () {

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