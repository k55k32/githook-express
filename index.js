var express = require('express')
var qs = require('querystring')
var http = require('http')
var url = require('url')
var bodyParser = require('./src/body-parser')
var crypto = require('crypto')

var app = express()

function HMacSha1 (secret, body) {
  var sign = crypto.createHmac('sha1', secret).update(body).digest().toString('hex')
  console.log('shastr:', sign)
  return sign
}

function vaildHMAC (key, body, sign) {
  var shaStr = HMacSha1(key, body)
  return shaStr === sign
}

app.use(bodyParser.json())
app.all('*', (request, response, next) => {
  console.log('requestpath:', request.path)
  console.log('requestbody:', request.body)
  next()
})

var hookSecret = 'testtest'
app.post('/github/webhook', function (req, res) {
  var eventName = req.get('X-GitHub-Event')
  var sign = req.get('X-Hub-Signature')
  var delivery = req.get('X-GitHub-Delivery')
  console.log('request head')
  console.log('request_body: ', req._body)
  console.log('event:', eventName)
  console.log('sign:', sign)
  console.log('delivery', delivery)
  if (vaildHMAC(hookSecret, req._body, sign)) {
    console.log('vaild - success')
  }
  res.end()
})



var server = app.listen(9000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('app listening at http://%s:%s', host, port);
});
