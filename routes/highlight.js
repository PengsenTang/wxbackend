var express = require('express');
var router = express.Router();
var Highlight = require('../API/Highlight');
var session = require('express-session');
var redisStore = require('connect-redis')(session);
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

/* GET home page. */
router.use(session({
	store:new redisStore(),
	secret:'superduper',
}));

router.get('/', function(req, res, next) {
  res.send('please use post request');
});


router.all('/newHighlight', multipartMiddleware,function(req, res, next) {
	console.log(req.session);
	Highlight.newHighlight(req,res,next);
});






module.exports = router;
