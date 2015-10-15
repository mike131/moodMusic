/*jshint mocha:true, node:true */

var chai      = require('chai'),
    expect    = chai.expect,
    request   = require('request'),
    sinon     = require('sinon'),
    spotify   = require('./../../../../server/models/spotify');

describe("Spotify Model", function () {

  // Do we need any before or beforeEach ?

  describe("Instance", function () {

    it("should have an auth property", function () {
      expect(spotify).to.have.any.keys('auth');
    });

    it("should have undefined value for auth property", function () {
      expect(spotify.auth).to.equal(undefined);
    });

    it("should not expose CLIENT_ID", function () {
      expect(spotify).to.not.have.any.keys('CLIENT_ID');
    });

    it("should not expose CLIENT_SECRET", function () {
      expect(spotify).to.not.have.any.keys('CLIENT_SECRET');
    });

  });

  describe("Method: setClientId() ", function () {

    it("should be able to set private property CLIENT_ID", function () {
      spotify.setClientId('Some Client Id');
      expect(spotify.hasClientId()).to.equal(true);
    });

  });

  describe("Method: setClientSecret() ", function () {

    it("should be able to set private property CLIENT_SECRET", function () {
      spotify.setClientSecret('Some Secret');
      expect(spotify.hasClientSecret()).to.equal(true);
    });

  });

  describe("Method: isAuthorized() ", function () {

    it("should not be authorized on instance", function () {
      expect(spotify.isAuthorized()).to.equal(false);
    });

  });

  describe("Method: clientAuth() ", function () {

    it("should not be authorized ", function () {
      expect(spotify.isAuthorized()).to.equal(false);
    });

    describe("successful auth call ", function () {

      before(function (done) {
        sinon
          .stub(request, 'post')
          .yields(null, {statusCode: 200}, JSON.stringify(
          {
            "access_token":"wefwefwefwefwef",
            "token_type":"Bearer",
            "expires_in":3600
          }));
        done();
      });

      after(function (done) {
        request.post.restore();
        done();
      });

      it("should set auth object on successful response", function () {
        spotify.setClientId('Some Id');
        spotify.setClientSecret('Some secret');
        spotify.clientAuth();
        expect(spotify.isAuthorized()).to.equal(true);
      });

    });

    describe("error on auth call", function () {

      before(function (done) {
        sinon
          .stub(request, 'post')
          .yields(true, {statusCode: 401}, JSON.stringify(
          {
            "error":"invalid_client",
            "error_description":"Invalid client secret"
        }));
        done();
      });

      after(function (done) {
        request.post.restore();
        done();
      });

      it("should throw an error", function () {
        spotify.setClientId('Some Id');
        spotify.setClientSecret('Some secret');
        expect(spotify.clientAuth.bind(spotify, true)).to.throw("Invalid client secret");
      });

    });

  }); // Client Auth()

});
