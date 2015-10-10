/*jshint node:true*/
"use strict";

// Private variables
var CLIENT_ID;
var CLIENT_SECRET;

function Spotify () {
  this.auth = undefined;
}

Spotify.prototype.setClientId = function (clientId) {
  CLIENT_ID = clientId;
};

Spotify.prototype.setClientSecret = function (clientSecret) {
  CLIENT_SECRET = clientSecret;
};

Spotify.prototype.hasClientId = function () {
  return (typeof CLIENT_ID === 'undefined') ? false : true;
};

Spotify.prototype.hasClientSecret = function () {
  return (typeof CLIENT_SECRET === 'undefined') ? false : true;
};

module.exports = new Spotify();
