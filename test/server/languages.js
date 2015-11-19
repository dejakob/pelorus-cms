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
    endpoint = config.api.prefix + config.api.version + 'language';

describe('Languages', function() {

    function getCookie(callback) {

        api.get('/api/1.0.0/user/dummy')
            .end(function(err, res) {
                var cookie = res.headers['set-cookie'];
                callback(cookie);
            });
    }

    function getLanguage(callback) {

        getCookie(function(cookie) {
            var url = endpoint;
            api.get(url)
                .set('Cookie', cookie)
                .end(function(err, res) {
                    callback(res.body[0]);
                });
        });
    }

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
                    expect(res.body).to.not.have.property('err');
                    done();
                });
        });
    });

    describe('GET ' + endpoint + '/active', function() {

        var cookie;

        before(function(done) {
            getCookie(function(c) {
                cookie = c;
                done();
            });
        });

        it('should return an array', function(done) {
            api.get(endpoint + '/active')
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

    describe('GET ' + endpoint + '/:uuid', function() {

        var cookie;
        var language;

        before(function(done) {
            getCookie(function(c) {
                cookie = c;
                getLanguage(function(e) {
                    language = e;
                    done();
                });
            });
        });

        it('should return an object', function(done) {
            var url = endpoint + '/' + language.uuid;
            api.get(url)
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

    describe('PUT ' + endpoint + '/:uuid', function() {

        var cookie;
        var language;

        before(function(done) {
            getCookie(function(c) {
                cookie = c;
                getLanguage(function(e) {
                    language = e;
                    done();
                });
            });
        });

        it('should return an object', function(done) {
            language.active = true;
            var url = endpoint + '/' + language.uuid;
            api.put(url)
                .set('Cookie', cookie)
                .send(language)
                .expect(200)
                .end(function(err, res) {
                    expect(res.body).to.be.an('object');
                    expect(res.body.active).to.be.equal(true);
                    expect(res.body).to.not.have.property('err');
                    done();
                });
        });
    });


});
