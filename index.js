var program = require('commander')
var Server = require('./server.js')
var fs = require("fs")
program
  .version('0.0.1')
  .option('-s, --start <port> <config-path>', 'start server and set the port,secret', start)
  .parse(process.argv)


var startServer = null
function start (val) {
  var port = parseInt(val[0])
  var configPath = val[1]
  if (!port || !configPath ) {
    console.error('ERROR: require port and configPath')
  } else {
    startServer = Server(port, configPath)
    console.log('using config: ', configPath)
  }
}
