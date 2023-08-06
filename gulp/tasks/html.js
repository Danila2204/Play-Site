import fileinclude from "gulp-file-include";

export const html = () => {
    return app.gulp.src(app.path.src.html)
        .pipe(fileinclude())
        .pipe(app.plugins.replace(/@img\//g, "imports/img/"))
        .pipe(app.plugins.replace(/@js\//g, "js/"))
        .pipe(app.gulp.dest(app.path.build.html))
        .pipe(app.plugins.browserSync.stream());
}