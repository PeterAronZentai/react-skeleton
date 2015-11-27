var gulp        = require('gulp');
var gutil       = require('gulp-util');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var babelify    = require('babelify');
var watchify    = require('watchify');
var exorcist    = require('exorcist');
var browserify  = require('browserify');
var browserSync = require('browser-sync').create();
var uglify      = require('gulp-uglify');

var dependencies = [
    'react',
    'react/addons.js'
];

function bundle(pipeline, watch) {
    gutil.log('Bundling JS...');

    var vendor = browserify({require: dependencies}, watchify.args);
    vendor
        .transform(babelify.configure({ }))
        .bundle()
        .pipe(exorcist('./public/dist/vendor.js.map'))
        .pipe(source("vendor.js"))
        .pipe(gulp.dest('./public/dist'));

    return pipeline.bundle()
        .on('error', function (err) {
            if (watch) browserSync.notify("Browserify Error!")
            gutil.log(err.message);
            this.emit("end")
        })
        .pipe(exorcist('./public/dist/bundle.js.map'))
            .pipe(source('bundle.js'))
            .pipe(gulp.dest('./public/dist'))
            .pipe(browserSync.stream({once: true}));
}

function bundle_dev() {
    
    return pipeline_dev.bundle()
        .on('error', function (err) {
            browserSync.notify("Browserify Error!")
            gutil.log(err.message);
            this.emit("end")
        })
        .pipe(exorcist('./public/dist/bundle.js.map'))
            .pipe(source('bundle.js'))
            .pipe(gulp.dest('./public/dist'))
            .pipe(browserSync.stream({once: true}));
}

var pipeline_dev;
/**
 * Gulp task alias
 */
gulp.task('bundle-w', function () {

    watchify.args.debug = true;

    gutil.log('Bundling vendor JS...');

    var vendor = browserify({require: dependencies}, watchify.args);
    vendor
        .transform(babelify.configure({ }))
        .bundle()
        .pipe(exorcist('./public/dist/vendor.js.map'))
        .pipe(source("vendor.js"))
        .pipe(gulp.dest('./public/dist'));

    gutil.log('Bundling bundle JS...');

    pipeline_dev = watchify(browserify('./frontend/Startup.jsx', watchify.args));
    
    dependencies.forEach(function(d) {
        pipeline_dev.external(d)
    });
    
    pipeline_dev.transform(babelify.configure({ }));
    pipeline_dev.on('update', bundle_dev);

    return bundle_dev();
});

gulp.task('bundle', function () {
    watchify.args.debug = true;
    var pipeline = browserify('./frontend/Startup.jsx', watchify.args);
    pipeline.transform(babelify.configure({ }));

    dependencies.forEach(function(d) {
        pipeline.external(d)
    });
    return bundle(pipeline, true);
})


gulp.task('default', ['bundle-w'], function () {
    browserSync.init({  proxy: 'http://localhost:3000', port:9999 })
});