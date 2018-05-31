var express = require('express');
var router = express.Router();
var UserInfo = require('../API/Highlight');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('please use post request');
});


router.post('/get_userinfo_all', function(req, res, next) {
	UserInfo.get_userinfo_all(req, res, next);
});


router.post('/get_userinfo', function(req, res, next) {
	UserInfo.get_userinfo(req, res, next);
});



module.exports = router;
