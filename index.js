var program = require('commander')
var Server = require('./server.js')
program
  .version('0.0.1')
  .option('-s, --start <port> <secret>', 'start server and set the port,secret', start)
  .option('-p, --stop', 'stop server', 'marble', stop)
  .parse(process.argv)


var startServer = null
function start (val) {
  var port = parseInt(val[0])
  var secret = val[1]
  if (!port || !secret ) {
    console.error('ERROR: require port and secret')
  } else {
    startServer = Server(port, secret)
    console.log('start server port:%s secret:%s', port, secret)
  }
}
