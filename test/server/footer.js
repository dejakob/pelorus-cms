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
    endpoint = config.api.prefix + config.api.version + 'footer';

describe('Footer', function() {

    function getCookie(callback) {

        api.get('/api/1.0.0/user/dummy')
            .end(function(err, res) {
                var cookie = res.headers['set-cookie'];
                callback(cookie);
            });
    }

    function getFooter(callback) {

        getCookie(function(cookie) {
            api.get(endpoint)
                .set('Cookie', cookie)
                .end(function(err, res) {
                    callback(res.body);
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

    describe('GET ' + endpoint + '/translated/:lang', function() {

        var cookie;

        before(function(done) {
            getCookie(function(c) {
                cookie = c;
                done();
            });
        });

        it('should return an object', function(done) {
            api.get(endpoint + '/translated/en')
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

    describe('PUT ' + endpoint, function() {

        var cookie;
        var footer;

        before(function(done) {
            getCookie(function(c) {
                cookie = c;
                getFooter(function(e) {
                    footer = e[0];
                    done();
                });
            });
        });

        it('should return an object', function(done) {
            footer.phone.en = "032211666";
            var url = endpoint + '/' + footer.uuid;
            api.put(url)
                .set('Cookie', cookie)
                .send(footer)
                .expect(200)
                .end(function(err, res) {
                    expect(res.body).to.be.an('object');
                    expect(res.body.phone.en).to.be.equal('032211666');
                    expect(res.body).to.not.have.property('err');
                    done();
                });
        });
    });

});
