'use strict';

const LOAD_PLUGINS_CONFIG = { camelize: true };

let gulp    = require('gulp');
let plugins = require('gulp-load-plugins')(LOAD_PLUGINS_CONFIG);
let wiredep = require('wiredep').stream;
let paths   = require('./paths.js');

gulp.task('vendors', ['wiredep']);
gulp.task('wiredep', wiredepTask);

function wiredepTask ()
{
    const SCRIPT_REGEX = /<script.*src=['"]([^'"]+)/gi;
    const LINK_REGEX = /<link.*href=['"]([^'"]+)/gi;
    const WIREDEP_CONFIG = {
        directory: paths.frontend.jsVendorsDir,
        fileTypes: {
            html: {
                block: /(([ \t]*)<!--\s*bower:*(\S*)\s*-->)(\n|\r|.)*?(<!--\s*endbower\s*-->)/gi,
                detect: {
                    js: SCRIPT_REGEX,
                    css: LINK_REGEX
                },
                replace: {
                    js: '<script src="{{filePath}}"></script>',
                    css: '<link rel="stylesheet" href="/{{filePath}}" />'
                }
            }
        }
    };

    return gulp.src(paths.frontend.mainHtml)
        .pipe(wiredep(WIREDEP_CONFIG))
        .pipe(gulp.dest(paths.frontend.root));
}