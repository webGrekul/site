var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    autoprefixer= require('gulp-autoprefixer'),
    cleanCSS    = require('gulp-clean-css'),
    rename      = require('gulp-rename'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify');
    path        = require('path');


var config = {
    bootstrapDir: './node_modules/bootstrap/scss',
    tatherDir: './node_modules/tether',
    fontAwesomeDir: './node_modules/font-awesome/scss',
    publicDir: './app',
};

gulp.task('browser-sync', ['styles'], function() {
    var browserSync = require('browser-sync').create();
    browserSync.init({
        server: {
                    baseDir: config.publicDir
                },
        notify: false
    });
});

gulp.task('styles', function () {
    return gulp.src('src/sass/mixins_all.sass')
    .pipe(sass({
        includePaths: [
            config.bootstrapDir,
            require('node-bourbon').includePaths,
            config.tetherDir,
            config.fontAwesomeDir
        ]
    }).on('error', sass.logError))
    .pipe(rename({basename: 'main2', prefix : ''}))
// .pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
// .pipe(cleanCSS())
    .pipe(gulp.dest(config.publicDir + '/css'))
    //.pipe(browserSync.stream());
});

gulp.task('watch', function () {
    gulp.watch(['src/sass/*.sass', 'app/sass/**/*.sass',], ['styles']);
});

gulp.task('default', [ 'browser-sync', 'watch']);
