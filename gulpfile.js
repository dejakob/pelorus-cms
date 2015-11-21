'use strict';

require('./gulp/docs.js');
require('./gulp/sass.js');
require('./gulp/vendors.js');
require('./gulp/scripts.js');
require('./gulp/server.js');
require('./gulp/watch.js');

let gulp = require('gulp');

gulp.task('frontend', ['wiredep', 'scripts', 'sass', 'webserver', 'watch']);
gulp.task('default', ['frontend']);
