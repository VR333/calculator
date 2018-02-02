const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const ugly = require('gulp-uglify');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
var rigger = require('gulp-rigger');

gulp.task('imagemin', function() {
   var img_src = './app/components/calculator/assets/**', img_dest = './build/images';

   gulp.src(img_src)
   .pipe(imagemin())
   .pipe(gulp.dest(img_dest));
});

gulp.task('build', function() {
   var src = './app/**.js', dest = './build/lol/d';

   gulp.src(src)
   .pipe(concat('all.js'))
   .pipe(gulp.dest(dest));
});

gulp.task('requirejsBuild', function() {
	var src = './app/lok.js', dest = './build/';

    gulp.src(src)
	.pipe(rigger())
    .pipe(gulp.dest(dest)); // pipe it to the output DIR
});

gulp.task('start', ['build', 'imagemin']);
