var express = require('express')
var qs = require('querystring')
var http = require('http')
var url = require('url')
var bodyParser = require('./src/body-parser')  //
var crypto = require('crypto')


function HMacSha1 (secret, body) {
  var sign = crypto.createHmac('sha1', secret).update(body).digest().toString('hex')
  return sign
}

function vaildHMAC (key, body, sign) {
  var shaStr = 'sha1=' + HMacSha1(key, body)
  console.log('vaildShaStr: ', shaStr)
  return shaStr === sign
}

module.exports = (port, secret) => {
  var app = express()
  app.use(bodyParser.json())
  app.all('*', (request, response, next) => {
    console.log('requestpath:', request.path)
    console.log('requestbody:', request.body)
    next()
  })

  app.post('/github/webhook', function (req, res) {
    var eventName = req.get('X-GitHub-Event')
    var sign = req.get('X-Hub-Signature')
    var delivery = req.get('X-GitHub-Delivery')
    console.log('request head')
    console.log('event:', eventName)
    console.log('sign:', sign)
    console.log('delivery', delivery)
    if (vaildHMAC(secret, req._body, sign)) {
      console.log('vaild - success')
    }
    res.end()
  })
  var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('app listening at http://%s:%s', host, port);
    console.log('app secret is ', secret)
  });
  return server
}
