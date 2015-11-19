'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    uuid = require('node-uuid');

var TaxonomySchema = new Schema({
    uuid: {
        type: String,
        default: uuid,
        required: true,
        index: true
    },
    label: {
        type: String,
        required: true
    },
    safeLabel: {
        type: String,
        required: true
    },
    tags: [{
        uuid: {
            type: String,
            default: uuid,
            required: true
        },
        label: {
            type: Object,
            required: true
        },
        safeLabel: {
            type: String,
            required: true
        }
    }]
});

// Set the name of the collection
TaxonomySchema.set('collection', 'taxonomy');

module.exports = mongoose.model('Taxonomy', TaxonomySchema);
