'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    uuid = require('node-uuid');

var ViewSchema = new Schema({
    uuid: {
        type: String,
        default: uuid,
        required: true,
        index: true
    },
    query: {
        contentType: {
            type: String,
            ref: 'ContentType'
        },
        conditions: [],
        options: {},
        page: {
            type: String,
            ref: 'Page'
        }
    },
    meta: {
        label: {
            type: String,
            required: true
        },
        lastEditor: {
            type: String,
            ref: 'User'
        },
        created: {
            type: Date,
            default: Date.now
        },
        lastModified: {
            type: Date,
            default: Date.now
        },
        deleted: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    label: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    versions: []
}, {strict: false});

// Set the name of the collection
ViewSchema.set('collection', 'views');

module.exports = mongoose.model('View', ViewSchema);
