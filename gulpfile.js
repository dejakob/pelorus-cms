'use strict';

require('./gulp/docs.js');
require('./gulp/sass.js');
require('./gulp/vendors.js');
require('./gulp/scripts.js');

var plugins = require('gulp-load-plugins')({
        camelize: true
    }),
    gulp = require('gulp'),
    runSequence = require('run-sequence'),
    wiredep = require('wiredep').stream,
    publicRoot = './public';

// Start the node-server with nodemon
gulp.task('nodemon', function() {
    return plugins.nodemon({
            script: 'app.js',
            tasks: ['lint']
        })
        .on('restart', function() {
            console.log('Restarting server now');
        });
});

// Start the static webserver
gulp.task('webserver', function() {
    gulp.src(publicRoot)
        .pipe(plugins.webserver({
            livereload: {
                enable: true,
                port: 1337
            },
            port: 4001,
            directoryListing: false,
            open: true,
            host: 'localhost',
            fallback: 'index.html'
        })
    );
});

gulp.task('server', function() {
    runSequence(
        'lint',
        'nodemon'
    );
});

// Script injection
gulp.task('injectJS', function () {
    var target = gulp.src(publicRoot+'/index.html'),
        sources = gulp.src([publicRoot+'/app/**/*.js', '!'+publicRoot+'/app/bower_components/**/*']).pipe(plugins.angularFilesort());
    return target.pipe(plugins.inject(sources, {relative: true})).pipe(gulp.dest(publicRoot));
});

// CSS injection
gulp.task('injectCSS', function () {
    var target = gulp.src(publicRoot+'/index.html'),
        sources = gulp.src([publicRoot+'/assets/css/**/*.css', '!'+publicRoot+'/app/bower_components/**/*']);
    return target.pipe(plugins.inject(sources, {relative: true})).pipe(gulp.dest(publicRoot));
});

gulp.task('frontend', ['wiredep', 'scripts', 'sass', 'webserver', 'watch']);
