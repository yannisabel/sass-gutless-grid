var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')({
        pattern: '*'
    }),
    browserSync = require('browser-sync');

/* Paths to Dev and web environnement for path flexibility*/
var devPaths = {
    base: 'src',
    pages: 'src/pages',
    styles: 'src/sass',
    script: 'src/js',
    img: 'src/images',
    fonts: 'src/fonts'
};

var webPaths = {
    pages: 'web',
    styles: 'web/css',
    script: 'web/js',
    img: 'web/images',
    fonts: 'web/fonts'
};


// Browser synchronisation
gulp.task('browserSync', function() {
    browserSync({
        server: {
          baseDir: webPaths.pages
        },
    })
});

// Duplicate fonts folder in webPath
gulp.task('fonts', function() {
    return gulp.src(devPaths.fonts + '/**/*')
        .pipe(gulp.dest(webPaths.fonts))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Duplicate images folder in webPath and minify them
gulp.task('imagemin', function(){
    return gulp.src(devPaths.img + '/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(plugins.cache(plugins.imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest(webPaths.img))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Duplicate pages folder in webPath
gulp.task('html', function() {
    return gulp.src(devPaths.pages + '/**/*.html')
        .pipe(gulp.dest(webPaths.pages))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Duplicate main.js file and minify it in the webPath
gulp.task('js', function() {
    return gulp.src(devPaths.script + '/**/*.js')
        .pipe(plugins.uglify())
        .pipe(gulp.dest(webPaths.script))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Compile sass main file to a css file in webPath
gulp.task('sass', function() {
    return gulp.src(devPaths.styles + '/main.scss')
        .pipe(plugins.sass({
            precision: 10,
            onError: console.error.bind(console, 'Sass error:')
        }))
        .pipe(plugins.autoprefixer("last 2 versions", "> 1%"))
        .pipe(plugins.cssbeautify({
            indent: '  ',
            autosemicolon: true
        }))
        .pipe(gulp.dest(webPaths.styles))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Duplicate css files to the webPath
gulp.task('css', function() {
    return gulp.src(devPaths.styles + '/**/*.css')
        .pipe(gulp.dest(webPaths.styles))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Default Task
gulp.task('default', ['browserSync', 'fonts', 'imagemin', 'html', 'js', 'sass', 'css'], function() {
    gulp.watch(devPaths.fonts + '**/*', ['fonts']);
    gulp.watch(devPaths.img + '/**/*.+(png|jpg|jpeg|gif|svg)', ['imagemin']);
    gulp.watch(devPaths.pages + '/**/*.html', ['html']);
    gulp.watch(devPaths.script + '/**/*.js', ['js']);
    gulp.watch(devPaths.styles + '/**/*.scss', ['sass']);
    gulp.watch(devPaths.styles + '/**/*.css', ['css']);

});
