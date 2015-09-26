var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    watch = require('gulp-watch'),
    rename = require('gulp-rename');

var jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify');

var paths = {
    js: ['./*.js', '!gulpfile.js', '!./*.min.js']
};

var watcherJs;

gulp.task('scripts', function () {
    return gulp.src(paths.js)
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(uglify())
        .pipe(rename({
            extname: ".min.js"
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('default', ['scripts'], function () {
    watcherJs = gulp.watch(paths.js, ['scripts']);
    watcherJs.on('change', function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});
