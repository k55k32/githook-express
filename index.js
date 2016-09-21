var express = require('express')
var qs = require('querystring')
var http = require('http')
var url = require('url')
var bodyParser = require('body-parser')

var app = express()

app.use(bodyParser.json())
app.all('*', (request, response, next) => {
  console.log('requestpath:', request.path)
  console.log('requestbody:', request.body)
  next()
})

app.post('/github/webhook', function (req, res) {
  var body = req.body
  console.log(body)
  res.end()
})

var server = app.listen(9000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('app listening at http://%s:%s', host, port);
});
