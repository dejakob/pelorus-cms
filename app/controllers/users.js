'use strict';

require('rootpath')();
var userModel = require('app/models/user');

/**
 * @api {get} /api/1.0.0/user/profile Get logged in user
 * @apiName Logged in user
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiSuccess (200) {String} name First and lastname of user.
 * @apiSuccess (200) {String} avatarUrl Url with the avatar.
 * @apiSuccess (200) {String} type Login type (always A-stad at the moment).
 * @apiSuccess (200) {String} userId Unique user ID.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "name": "John Doe",
 *       "avatarUrl": "http://i.imgur.com/3iLPbJh.png",
 *       "type": "astad",
 *       "userId": "xxxxxxxxxxxxxxxxxxxxxxxx"
 *     }
 *
 * @apiError (401) {Object} / Empty object.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Not authorized
 *     { }
 */
exports.profile = function(req, res, next) {
    if(req.session.hasOwnProperty('profile')) {
        userModel.findOne({userId: req.session.profile.userId, type: req.session.profile.type})
            .populate('roles')
            .lean()
            .exec(function(err, profile) {
                if(!err && profile) {
                    res.status(200).json(profile);
                } else {
                    res.status(401).json({});
                }
            });
    } else {
        res.status(401).json({});
    }
};

/**
 * @api {get} /api/1.0.0/user/logout Log out the current user
 * @apiName Log out
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiSuccess (200) {Object} / Empty object.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     { }
 */
exports.logout = function(req, res, next) {
    if(req.session.hasOwnProperty('profile')) {
        delete req.session.profile;
        delete req.session.token;
    }
    res.status(200).json({});
};

// Set dummy user - only in TEST ENV
exports.dummy = function(req, res, next) {
    userModel.findOne({
            type: 'dummy',
            userId: '000000000000000000000000'
        })
        .populate('roles')
        .lean()
        .exec(function(err, user) {
            if (!err && user) {
                req.session.profile = user;
                res.status(200).json(user);
            } else {
                res.status(400).json();
            }
        });
};

