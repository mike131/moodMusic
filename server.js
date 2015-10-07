var express = require('express'),
    app = express();


// Set Port
app.set('PORT', (process.env.PORT || 5000));

var server = app.listen(app.get('PORT'), function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});