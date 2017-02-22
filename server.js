var express = require('express');
var path = require('path');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
  res.render('Hello World')
})

  var port = process.env.PORT || 8080;
  app.listen(port, function() {
    console.log("App now running on port", port);
  });
