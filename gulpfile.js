const gulp = require('gulp'),
    del = require('del'),
    connect = require('gulp-connect'),
    webserver = require('gulp-webserver');

gulp.task('clean', function (cb) {
    del([
        'dist'
    ], cb)
});

gulp.task('connect', function () {
    connect.server({
        root: './',
        livereload: true
    });
});

gulp.task('server', function() {
    gulp.src('./')
        .pipe(webserver({
            livereload: true,
            open: 'http://localhost:8000/dist'
        }));
});

gulp.task('watch', function () {
    return gulp.watch(['./index.html', './styles/*.css'], ['build']);
});

gulp.task('build', ['build-lib', 'build-images'], function () {
    return gulp.src(['./index.html', './styles/*.css'])
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload());
});

gulp.task('build-lib', function () {
    return gulp.src(['./node_modules/bootstrap/dist/css/bootstrap.min.css', './node_modules/jquery/jquery.min.js', './node_modules/popper.js/dist/umd/popper.min.js', './node_modules/bootstrap/dist/js/bootstrap.min.js'])
        .pipe(gulp.dest('./dist/lib'));
});

gulp.task('build-images', function () {
    return gulp.src('./images/')
        .pipe(gulp.dest('./dist/images'));
});

gulp.task('dev', ['build', 'watch', 'server', 'connect']);