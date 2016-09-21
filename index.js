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
    var configString = fs.readFileSync(configPath, "utf-8")
    if (configString) {
      var config = JSON.parse(configString)
      startServer = Server(port, config)
      console.log('start config')
      console.log(configString)
      console.log('start server port:%s', port)
    } else {
      console.error(configPath , ' read file faild~')
    }
  }
}
