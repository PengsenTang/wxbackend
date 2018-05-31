var express = require('express');
var router = express.Router();
var Users = require('../API/users');
var request = require('request');
var session = require('wafer-node-session');
var RedisStore = require('connect-redis')(session);

var options = {
	"host":"127.0.0.1",
	"port":"6379",
	"ttl":60,
};


router.use(session({
	appId: 'wxdc58986362520d3e',
	appSecret: '6b29735ab3efac6e9a70cc3d5880e4ce',
	loginPath:'/login',
	store: new RedisStore(options)
}));


router.use('/me',function(request,response,next){
	if(request.session){
	console.log(request.session);	
	response.json(request.session.userInfo);
	} else {
		response.json({nobody:true});
}
})

router.use('/newSite',function(request,response,next){
	
	console.log(request.cookies);	
	if(request.session){
	response.json(request.session.userInfo);
	} else {
		response.json({nobody:true});
}
})
module.exports = router;
