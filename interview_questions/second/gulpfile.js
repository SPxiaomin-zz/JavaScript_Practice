var gulp = require('gulp');

var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var paths = {
    scripts: ['*.js', '!code.min.js', '!gulpfile.js']
};

gulp.task('lint', function () {
    return gulp.src(paths.scripts)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
});

gulp.task('scripts', function () {
    return gulp.src(paths.scripts)
        .pipe(uglify())
        .pipe(rename('code.min.js'))
        .pipe(gulp.dest('./'))
});

gulp.task('default', ['lint', 'scripts'], function () {
    gulp.watch('./*.js', ['lint', 'scripts']);
});
