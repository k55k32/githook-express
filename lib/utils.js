exports = module.exports

exports.HMacSha1 = (secret, body) => {
  var sign = crypto.createHmac('sha1', secret).update(body).digest().toString('hex')
  return sign
}
