import gulp from "gulp";
import dartSass from "sass";
import gulpSass from "gulp-sass";

import imagemin from "gulp-imagemin";

const sass = gulpSass(dartSass);

import GulpPostCss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import cssnanoPlugin from "cssnano";
import sourcemaps from "gulp-sourcemaps";

import webp from "gulp-webp";
import avif from "gulp-avif";

export const css = () => {
  return gulp
    .src("src/scss/app.scss")
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(GulpPostCss([autoprefixer(), cssnanoPlugin()]))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("build/css"));
};

export const images = () => {
  return gulp
    .src("src/images/**/*")
    .pipe(imagemin({ optimizationLevel: 3 }))
    .pipe(gulp.dest("build/img"));
};

export const versionAvif = () => {
  return gulp
    .src("src/images/**/*.{png}")
    .pipe(avif())
    .pipe(gulp.dest("build/img"));
};

export const versionWebp = () => {
  return gulp
    .src("src/images/**/*.{png}")
    .pipe(webp())
    .pipe(gulp.dest("build/img"));
};

export const watchFiles = () => {
  gulp.watch("src/scss/**/*.scss", css);
  gulp.watch("src/images/**/*", images);
};

const build = gulp.series(images, versionAvif, versionWebp, css, watchFiles);

export default build;
