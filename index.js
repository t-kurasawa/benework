var cors = require('cors');
var dotenv = require('dotenv');
var express = require('express');
var path = require('path');

dotenv.config();

var app = express();
app.use(cors());
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/angular', express.static(path.join(__dirname, 'node_modules', 'angular')));
app.use('/angular-ui-router', express.static(path.join(__dirname, 'node_modules', 'angular-ui-router')));
app.use('/axios', express.static(path.join(__dirname, 'node_modules', 'axios')));
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules', 'bootstrap')));
app.use('/jquery', express.static(path.join(__dirname, 'node_modules', 'jquery')));
app.use('/vis',express.static(path.join(__dirname,'node_modules','vis')));
app.use('/firebase', express.static(path.join(__dirname, 'node_modules', 'firebase')));

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('app is running on port', port);
});
