const gulp = require('gulp')
const { src, watch, dest, series } = require('gulp')
const gulpts = require('gulp-typescript')
const spawn = require('child_process').spawn
const jsonTransform = require('gulp-json-transform')
const sourcemaps = require('gulp-sourcemaps')

const paths = {
  scripts: ['src/**/*.ts'],
  statics: [
    'src/**/*.json',
    'src/**/*.wxml',
    'src/**/*.wxss',
    'src/**/*.png',
    'src/**/*.jpg',
  ],
  dependence: ['package.json'],
}

const tsProject = gulpts.createProject('tsconfig.json')

function copyStatic() {
  return src(paths.statics)
    .pipe(dest('dist'))
}

function buildTS() {
  return src(paths.scripts)
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'))
}

function copyDendence(done) {
  src(paths.dependence)
    .pipe(jsonTransform(json => {
      delete json.devDependencies
      delete json.scripts
      return json
    }))
    .pipe(gulp.dest('dist'))
  spawn('npm', ['install'], { cwd: 'dist', stdio: 'inherit' })
    .on('close', done)
}

function init() {
  const init = series(copyStatic, buildTS, copyDendence)
  init()
}

exports.default = () => {
  init()
  watch(paths.statics, copyStatic)
  watch(paths.scripts, buildTS)
  watch('package.json', copyDendence)
}