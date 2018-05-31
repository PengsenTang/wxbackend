var express = require('express');
var router = express.Router();
var session = require('express-session')
var redisStore = require('connect-redis')(session)
/* GET home page. */

router.use(session({
	store:new redisStore(),
	secret:'supernice',
}));

router.get('/', function(req, res, next) {
  	console.log(req.session);
	if(req.session.isVisit){
		req.session.isVisit++;
		res.send(req.session.isVisit + "th here");
	} else {
		req.session.isVisit = 1;
		res.send('message success');
	}
});

router.get('/test', function(req, res, next) {
  	console.log(req.session);
	res.send('test response');
});
module.exports = router;
