'use strict'

/**
 * 
 */

import gulp from 'gulp'
import gutil from 'gulp-util'
import sassTranspiler from 'gulp-sass'
import newer from 'gulp-newer'
import del from 'del'

let browsersync = false

const dir = {
    src: 'src/',
    build: 'build/'
}

export const clean = () => {
    return del([dir.build + '**', `!${build.dir}`], {
        force: true,
    })
}

const htmlPaths = {
    src: dir.src + '*.html',
    build: dir.build,
}

export const html = () => {
    return gulp.src(htmlPaths.src)
    .pipe(newer(htmlPaths.build))
    .pipe(gulp.dest(htmlPaths.build))
}

const jsPaths = {
    src: dir.src + 'assets/js/*.js',
    build: dir.build + 'assets/js',
}

export const js = () => {
    return gulp.src(jsPaths.src)
    .pipe(newer(jsPaths.build))
    .pipe(gulp.dest(jsPaths.build))
}

const scssPaths = {
    src: dir.src + 'assets/scss/**/*.scss',
    build: dir.build + 'assets/css',
}

export const sass = () => {
    return gulp.src(scssPaths.src)
    .pipe(newer(scssPaths.build))
    .pipe(sassTranspiler())
    .pipe(gulp.dest(scssPaths.build))
    .pipe(browsersync ? browsersync.reload({ stream: true }) : gutil.noop())
}

const imagePaths = {
    src: dir.src + 'assets/images/*',
    build: dir.build + 'assets/images'
}

export const image = () => {
    return gulp.src(imagePaths.src)
    .pipe(newer(imagePaths.build))
    .pipe(gulp.dest(imagePaths.build))
}

export const build = gulp.parallel(html, sass, image, js)

const syncOptions = {
    server: {
        baseDir: dir.build,
    },
    open: false,
    notify: false,
    ghostmode: false,
    ui: {
        port: 8001,
    }
}

const sync = (done) => {
    if (browsersync === false) {
        browsersync = require('browser-sync').create()
        browsersync.init(syncOptions)
    }
    done()
}

const syncReload = (done) => {
    browsersync && browsersync.reload()
    done()
}

export const watch = gulp.series(build, sync, (done) => {

    gulp.watch(htmlPaths.src, gulp.series(html, syncReload))

    gulp.watch(imagePaths.src, image)

    gulp.watch(scssPaths.src, sass)

    gulp.watch(jsPaths.src, js)

    done()
})

export default watch