var express = require('express');
var router = express.Router();
var Users = require('../API/users');
var request = require('request');
var session = require('express-session');
var redisStore = require('connect-redis')(session);
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
//var redis = require('redis'),
//	client = redis.createClient();

//client.on('ready',function(err){
//	console.log('ready');
//})
/* GET users listing. */
router.use(session({
	store:new redisStore(),
	secret:'superduper',
}));

router.get('/', function(req, res, next) {
   	console.log(req.session)
	if(req.session.isVisit){
		req.session.isVisit++;
		res.send('<p>'+req.session.isVisit+'th to this page</p>');
	}else{
		req.session.isVisit = 1;
		res.send('Welcome,new customer');
	}
});

router.all('/login',function(req,res,next){
var code = req.body.code;
console.log(req.session);
//console.log(req.headers)
request.get({
	uri:targetUrl = 'https://api.weixin.qq.com/sns/jscode2session',
	json:true,
	qs:{
		grant_type:'authorization_code',
		appid:'wxdc58986362520d3e',
		secret:'6b29735ab3efac6e9a70cc3d5880e4ce',
		js_code:code
	}
},(err,response,data) => {
	if(response.statusCode===200) {
	console.log("[open_id]",data.openid)
	console.log("[session]",data.session_key)
	req.session.openId = data.openid;
	res.send({"as":"as"});
	}	
})
})

router.all('/test', function(req, res, next) {
	console.log(req.session.openId)
	res.send("test result")
})

router.all('/newSite',multipartMiddleware, function(req, res, next) {
	console.log(req.session.openId)
	console.log(req.files.file.path)
	console.log(req.body)
	res.send("test result")
})
module.exports = router;
