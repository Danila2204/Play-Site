import fileinclude from "gulp-file-include"

export const backend = () => {
    return app.gulp.src(app.path.src.server)
        .pipe(fileinclude())
        .pipe(app.gulp.dest(app.path.build.server))
}