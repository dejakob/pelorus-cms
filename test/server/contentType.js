'use strict';

require('rootpath')();
var should = require('chai').should();
var expect = require('chai').expect;
var supertest = require('supertest');
var request = require('request');
var nock = require('nock');
var path = require('path');
var glob = require('glob');
var _ = require('lodash');
var models = glob('app/models/*.js', {
    sync: true
});
var routes = glob('app/routes/**/*.js', {
    sync: true
});

// Environment
process.env.NODE_ENV = 'test';

// Start the application
var app = require('../../app.js');

// Require config after setting environment
var config = require('config/config');

// API setup
var api = supertest('http://localhost:' + config.port),
    endpoint = config.api.prefix + config.api.version + 'type';

// Database
var mongoose = require('mongoose');

before(function(done) {
    // Load models
    _.forEach(models, function(model) {
        require(path.resolve(model));
    });
    done();

    // Load fixtures
    /*    fixtures.load(path.join(__dirname, '../../app/fixtures'), function() {
            done();
        });*/
});

describe('Content Type', function() {

    function getCookie(callback) {

        api.get('/api/1.0.0/user/dummy')
            .end(function(err, res) {
                var cookie = res.headers['set-cookie'];
                callback(cookie);
            });
    }

    function getType(uuid, callback) {

        getCookie(function(cookie) {
            var url = '/api/type/' + uuid;
            api.get(url)
                .set('Cookie', cookie)
                .end(function(err, res) {
                    callback(res.body);
                });
        });
    }

    describe('GET /api/1.0.0/type', function() {

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
                    expect(res.body).to.not.have.property('err');
                    done();
                });
        });
    });

    describe('GET /api/1.0.0/type/all', function() {

        var cookie;

        before(function(done) {
            getCookie(function(c) {
                cookie = c;
                done();
            });
        });

        it('should return an array', function(done) {
            api.get(endpoint + '/all')
                .set('Cookie', cookie)
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(200)
                .end(function(err, res) {
                    expect(res.body).to.be.an('array');
                    expect(res.body).to.not.have.property('err');
                    done();
                });
        });
    });

    describe('GET /api/1.0.0/type/:uuid', function() {

        var cookie;

        before(function(done) {
            getCookie(function(c) {
                cookie = c;
                done();
            });
        });

        it('should return an object', function(done) {
            api.get(endpoint + '/ad03c1eb-13d2-4321-9ddb-8fab25f494b2')
                .set('Cookie', cookie)
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(200)
                .end(function(err, res) {
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.not.have.property('err');
                    expect(res.body).to.have.property('meta');
                    expect(res.body.meta).to.have.property('safeLabel');
                    expect(res.body.meta).to.have.property('label');
                    expect(res.body).to.have.property('fields');
                    expect(res.body.fields).to.be.an('array');
                    done();
                });
        });
    });

    describe('GET /api/1.0.0/type/:safeLabel', function() {

        var cookie;

        before(function(done) {
            getCookie(function(c) {
                cookie = c;
                done();
            });
        });

        it('should return an object', function(done) {
            api.get(endpoint + '/news')
                .set('Cookie', cookie)
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(200)
                .end(function(err, res) {
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.not.have.property('err');
                    done();
                });
        });
    });

    describe('POST /api/1.0.0/type', function() {

        var cookie;
        var type;

        before(function(done) {
            getCookie(function(c) {
                cookie = c;
                getType("ad03c1eb-13d2-4321-9ddb-8fab25f494b2", function(t) {
                    type = t;
                    done();
                });
            });
        });

        it('should return an object', function(done) {
            delete type._id;
            type.uuid = "ad03c1eb-13d2-4321-9ddb-8fab25f495b1";
            api.post(endpoint)
                .set('Cookie', cookie)
                .send(type)
                .expect(200)
                .end(function(err, res) {
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.not.have.property('err');
                    expect(res.body).to.have.property('meta');
                    expect(res.body.meta).to.have.property('safeLabel');
                    expect(res.body.meta).to.have.property('label');
                    expect(res.body).to.have.property('fields');
                    done();
                });
        });
    });

    describe('PUT /api/1.0.0/type/:id', function() {

        var cookie;
        var type;

        before(function(done) {
            getCookie(function(c) {
                cookie = c;
                getType("ad03c1eb-13d2-4321-9ddb-8fab25f495b1", function(t) {
                    type = t;
                    done();
                });
            });
        });

        it('should return an object', function(done) {
            type.meta.label = "newnews";
            api.put(endpoint + '/ad03c1eb-13d2-4321-9ddb-8fab25f495b1')
                .set('Cookie', cookie)
                .send(type)
                .expect(200)
                .end(function(err, res) {
                    expect(res.body).to.be.an('object');
                    expect(res.body.meta.label).to.be.equal('newnews');
                    expect(res.body).to.not.have.property('err');
                    done();
                });
        });
    });

    describe('DELETE /api/type', function() {

        var cookie;
        var type;

        before(function(done) {
            getCookie(function(c) {
                cookie = c;
                getType("ad03c1eb-13d2-4321-9ddb-8fab25f495b1", function(t) {
                    type = t;
                    done();
                });
            });
        });

        it('should return an object', function(done) {
            api.delete(endpoint + '/ad03c1eb-13d2-4321-9ddb-8fab25f495b1')
                .set('Cookie', cookie)
                .send(type)
                .expect(200)
                .end(function(err, res) {
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.not.have.property('err');
                    done();
                });
        });
    });

});
