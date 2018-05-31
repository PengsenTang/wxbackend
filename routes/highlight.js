var express = require('express');
var router = express.Router();
var Highlight = require('../API/Highlight');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('please use post request');
});


router.post('/newHighlight', function(req, res, next) {
	Highlight.newHighlight(req,res,next);
});






module.exports = router;
