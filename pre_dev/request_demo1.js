var request = require('request');

request('http://cnodejs.org/', function (err, res, body) {
  if(!err && res.statusCode == 200) {
    console.log(body);
  }
})
