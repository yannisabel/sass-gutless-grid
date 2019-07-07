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

// Duplicate fonts folder in webPath
function fonts(cb) {
    gulp
        .src(devPaths.fonts + '/**/*')
        .pipe(gulp.dest(webPaths.fonts))
        .pipe(browserSync.stream())
        cb()
}

// Duplicate images folder in webPath and minify them
function imagemin(cb) {
    gulp
        .src(devPaths.img + '/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(plugins.cache(plugins.imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest(webPaths.img))
        .pipe(browserSync.stream())
        cb()
}

// Duplicate pages folder in webPath
function html(cb) {
    gulp
        .src(devPaths.pages + '/**/*.html')
        .pipe(gulp.dest(webPaths.pages))
        .pipe(browserSync.stream())
        cb()
}

// Duplicate main.js file and minify it in the webPath
function js(cb) {
    gulp
        .src(devPaths.script + '/**/*.js')
        .pipe(plugins.uglify())
        .pipe(gulp.dest(webPaths.script))
        .pipe(browserSync.stream())
        cb()
}

// Compile sass main file to a css file in webPath
function sass(cb) {
    gulp
        .src(devPaths.styles + '/main.scss')
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
        .pipe(browserSync.stream())
        cb()
}

// Duplicate css files to the webPath
function css(cb) {
    gulp
        .src(devPaths.styles + '/**/*.css')
        .pipe(gulp.dest(webPaths.styles))
        .pipe(browserSync.stream())
        cb()
}

function watch(cb) {
    browserSync.init({
        server: {
            baseDir: webPaths.pages
        }
    });
    gulp.watch(devPaths.fonts + '**/*', fonts);
    gulp.watch(devPaths.img + '/**/*.+(png|jpg|jpeg|gif|svg)', imagemin);
    gulp.watch(devPaths.pages + '/**/*.html', html);
    gulp.watch(devPaths.script + '/**/*.js', js);
    gulp.watch(devPaths.styles + '/**/*.scss', sass);
    gulp.watch(devPaths.styles + '/**/*.css', css);
    cb()
}

exports.html = html;
exports.sass = sass;
exports.css = css;
exports.js = js;
exports.fonts = fonts;
exports.imagemin = imagemin;
exports.watch = watch

exports.default = gulp.series(html, sass, css, js, fonts, imagemin, watch);
