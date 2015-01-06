var testCache = require('../lib/cache');
var testMongo = require('../lib/mongo');
var testRedis = require('../lib/redis');
var testSql = require('../lib/sql');
var testImage = require('../lib/image');
var weixin = require('../lib/weixin');
var util = require('util');
var punycode = require('punycode');

//config
weixin.token = 'youtoken';

var articles = [];
articles[0] = {
    title : "",
    description : "电视剧",
    picUrl : "http://weizhifeng.net/images/tech/composer.png",
    url : "http://tv.sohu.com"
};

articles[1] = {
    title : "古剑奇谭",
    description : "古剑奇谭",
    picUrl : "http://weizhifeng.net/images/poem/bayuexihu.jpg",
    url : "http://tv.sohu.com/20140704/n401747926.shtml"
};


module.exports = function(app){
	// 监听文本消息
	weixin.textMsg(function(msg) {
	    console.log("textMsg received");
	    console.log(JSON.stringify(msg));

	    var resMsg = {};

	    switch (msg.content) {
	    case "ip":
	    	var ip_url = [];
	    	ip_url[0] = {
	    	    title : "show ip",
	    	    description : "show ip",
	    	    picUrl : "",
	    	    url : "http://ponyccemma.duapp.com/getip"
	    	};
	    	resMsg = {
                fromUserName : msg.toUserName,
                toUserName : msg.fromUserName,
                msgType : "news",
                articles : ip_url,
                funcFlag : 0
            };
            break;
            
      case "local":
	    	var ip_url = [];
	    	ip_url[0] = {
	    	    title : "local",
	    	    description : "192.168.10.250:8080",
	    	    picUrl : "",
	    	    url : "http://192.168.10.250:8080"
	    	};
	    	resMsg = {
                fromUserName : msg.toUserName,
                toUserName : msg.fromUserName,
                msgType : "news",
                articles : ip_url,
                funcFlag : 0
            };
            break;
case "ip1":
	    	var ip_url = [];
	    	ip_url[0] = {
	    	    title : "show ip",
	    	    description : "show ip",
	    	    picUrl : "",
	    	    url : "http://219.232.119.252:3000"
	    	};
	    	resMsg = {
                fromUserName : msg.toUserName,
                toUserName : msg.fromUserName,
                msgType : "news",
                articles : ip_url,
                funcFlag : 0
            };
            break;
	        case "文本" :
	            // 返回文本消息
	            resMsg = {
	                fromUserName : msg.toUserName,
	                toUserName : msg.fromUserName,
	                msgType : "text",
	                content : "这是文本回复",
	                funcFlag : 0
	            };
	            break;

	        case "音乐" :
	            // 返回音乐消息
	            resMsg = {
	                fromUserName : msg.toUserName,
	                toUserName : msg.fromUserName,
	                msgType : "music",
	                title : "音乐标题",
	                description : "音乐描述",
	                musicUrl : "音乐url",
	                HQMusicUrl : "高质量音乐url",
	                funcFlag : 0
	            };
	            break;

	        case "图文" :

	        	var cur_articles = [];
	        	for(var i=0,z=0;i<10;i++,z++) {
    				cur_articles[z] = articles[i];
    			}
	            // 返回图文消息
	            resMsg = {
	                fromUserName : msg.toUserName,
	                toUserName : msg.fromUserName,
	                msgType : "news",
	                articles : cur_articles,
	                funcFlag : 0
	            };
	            break;
	        default:
	        	var cur_page = parseInt(msg.content);
	        	if(!isNaN(cur_page)) {
	        		var total_page = articles.length/10;
	        		if(cur_page>=total_page || cur_page<0)
	        			cur_page = 0;	        		
	        		
	        		var cur_articles = [];
	        		var art_max = cur_page*10+10;
	        		if(cur_page*10+10 > articles.length)
	        			art_max = articles.length;
        			for(var i=cur_page*10,z=0;i<art_max;i++,z++) {
        				cur_articles[z] = articles[i];
        			}
        			
        			resMsg = {
        	                fromUserName : msg.toUserName,
        	                toUserName : msg.fromUserName,
        	                msgType : "news",
        	                articles : cur_articles,
        	                funcFlag : 0
        	            };
	        		
	        	} else {
		        	resMsg = {
		                fromUserName : msg.toUserName,
		                toUserName : msg.fromUserName,
		                msgType : "text",
		                content : "请输入以下几种字：文本 | 音乐 | 图文 | 数字",
		                funcFlag : 0
		            };
	        	}
	    }

	    weixin.sendMsg(resMsg);
	});

	// 监听图片消息
	weixin.imageMsg(function(msg) {
	    console.log("imageMsg received");
	    console.log(JSON.stringify(msg));
	});

	// 监听位置消息
	weixin.locationMsg(function(msg) {
	    console.log("locationMsg received");
	    console.log(JSON.stringify(msg));
	});

	// 监听链接消息
	weixin.urlMsg(function(msg) {
	    console.log("urlMsg received");
	    console.log(JSON.stringify(msg));
	});

	// 监听事件消息
	weixin.eventMsg(function(msg) {
	    console.log("eventMsg received");
	    console.log(JSON.stringify(msg));
	    
	    var resMsg = {};

	    switch (msg.event) {
	        case "subscribe" :
	            // 返回文本消息
	            resMsg = {
	                fromUserName : msg.toUserName,
	                toUserName : msg.fromUserName,
	                msgType : "text",
	                content : "欢迎来到老马识途,请输入以下：文本或数字",
	                funcFlag : 0
	            };
	            break;
	        default:
	        	resMsg = {
	                fromUserName : msg.toUserName,
	                toUserName : msg.fromUserName,
	                msgType : "text",
	                content : msg.event,
	                funcFlag : 0
	            };
	    }
	    
	    weixin.sendMsg(resMsg);
	});

	// Start
	app.post('/', function(req, res) {

	    // loop
	    weixin.loop(req, res);

	});
	
	app.post('/puttuwen', function(req, res) {
	    // 获取XML内容
	    var buf = '';
	    req.setEncoding('utf8');
		//req.setEncoding('binary');
	    req.on('data', function(chunk) { 
			buf += chunk;
			//console.log(chunk);
		});
		
		// 内容接收完毕
	    req.on('end', function() {
	    	//buf = buf.toString();
			console.log(buf);
			var tuwen = JSON.parse(buf);
			
			if(tuwen.tuwenlist.length>0) {				
				articles = tuwen.tuwenlist.concat(articles);
			}
			
			if(articles.length>10000) {
				for(var i=0;i<articles.length-10000;i++) {
					articles.pop();
				}
			}

			res.end("{ok:1}");
	    });

	});
	
	// test weixin
	app.get('/', function(req, res) {
	
	    // 签名成功
	    if (weixin.checkSignature(req)) {
	        res.send(200, req.query.echostr);
	    } else {	    	
	        res.send(200, 'fail');
	    }
	});
	
  // 获取环境变量
  app.get('/env', function(req, res) {
    res.end(util.inspect(process.env));
  });

 // memcache测试
  app.get('/cache', function(req, res){
    testCache(req, res);
  });

  // mongo数据库测试
  app.get('/mongo', function(req, res) {
    testMongo(req, res);
  });

  // redis数据库测试
  app.get('/redis', function(req, res) {
    testRedis(req, res);
  });

  // sql数据库测试
  app.get('/sql', function(req, res) {
    testSql(req, res);
  });
  
  // image服务：图像变换
  app.get('/image/transform', function(req, res) {
    testImage.transform(req, res);
  });
  
  // image服务：二维码生成
  app.get('/image/qrcode', function(req, res) {
    testImage.qrcode(req, res);
  });

  // image服务: 文字水印
  app.get('/image/annotate', function(req, res) {
    testImage.annotate(req, res);
  });

  // image服务: 验证码生成
  app.get('/image/vcode', function(req, res) {
    testImage.vcode(req, res);
  });

  // image服务: 图像合成
  app.get('/image/composite', function(req, res) {
    testImage.composite(req, res);
  });
  
  function getClientIp(req) {
      return req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;
  };  
  
  //get ip
  app.get('/getip', function(req, res) {
	  res.writeHead(200, {'Content-Type': 'text/plain'});
	  res.end(getClientIp(req));	  
  });
};

