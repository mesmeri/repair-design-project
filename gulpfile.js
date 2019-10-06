
// plugins

const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const browserSync = require('browser-sync').create();

// css compilation

function styles() {
	return gulp.src('scss/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(concat('styles.css'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('css/'))
		.pipe(browserSync.stream());
}

// clean css dir

function clean() {
	return del(['css/*'])
};


// watching for changes

function watch() {
	browserSync.init({
        server: {
            baseDir: "./"
        },
        tunnel: true
    });

	gulp.watch('scss/**/*.scss', styles);
	gulp.watch("*.html").on("change", browserSync.reload);
};


// tasks list

gulp.task('styles', styles);
gulp.task('clean', clean); 
gulp.task('watch', watch);

gulp.task('build', gulp.series('clean', 'styles'));

gulp.task('dev', gulp.series('build', 'watch'));
