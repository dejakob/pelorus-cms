'use strict';

require('rootpath')();
var mongoose = require('mongoose'),
    config = require('config/config'),
    path = require('path'),
    GFS = require('app/middleware/gfs');

// Connect to db
mongoose.connect(config.mongo.url + path.sep + config.mongo.db);

// Initialize Grid FS
GFS.initialize();
