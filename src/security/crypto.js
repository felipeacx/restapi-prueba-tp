const { Secret } = require("../config");
var crypto = require('crypto');


const encryptString = (string) => {
  var mykey = crypto.createCipher('aes-128-cbc', Secret);
  var mystr = mykey.update(string, 'utf8', 'hex')
  mystr += mykey.final('hex');
  return mystr
}

const decryptString = (string) => {
  var mykey = crypto.createDecipher('aes-128-cbc', Secret);
  var mystr = mykey.update(string, 'hex', 'utf8')
  mystr += mykey.final('utf8');
  return mystr
}

module.exports = {
  encryptString,
  decryptString
}