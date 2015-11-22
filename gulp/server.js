'use strict';

const LOAD_PLUGINS_CONFIG = { camelize: true };

let gulp    = require('gulp');
let plugins = require('gulp-load-plugins')(LOAD_PLUGINS_CONFIG);
let paths   = require('./paths.js');

gulp.task('lint', jsLintTask);
gulp.task('nodemon', nodemonTask);
gulp.task('webserver', webserverTask);
gulp.task('server', ['lint', 'nodemon']);


function jsLintTask ()
{
    return gulp
        .src(paths.frontend.concat(paths.backend))
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter(stylish));
}

function nodemonTask ()
{
    const NODEMON_CONFIG = {
        script: 'app.js',
        tasks: ['lint']
    };

    return plugins
        .nodemon(NODEMON_CONFIG)
        .on('restart', onRestart);

    function onRestart ()
    {
        console.log('Restarting server now');
    }
}

function webserverTask ()
{
    const WEBSERVER_CONFIG = {
        livereload: {
            enable: true,
            port: 1337
        },
        port: 4001,
        directoryListing: false,
        open: true,
        host: 'localhost',
        fallback: 'index.html'
    };

    return gulp
        .src(paths.frontend.root)
        .pipe(plugins.webserver(WEBSERVER_CONFIG));
}