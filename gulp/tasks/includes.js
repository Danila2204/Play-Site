export const includes = () => {
    return app.gulp.src(app.path.src.includes)
        .pipe(app.gulp.dest(app.path.build.includes));
}