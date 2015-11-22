'use strict';

const LOAD_PLUGINS_CONFIG = { camelize: true };

let gulp    = require('gulp');
let plugins = require('gulp-load-plugins')(LOAD_PLUGINS_CONFIG);
let paths   = require('./paths.js');

gulp.task('watch', watchTask);

function watchTask ()
{
    let files = paths.frontend.js.concat(paths.frontend.sass);

    return plugins.watch(files, ['frontend']);
}