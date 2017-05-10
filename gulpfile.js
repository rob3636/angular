var gulp           = require('gulp')
var babel          = require('gulp-babel')
var order          = require('gulp-order')
var watch          = require('gulp-watch')
var concat         = require('gulp-concat')
var notify         = require('gulp-notify')
var rename         = require('gulp-rename')
var uglify         = require('gulp-uglify')
var plumber        = require('gulp-plumber')
var annotate       = require('gulp-ng-annotate')
var php            = require('gulp-connect-php')
var browserSync    = require('browser-sync')
var templateCache  = require('gulp-angular-templatecache')
var add            = require('gulp-add-src')
var insert         = require('gulp-insert')
var replace        = require('gulp-replace')

var paths = {
	angular: {
		js: ['public/angular/*.js', 'public/angular/**/*.js'],
		views: ['public/angular/*.html', 'public/angular/**/*.html']
	},
	output: 'public/dist'
}

var plumberOptions = {
	errorHandler: notify.onError("Error: <%= error.message %>")
}

gulp.task('angular', function() {
	var stream = gulp.src(paths.angular.views)
		.pipe(plumber(plumberOptions))
		.pipe(replace(/\t/g, ''))
		.pipe(replace(/\n/g, ''))
		.pipe(templateCache('templates.js', {module: 'app.views'}))
		.pipe(add(paths.angular.js))
		.pipe(order(['app.js']))
		.pipe(babel({presets: ['es2015']}))
		.pipe(annotate())
		.pipe(uglify())
		.pipe(concat('app.min.js'))
		.pipe(gulp.dest(paths.output))
		.pipe(browserSync.stream()) // make js do reload

	return stream
})

gulp.task('watch', ['angular'], function() {
	gulp.watch(paths.angular.js, ['angular'])
	gulp.watch(paths.angular.views, ['angular'])

	php.server({
		base: 'public',
		port: 8010,
		keepalive: true,
		stdio: 'ignore'
	})

	browserSync({
		proxy: '127.0.0.1:8010',
		port: 8000,
		open: false,
		notify: false
	})
})

gulp.task('default', ['angular'])
