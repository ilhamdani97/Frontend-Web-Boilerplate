import { dest, parallel, series, src, watch } from "gulp";
import autoprefixer from "autoprefixer";
import babelify from "babelify";
import browserify from "browserify";
import browserSync from "browser-sync";
import buffer from "vinyl-buffer";
import c from "ansi-colors";
import del from "del";
import plumber from "gulp-plumber";
import postcss from "gulp-postcss";
import postcssScss from "postcss-scss";
import pug from "gulp-pug";
import sass from "gulp-sass";
import source from "vinyl-source-stream";
import sourcemaps from "gulp-sourcemaps";
import watchify from "watchify";

/** ------ CONFIG ------ */
const GET_ENV = process.env.NODE_ENV; // production || development
const SRC = "./src";
const BUILD = "./build";
const EMITTY = require("emitty").setup("./src/pug", "pug");

const DEV_PATH = {
  view: {
    watch: `${SRC}/pug/**/*.pug`,
    pages: `${SRC}/pug/pages/*.pug`,
  },
  style: `${SRC}/scss/main.scss`,
  allStyle: `${SRC}/scss/**/*.scss`,
  script: `${SRC}/scripts/main.js`,
};

const BUILD_PATH = {
  view: `${BUILD}`,
  style: `${BUILD}/assets/css`,
  script: `${BUILD}/assets/js`,
};
/** ------ END CONFIG ------ */

/**
 * @name Clean
 * @description delete build folder
 */
const clean = () => del(BUILD, { force: true });

/**
 * @name CompilePug
 * @description Compiles Pug files to HTML
 */

export const compilePug = () => {
  return src(DEV_PATH.view.pages)
    .pipe(pug({ pretty: true })).on("error", err => console.log(c.red.bold(err.message, err.path)))
    .pipe(dest(BUILD_PATH.view));
};

/**
 * @name CompileSass
 * @description Compiles SCSS files to CSS
 */
export const compileSass = () => {
  return src(DEV_PATH.style)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", err => console.log(c.red.bold(err.message, err.path))))
    .pipe(postcss([autoprefixer()], { syntax: postcssScss }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(dest(BUILD_PATH.style))
    .on('end', () => console.log(c.green.bold('--------- SCSS finished compiling! ---------')));
};

/**
 * @name CompileJS
 * @description Compiles ES6 files to ES5 (javascripts)
 */

const bundle = bundler => {
  return bundler
    .transform(babelify, { presets: ["@babel/env"] })
    .bundle()
    .on("error", err => console.log(c.red.bold(err.message, err.path)))
    .pipe(source("main.js"))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write("./maps"))
    .pipe(dest(BUILD_PATH.script))
    .on("end", () => console.log(c.green.bold("--------- JS finished compiling! ---------")));
};

export const compileJs = () => {
  return bundle(browserify(DEV_PATH.script, { debug: true }));
};

/** ------ DEV SERVER SETUP ------ */
const server = browserSync.create();

const reload = done => {
  server.reload();
  done();
};

export const devServer = done => {
  server.init({
    // startPath: 'page/index.html',
    server: {
      baseDir: "./build/",
      // directory: true,
    },
  });
  done();
};

export const devWatch = () => {
  // Shows that run "watch" mode
  global.watch = true;

  // watch Pug files
  watch(DEV_PATH.view.watch, series(compilePug, reload));

  // watch SCSS files
  watch(DEV_PATH.allStyle, series(compileSass, reload));

  // watch JS(es6) files
  watchify.args.debug = true;
  const watcher = watchify(browserify(DEV_PATH.script, watchify.args));
  bundle(watcher);
  watcher.on("update", () => bundle(watcher));
};
/** ------ END DEV SERVER ------ */

exports.default = series(clean, parallel(compileSass, compileJs), compilePug, devServer, devWatch);
// add more task here :)
