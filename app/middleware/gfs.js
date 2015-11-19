'use strict';

require('rootpath')();
var mongoose = require('mongoose'),
    Grid = require('gridfs-stream');

module.exports = {
    gfs: null,
    initialize: function() {
        console.log('Initialize');
        var _this = this;
        mongoose.connection.once('open', function() {
            _this.gfs = new Grid(mongoose.connection.db, mongoose.mongo);
        });
    }
};
