/*jshint node:true*/
var express = require('express'),
    config  = require('config'),
    app     = express();


// Set Port
app.set('PORT', (process.env.PORT || config.port));

// Server public routes
app.use(express.static('public'));

var server = app.listen(app.get('PORT'), function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('MoodMusic listening at http://%s:%s', host, port);
});
