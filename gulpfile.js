const gulp = require('gulp');
const stylus = require('gulp-stylus');
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync').create();

gulp.task('default', ['watch:css', 'vendor:css', 'fonts', 'serve:dev', 'sync']);


gulp.task('sync', () => {
    browserSync.init({
        proxy: 'http://localhost:3000',
        port: 3001,
        files: ['app/**/*.*', '!app/**/*.styl']
    });
});

gulp.task('serve:dev', () => {
    nodemon({
        script: 'server.js',
        ext: 'js',
        ignore: ['app*', 'gulp*']
    });
});

gulp.task('watch:css', ['css'], () => {
    gulp.watch('app/css/**/*.styl', ['css']);
});

gulp.task('css', () => {
    return gulp.src(['app/css/**/*.styl'])
        .pipe(stylus())
        .pipe(gulp.dest('app/assets/'));
});

gulp.task('vendor:css', () => {
    return gulp.src(['bower_components/**/*.min.css'])
        .pipe(gulp.dest('app/assets/'));
});

gulp.task('fonts', () => {
    return gulp.src(['bower_components/font-awesome/fonts/*.*'])
        .pipe(gulp.dest('app/assets/font-awesome/fonts'));
});

gulp.task('build', ['css', 'vendor:css', 'fonts']);
