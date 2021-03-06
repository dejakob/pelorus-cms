'use strict';

const LOAD_PLUGINS_CONFIG = { camelize: true };

let gulp    = require('gulp');
let plugins = require('gulp-load-plugins')(LOAD_PLUGINS_CONFIG);
let paths   = require('./paths.js');

gulp.task('docs', ['docs:api', 'docs:open']);
gulp.task('docs:api', apiDocTask);
gulp.task('docs:open', openDocsTask);

function apiDocTask (done)
{
    plugins.apidoc({
        src: 'app/',
        dest: 'docs/',
        includeFilters: [ '.*\\.js$' ]
    }, done);
}

function openDocsTask ()
{
    return gulp
        .src('./docs/index.html')
        .pipe(plugins.open());
}