import dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";

const sass = gulpSass(dartSass);

export const scss = () => {
    return app.gulp.src(app.path.src.scss, { sourcemaps: true })
        .pipe(app.plugins.replace(/@img\//, "../imports/img/"))
        .pipe(sass({
            outputStyle: "expanded"
        }))
        .pipe(rename({
            extname: ".css"
        }))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browserSync.stream())
}