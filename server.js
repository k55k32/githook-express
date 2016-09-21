var express = require('express')
var qs = require('querystring')
var http = require('http')
var url = require('url')
var bodyParser = require('./lib/body-parser')  //
var utils = require('./lib/utils.js')



function vaildHMAC (key, body, sign) {
  var shaStr = 'sha1=' + utils.HMacSha1(key, body)
  return shaStr === sign
}

module.exports = (port, config) => {
  var app = express()
  app.use(bodyParser.json())
  app.all('*', (request, response, next) => {
    console.log('requestpath:', request.path)
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
    var repositoryUrl = req.body.url
    var executer = config[repositoryUrl]
    if (executer) {
      var secret = executer.secret
      var shell = executer.events[eventName]
      if (shell && vaildHMAC(secret, req._body, sign)) { // 如果有该事件的shell，则继续执行并且签名通过
        console.log(shell)
      } else {
        console.log('not event target: ', eventName)
      }
    }
    res.end()
  })
  var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('app listening at http://%s:%s', host, port);
  });
  return server
}
