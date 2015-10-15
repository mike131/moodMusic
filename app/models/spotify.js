/*jshint node:true*/

"use strict";

var request = require('request');

// Private variables
var CLIENT_ID;
var CLIENT_SECRET;
var SPOTIFY_ENDPOINTS = {
  "auth": {
    'url': "https://accounts.spotify.com/api/token",
    'method': 'POST'
  }
};

function Spotify () {
  this.auth = undefined;
}

Spotify.prototype.setClientId = function (clientId) {
  CLIENT_ID = clientId;
};

Spotify.prototype.setClientSecret = function (clientSecret) {
  CLIENT_SECRET = clientSecret;
};

Spotify.prototype.clientAuth = function (force) {
  if (!this.isAuthorized() || force === true && this.hasClientId() && this.hasClientSecret()) {
    var that = this;
    request.post({
      method: SPOTIFY_ENDPOINTS.auth.method,
      url: SPOTIFY_ENDPOINTS.auth.url,
      headers: {
        'Authorization': 'Basic ' + new Buffer(CLIENT_ID + ":" + CLIENT_SECRET).toString('base64')
      },
      form: {
        grant_type: 'client_credentials'
      }
    }, function (err, res, body) {
      if (err) {
        var returnBody = JSON.parse(body);
        throw new Error(returnBody.error_description);
      }

      // No error
      if (res.statusCode === 200) {
        that.auth = JSON.parse(body);
      }
    });
  }
};

// Checkers
Spotify.prototype.hasClientId = function () {
  return (typeof CLIENT_ID === 'undefined') ? false : true;
};

Spotify.prototype.hasClientSecret = function () {
  return (typeof CLIENT_SECRET === 'undefined') ? false : true;
};

Spotify.prototype.isAuthorized = function () {
  return (typeof this.auth === 'undefined') ? false : true;
};

module.exports = new Spotify();
