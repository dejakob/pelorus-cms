'use strict';

const LOAD_PLUGINS_CONFIG = { camelize: true };

let gulp    = require('gulp');
let plugins = require('gulp-load-plugins')(LOAD_PLUGINS_CONFIG);
let wiredep = require('wiredep').stream;
let paths   = require('./paths.js');

gulp.task('scripts', scriptsTask);

function scriptsTask ()
{
    return gulp
        .src(paths.frontend.js)
        .pipe(plugins.concat('script.js'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(paths.frontend.dist.js));
}