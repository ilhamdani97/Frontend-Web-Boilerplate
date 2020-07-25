# Ilham FE Boilerplate

## Pre-requisite
* NodeJs
* NPM
* Yarn
* NPX (optional)
* Gulp 4 (installed globally and locally)

## How To
* run `yarn install`
* open terminal and run `gulp` or run `yarn start`. This will compile Pug, SCSS and JS files to build folder and start the dev server.

## Folder structures
```
PROJECT_FOLDER
├-- .git/
|
├-- src/
|   ├-- images/
|   ├-- pug/
|   |   ├-- components/
|   |   |   └-- *.pug
|   |   ├-- config/
|   |   ├-- pages/
|   |   |   ├-- 404.pug
|   |   |   ├-- 403.pug
|   |   |   ├-- 500.pug
|   |   |   └-- *.pug
|   |   └-- templates/
|   |       └-- *.pug
|   ├-- scss/
|   |   ├-- base/
|   |   ├-- helper/
|   |   ├-- project/
|   |   |   ├-- init/
|   |   |   ├-- elements/
|   |   |   ├-- components/
|   |   |   ├-- layouts/
|   |   |   └-- pages/
|   |   ├-- temp/
|   |   ├-- vendor/
|   |   └-- main.scss
|   └-- scripts/
|       ├-- components/
|       ├-- dummies/
|       ├-- pages/
|       ├-- services/
|       ├-- utilities/
|       ├-- variables/
|       └-- vendors/
|
├-- build/
|   ├-- assets/
|   |   ├-- css/
|   |   |   ├-- index.html
|   |   |   └-- *.css
|   |   ├-- fonts/
|   |   |   ├-- index.html
|   |   |   ├-- *.ttf
|   |   |   ├-- *.otf
|   |   |   ├-- *.woff
|   |   |   └-- *.woff2
|   |   ├-- images/
|   |   |   ├-- logo/
|   |   |   |   ├-- *.*
|   |   |   |   └-- index.html
|   |   |   ├-- icon/
|   |   |   |   ├-- *.*
|   |   |   |   └-- index.html
|   |   |   ├-- default/
|   |   |   |   ├-- *.*
|   |   |   |   └-- index.html
|   |   |   ├-- banner/
|   |   |   |   ├-- *.*
|   |   |   |   └-- index.html
|   |   |   ├-- dummy/
|   |   |   |   ├-- *.*
|   |   |   |   └-- index.html
|   |   |   └-- index.html
|   |   ├-- js/
|   |   |   ├-- index.html
|   |   |   └-- *.js
|   |   └-- index.html
|   ├-- index.html
|   ├-- 403.html
|   ├-- 404.html
|   ├-- 500.html
|   └-- *.html
|
├-- .gitignore
└-- package.json

```

## To Do
- [ ] add watch task for Pug
- [ ] add BrowserSync
- [ ] add watch task for SCSS
- [ ] use babelify and watchify for ES6 compilation (gulp)
- [ ] add sourcemaps for JS
- [ ] add sourcemaps for SCSS
- [ ] add tasks to handle image files
- [ ] add gulp task to optimize pug build
- [ ] make pug able to read environment for dynamic path
- [ ] update yarn script for prod etc
- [ ] troubleshotting for npm/yarn
- [ ] css for min.* file (prod)
- [ ] make dynamic dev and prod css/js files (optional)
- [ ] add combineMQ package
- [ ] concat feature for old js plugin
- [ ] organize export gulp
