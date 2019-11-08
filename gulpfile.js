var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
	return gulp.src([//'node_modules/bootstrap/scss/bootstrap.scss', 
					'node_modules/bootstrap/dist/css/bootstrap.min.css', 
					//'node_modules/mdbootstrap/scss/mdb.scss',
					'mdbootstrap/css/mdb.min.css',
					'node_modules/daterangepicker/daterangepicker.css',
					'src/scss/*.scss'])
		.pipe(sass({ outputStyle: 'compressed' }))
		.pipe(gulp.dest("src/css"))
		.pipe(browserSync.stream());
});

// Move the javascript files into our /src/js folder
gulp.task('js', function () {
	return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 
					'node_modules/jquery/dist/jquery.min.js', 
					'node_modules/popper.js/dist/umd/popper.min.js',
					'mdbootstrap/js/mdb.min.js',
					//'node_modules/daterangepicker/moment.min.js',
					'node_modules/moment/min/moment.min.js',
					'node_modules/daterangepicker/daterangepicker.js'])
		.pipe(gulp.dest("src/js/libs"))
		.pipe(browserSync.stream());
});

// Moment locale ru
gulp.task('locale', function () {
	return gulp.src(['node_modules/moment/locale/ru.js',])
		.pipe(gulp.dest("src/js/libs/moment"));
});

// Static Server + watching scss/html files
gulp.task('serve', gulp.series('sass', function () {

	browserSync.init({
		//server: "./src"
		proxy: "localhost:80" //xampp
	});

	gulp.watch([/*'node_modules/bootstrap/scss/bootstrap.scss', */'src/scss/*.scss'], gulp.series('sass'));
	gulp.watch("src/*.html").on('change', browserSync.reload);
}));

gulp.task('default', gulp.parallel('js', 'locale', 'serve'));