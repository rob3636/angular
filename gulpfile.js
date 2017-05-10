var gulp     = require('gulp')
var babel    = require('gulp-babel')
var order    = require('gulp-order')
var watch    = require('gulp-watch')
var concat   = require('gulp-concat')
var notify   = require('gulp-notify')
var rename   = require('gulp-rename')
var uglify   = require('gulp-uglify')
var plumber  = require('gulp-plumber')
var annotate = require('gulp-ng-annotate')

var paths ={
    angular: {
        js: ['public/angular/*.js', 'public/angular/**/*.js']
    },
    
    output: 'public/dist'
}

var plumberOptions = {
	errorHandler: notify.onError("Error: <%= error.message %>")
}

gulp.task('angular', function() {
	var stream = gulp.src(paths.angular.js)
		.pipe(plumber(plumberOptions))
        .pipe(babel({presets: ['es2015']}))
        .pipe(annotate())
		.pipe(uglify())
		.pipe(order(['app.js']))
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest(paths.output))

	return stream
})

gulp.task('watch', ['angular'], function(){
    gulp.watch(paths.angular.js, ['angular'])
})

gulp.task('default', ['angular'])