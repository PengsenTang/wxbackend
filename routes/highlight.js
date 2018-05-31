var express = require('express');
var router = express.Router();
var Highlight = require('../API/Highlight');
var redisStore = require('connect-redis')(session);
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('please use post request');
});


router.post('/newHighlight', multipartMiddleware,function(req, res, next) {
	Highlight.newHighlight(req,res,next);
});






module.exports = router;
