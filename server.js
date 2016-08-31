var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');

app.use(express.static('app'));
app.use('/node_modules', express.static('node_modules'));
app.use('/dist', express.static('dist'));

var usersFilePath = path.join(__dirname, '/api/data.json');

app.get('/data', function (req, res) {
  var readable = fs.createReadStream(usersFilePath);
  readable.pipe(res);
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});