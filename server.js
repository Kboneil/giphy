var express =  require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var fav = require('./routes/fav');

app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/fav', fav);

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, './public/views/index.html'));
});

var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
  console.log('Listening on port ', server.address().port);
});
