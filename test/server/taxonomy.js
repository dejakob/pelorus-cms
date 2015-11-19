'use strict';

require('rootpath')();
var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    request = require('request'),
    nock = require('nock'),
    path = require('path'),
    glob = require('glob'),
    _ = require('lodash'),
    mongoose = require('mongoose');

// Set the NODE_ENV to test
process.env.NODE_ENV = 'test';

// Start the application
require('../../app.js');

// Require config after setting environment
var config = require('config/config');

// API setup
var api = supertest('http://localhost:' + config.port),
    endpoint = config.api.prefix + config.api.version + 'taxonomy';

describe('Taxonomy', function() {

    function getCookie(callback) {

        api.get('/api/1.0.0/user/dummy')
            .end(function(err, res) {
                var cookie = res.headers['set-cookie'];
                callback(cookie);
            });
    }

    function getTaxonomyTag(callback) {
        getCookie(function(cookie) {
            api.get(endpoint)
                .set('Cookie', cookie)
                .end(function(err, res) {
                    callback(res.body[0]);
                })
        });
    }

    function getTaxonomyTagByUuid(uuid, callback) {
        getCookie(function(cookie) {
            api.get(endpoint + '/' + uuid)
                .set('Cookie', cookie)
                .end(function(err, res) {
                    callback(res.body);
                })
        });

    }


    /**
     * Get all role
     */
    describe('GET ' + endpoint, function() {

        var cookie;

        before(function(done) {
            getCookie(function(c) {
                cookie = c;
                done();
            });
        });

        it('should return an array', function(done) {
            api.get(endpoint)
                .set('Cookie', cookie)
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(200)
                .end(function(err, res) {
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });

    /**
     * Get all role
     */
    describe('GET ' + endpoint + '/allTaxonomy', function() {

        var cookie;

        before(function(done) {
            getCookie(function(c) {
                cookie = c;
                done();
            });
        });

        it('should return an array', function(done) {
            api.get(endpoint + '/allTaxonomy')
                .set('Cookie', cookie)
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(200)
                .end(function(err, res) {
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });

    /**
     * Get all role
     */
    describe('GET ' + endpoint + '/allTags', function() {

        var cookie;

        before(function(done) {
            getCookie(function(c) {
                cookie = c;
                done();
            });
        });

        it('should return an array', function(done) {
            api.get(endpoint + '/allTags')
                .set('Cookie', cookie)
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(200)
                .end(function(err, res) {
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });

    /**
     * Get all role
     */
    describe('GET ' + endpoint + '/:uuid', function() {

        var cookie;
        var tag;

        before(function(done) {
            getCookie(function(c) {
                cookie = c;
                getTaxonomyTag(function(t) {
                    tag = t;
                    done();
                });
            });
        });

        it('should return an array', function(done) {
            api.get(endpoint + '/' + tag.uuid)
                .set('Cookie', cookie)
                .expect('Content-Type', 'application/json; charset=utf-8')
                .end(function(err, res) {
                    expect(res.statusCode).to.be.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.not.have.property('err');
                    done();
                });
        });
    });

    /**
     * Get all role
     */
    describe('POST ' + endpoint, function() {

        var cookie;
        var tag;

        before(function(done) {
            getCookie(function(c) {
                cookie = c;
                getTaxonomyTag(function(t) {
                    tag = t;
                    done();
                });
            });
        });

        it('should return an array', function(done) {
            tag.uuid = '56a07caf-b166-4ff9-8b09-4ccb711f6e66';
            delete tag._id;

            api.post(endpoint)
                .set('Cookie', cookie)
                .send(tag)
                .expect('Content-Type', 'application/json; charset=utf-8')
                .end(function(err, res) {

                    expect(res.statusCode).to.be.equal(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.not.have.property('err');
                    done();
                });
        });
    });

    /**
     * Get all role
     */
    describe('PUT ' + endpoint + '/:id', function() {

        var cookie;
        var tag;

        before(function(done) {
            getCookie(function(c) {
                cookie = c;
                getTaxonomyTagByUuid('56a07caf-b166-4ff9-8b09-4ccb711f6e66', function(t) {
                    tag = t;
                    done();
                });
            });
        });

        it('should return an array', function(done) {
            tag.label = "Testtest";

            api.put(endpoint + '/56a07caf-b166-4ff9-8b09-4ccb711f6e66')
                .set('Cookie', cookie)
                .send(tag)
                .expect('Content-Type', 'application/json; charset=utf-8')
                .end(function(err, res) {
                    expect(res.statusCode).to.be.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.not.have.property('err');
                    expect(res.body.label).to.be.equal('Testtest');
                    done();
                });
        });
    });

    /**
     * Get all role
     */
    describe('DELETE ' + endpoint + '/:id', function() {

        var cookie;
        var tag;

        before(function(done) {
            getCookie(function(c) {
                cookie = c;
                done();
            });
        });

        it('should return an array', function(done) {

            api.delete(endpoint + '/' + '56a07caf-b166-4ff9-8b09-4ccb711f6e66')
                .set('Cookie', cookie)
                .expect('Content-Type', 'application/json; charset=utf-8')
                .end(function(err, res) {
                    expect(res.statusCode).to.be.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.not.have.property('err');
                    done();
                });
        });
    });

});
