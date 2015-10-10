/*jshint mocha:true, node:true */

var chai = require('chai'),
    expect = chai.expect,
    spotify = require('../../../app/models/spotify');

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

  describe("#setClientId() ", function () {

    it("should be able to set private property CLIENT_ID", function () {
      spotify.setClientId('Some Client Id');
      expect(spotify.hasClientId()).to.equal(true);
    });

  });

  describe("#setClientSecret() ", function () {

    it("should be able to set private property CLIENT_SECRET", function () {
      spotify.setClientSecret('Some Secret');
      expect(spotify.hasClientSecret()).to.equal(true);
    });

  });

});
