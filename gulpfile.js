var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    autoprefixer= require('gulp-autoprefixer'),
    cleanCSS    = require('gulp-clean-css'),
    rename      = require('gulp-rename'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    path        = require('path'),
    browserSync = require('browser-sync');


var config = {
    bootstrapDir: './node_modules/bootstrap/scss',
    tatherDir: './node_modules/tether',
    fontAwesomeDir: './node_modules/font-awesome/scss',
    publicDir: './app',
};

gulp.task('browser-sync', ['styles', 'scripts'], function() {
    browserSync({
        server: {
            baseDir: config.publicDir,
            baseDir: 'app'
        },
        notify: false
    });
});

gulp.task('scripts', function() {
	return gulp.src([
        'app/libs/jquery/jquery-1.11.2.min.js',
        'app/libs//bootstrap/js/bootstrap.min.js',
		'app/js/material.min.js',
		// 'app/libs/magnific-popup/magnific-popup.min.js'
		])
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('app/js'));
})

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
    .pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
// .pipe(cleanCSS())
    .pipe(gulp.dest(config.publicDir + '/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('watch', function () {
gulp.watch(['src/sass/*.sass', 'src/sass/**/*.sass', 'src/sass/**/*.scss' ], ['styles'],browserSync.reload);
gulp.watch(['app/*.html'],browserSync.reload);
gulp.watch(['app/js/**/*.js'],browserSync.reload);
});
gulp.task('default', ['browser-sync', 'watch']);
