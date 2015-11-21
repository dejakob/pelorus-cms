const FRONT_END_DIR = './public/';

const PATHS = {
    frontend: {
        js: [
            FRONT_END_DIR + 'app/modules/auth/services/authentication.js',
            FRONT_END_DIR + 'app/app.module.js',
            FRONT_END_DIR + 'app/**/*.js',
            '!' + FRONT_END_DIR + 'app/bower_components/**/*'
        ],
        jsVendorsDir: FRONT_END_DIR + 'app/bower_components',
        mainHtml: FRONT_END_DIR + 'index.html',
        sass: [
            FRONT_END_DIR + 'assets/scss/**/*.scss'
        ],
        dist: {
            js: FRONT_END_DIR + 'assets/js',
            css: FRONT_END_DIR + 'assets/css'
        }
    },
    backend: {
        js: [
            'app/**/*.js'
        ]
    }
};

module.exports = PATHS;