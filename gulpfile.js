var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    browserSync = require('browser-sync').create();
    // Do not need anything below since plugins will include all packages that start with 'gulp'.
    // sass = require('gulp-sass'),
    // autoprefixer = require('gulp-autoprefixer'),
    // cssMin = require('gulp-cssmin'),
    // sourcempas = require('gulp-sourcemaps');

gulp.task('css', function() {
    //compile sass
    //output file to a dist
    return gulp.src(['./src/sass/main.scss'])
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass().on('error', plugins.sass.logError))
        .pipe(plugins.cssmin())
        .pipe(plugins.autoprefixer())
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('js', function() {
    return gulp.src([
        './node_modules/jquery/dist/jquery.min.js',
        './src/js/magic.js',
        './src/js/admin.js'
    ])
    .pipe(plugins.babel({
        presets: ['es2015']
    }))
    .pipe(plugins.concat('all.js'))
    .pipe(plugins.uglify())
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream());
});

//watch for file changes and run tasks
gulp.task('watch', function() {
    gulp.watch(['./src/sass/*.scss'], ['css'])
    gulp.watch(['./src/js/*.js'], ['js']);
});

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('*.html').on('change', browserSync.reload)
});

gulp.task('default', ['css', 'js', 'watch', 'serve']);
