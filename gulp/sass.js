'use strict';

const LOAD_PLUGINS_CONFIG = { camelize: true };

let gulp    = require('gulp');
let plugins = require('gulp-load-plugins')(LOAD_PLUGINS_CONFIG);
let paths   = require('./paths.js');

gulp.task('sass', sassTask);

function sassTask ()
{
    return gulp
        .src(paths.frontend.sass)
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass({outputStyle: 'compressed'}))
        .pipe(plugins.autoprefixer({ browsers: ['last 3 versions'] }))
        .pipe(plugins.sourcemaps.write())
        .pipe(plugins.concat('style.css'))
        .pipe(gulp.dest(paths.frontend.dist.css));
}