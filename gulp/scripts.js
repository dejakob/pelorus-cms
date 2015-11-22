'use strict';

const LOAD_PLUGINS_CONFIG = { camelize: true };

let config  = require('../package.json');
let gulp    = require('gulp');
let plugins = require('gulp-load-plugins')(LOAD_PLUGINS_CONFIG);
let wiredep = require('wiredep').stream;
let paths   = require('./paths.js');

gulp.task('scripts', scriptsTask);

function scriptsTask ()
{
    const VERSION = config.version || '1.0.0';
    const VERSION_CONFIG = {
        value: VERSION,
        replaces: [
            '{APP_VERSION}',
            [/\{APP_VERSION\}/g, VERSION]
        ]
    };

    return gulp
        .src(paths.frontend.js)
        .pipe(plugins.concat('script.js'))
        .pipe(plugins.versionNumber(VERSION_CONFIG))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(paths.frontend.dist.js));
}