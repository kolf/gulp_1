var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-ruby-sass'),
    imagemin=require('gulp-imagemin'),
    plumber = require('gulp-plumber'),
    browser = require('browser-sync').create(),
    prefixer = require('gulp-autoprefixer');

gulp.task('scripts', function () {
    gulp.src('js/*.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest('js'))
});

gulp.task('styles', function () {
    return sass('sass/*.scss')
        .pipe(plumber())
        .pipe(prefixer('android 4'))
        .pipe(gulp.dest('css'))
});

gulp.task('html', function() {
    gulp.src('*.html')
});

gulp.task('images', function () {
    return gulp.src('images/*')
        .pipe(plumber())
        .pipe(imagemin())
        .pipe(gulp.dest('images'));
});

gulp.task('browser',function(){
    browser.init({
        server: {
            baseDir: "./"
        }
    })
});

gulp.task('reload', function(){
    browser.reload()
});

// Watch Task
gulp.task('watch', function() {
    gulp.watch('js/*.js', ['scripts','reload']);
    gulp.watch('sass/*.scss', ['styles','reload']);
    gulp.watch('*.html', ['html','reload']);
});
gulp.task('default', ['browser','html', 'scripts', 'styles','images','watch']);