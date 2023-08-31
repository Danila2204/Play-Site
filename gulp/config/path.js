import * as nodePath from "path";
const rootFolder = nodePath.basename(nodePath.resolve());

const distFolder = "./docs";
const srcFolder = "./src";

export const path = {
    build: {
        html: `${distFolder}/`,
        css: `${distFolder}/css/`,
        js: `${distFolder}/js/`,
        files: `${distFolder}/imports/`,
        includes: `${distFolder}/`,
        server: `${distFolder}/server/`,
        ejs: `${distFolder}/`
    },
    src: {
        html: `${srcFolder}/*.html`,
        scss: `${srcFolder}/scss/**/*.scss`,
        js: `${srcFolder}/js/**/*.js`,
        includes: `${srcFolder}/includes/**/*.*`,
        files: `${srcFolder}/imports/**/*.*`,
        server: `${srcFolder}/server/**/*.*`,
        ejs: `${srcFolder}/*.ejs`
    },
    watch: {
        html: `${srcFolder}/**/*.html`,
        scss: `${srcFolder}/scss/**/*.scss`,
        js: `${srcFolder}/js/**/*.js`,
        files: `${srcFolder}/imports/**/*.*`,
        includes: `${srcFolder}/includes/**/*.*`
    },
    clean: distFolder,
    buildFolder: distFolder,
    srcFolder: srcFolder,
    watchFolder: rootFolder,
    ftp: ``
};