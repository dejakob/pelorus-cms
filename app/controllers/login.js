'use strict';

require('rootpath')();
var uuid = require('node-uuid'),
    userModel = require('app/models/user');

exports.authorize = function(req, user, type, callback) {
    userModel.update({
            type: type,
            userId: user._json.id
        }, {
            $set: {
                type: type,
                name: user.displayName,
                userId: user._json.id,
                avatarUrl: user._json.profile_image_url.replace('_normal', '')
            },
            $setOnInsert: {
                uuid: uuid(),
                created: new Date(),
                lastLogin: new Date(),
                enabled: false,
            }
        }, {
            upsert: true
        })
        .exec(function(err, update) {
            if (!err && update) {
                userModel.findOne({
                    type: type,
                    userId: user._json.id
                }).exec(function(err, user) {
                    if (!err && user) {
                        req.session.profile = user;
                        callback(true);
                    } else {
                        callback(false);
                    }
                })
            } else {
                callback(false);
            }
        });
};
