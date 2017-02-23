var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
require('./models/History');
var routes = require('./routes/index');
var app = express();

var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/image-search';
mongoose.connect(url);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', routes);

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("App now running on port", port);
});

module.exports = app;