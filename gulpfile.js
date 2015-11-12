'use strict';

var plugins = require('gulp-load-plugins')({
        camelize: true
    }),
    gulp = require('gulp'),
    stylish = require('jshint-stylish'),
    runSequence = require('run-sequence');

// Linter for .js files
gulp.task('lint', function() {
    return gulp.src(['!./public/*', '*.js'])
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter(stylish));
});

// Start the server with nodemon
gulp.task('nodemon', function() {
    return plugins.nodemon({
            script: 'app.js',
            tasks: ['lint']
        })
        .on('restart', function() {
            console.log('Restarting server now');
        });
});

// Create docs based on apidoc
gulp.task('apidoc',function(done) {
    plugins.apidoc({
        src: 'app/',
        dest: 'docs/',
        includeFilters: [ '.*\\.js$' ]
    }, done);
});

// Open docs in default browser
gulp.task('openDocs',function() {
    gulp.src('./docs/index.html')
        .pipe(plugins.open());
});

gulp.task('default', function() {
    runSequence(
        'lint',
        'nodemon'
    );
});

gulp.task('docs', function(cb) {
    runSequence(
        'apidoc',
        'openDocs'
    );
});
