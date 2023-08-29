import fileinclude from "gulp-file-include";

export const ejs = () => {
    return app.gulp.src(app.path.src.ejs)
        .pipe(fileinclude())
        .pipe(app.plugins.replace(/@img\//g, "imports/img/"))
        .pipe(app.plugins.replace(/@js\//g, "js/"))
        .pipe(app.gulp.dest(app.path.build.ejs))
        .pipe(app.plugins.browserSync.stream());
}