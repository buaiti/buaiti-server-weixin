var http = require('http');
var punycode = require('punycode');

var body = JSON.stringify({tuwenlist:[{title:punycode.encode("中文编码"),description:punycode.encode("中文编码1"),
picUrl : "http://weizhifeng.net/images/tech/composer.png",
    url : "http://tv.sohu.com"},{title:punycode.encode("中文编码"),description:punycode.encode("中文编码1"),
picUrl : "http://weizhifeng.net/images/tech/composer.png",
    url : "http://tv.sohu.com"},{title:punycode.encode("中文编码"),description:punycode.encode("中文编码1"),
picUrl : "http://weizhifeng.net/images/tech/composer.png",
    url : "http://tv.sohu.com"},{title:punycode.encode("中文编码"),description:punycode.encode("中文编码1"),
picUrl : "http://weizhifeng.net/images/tech/composer.png",
    url : "http://tv.sohu.com"}]});
console.log(body);
var options = {
  hostname: 'ponyccemma.duapp.com',
  port: 80,
  path: '/puttuwen',
  method: 'POST',
  headers: {
      'Content-Type': 'text/plain',
      'Content-Length': body.length
  }
};

var req = http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

// write data to request body
req.write(body);
req.end();
