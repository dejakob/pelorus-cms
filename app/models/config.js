'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    uuid = require('node-uuid');

var ConfigSchema = new Schema({
    uuid: {
        type: String,
        default: uuid,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['variables', 'settings'],
        unique: true
    },
    data: {
        siteRoot: {
            type: String
        },
        siteName: {
            type: String
        },
        siteHome: {
            type: String,
            ref: "Page"
        }
    },
    versions: [],
}, {strict: false});

// Set the name of the collection
ConfigSchema.set('collection', 'config');

module.exports = mongoose.model('Config', ConfigSchema);
