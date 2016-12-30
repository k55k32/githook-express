var crypto = require('crypto')
var fs = require('fs')

exports = module.exports

exports.HMacSha1 = (secret, body) => {
  var sign = crypto.createHmac('sha1', secret).update(body).digest().toString('hex')
  return sign
}

exports.getConfig = (configPath) => {
  var configString = fs.readFileSync(configPath, "utf-8")
  var config = JSON.parse(configString)
  return config
}
