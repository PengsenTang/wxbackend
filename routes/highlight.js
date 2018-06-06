var express = require('express');
var router = express.Router();
var Highlight = require('../API/Highlight');
var session = require('express-session');
var redisStore = require('connect-redis')(session);
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var bodyParser = require('body-parser');
var fs = require('fs');
var os = require('os');
/* GET home page. */
router.use(bodyParser.json({limit: '1mb'}))
router.use(bodyParser.urlencoded({extended: true }))
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

router.all('/query', function(req, res, next) {
    var data = req.query
    var longitude = parseFloat(data.longitude)
    var latitude = parseFloat(data.latitude)
    var scale = parseInt(data.scale)
    Highlight.queryHighlight(longitude, latitude, scale,function(result){
	res.json(result)
	})
});






module.exports = router;
