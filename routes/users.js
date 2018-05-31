var express = require('express');
var router = express.Router();
var Users = require('../API/Users');
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



router.all('/login',function(req,res,next){
	Users.login(req,res,next)
})


router.all('/newSite',multipartMiddleware, function(req, res, next) {
	console.log(req.session.openId)
	console.log(req.files.file.path)
	console.log(req.body)
	res.send("test result")
})
module.exports = router;
