var db = require('../DAO/Connection');
var sqlCommands = require('../DAO/commonSQL');
var myJson = require('./jsonParser');
var session = require('express-session');
var redisStore = require('connect-redis')(session);
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

//

function parseNewHighlight(req){
	var param = []
	param.push(req.body.latitude)
	return param
}


function newHighlight(req, res, next){
    console.log(req.session.openId)
    console.log(req.body.latitude)
    if(!req.files.file || !req.session.openId){
        res.json({
            'code':'201',
            'msg': 'parameter error'
        });
    }
    else{ 		    
	    var param = parseNewHighlight(req)
	    console.log(param)
	    res.json({"answer":"answer"})   	
    }
//else{
      //  db.queryArgs(sqlCommands.highlight.newHighlight, req.body.id, function(err, result) {
        //        db.doReturn(res, 200, 'success', result);
          //  }
        //);
    //}
}





module.exports = {
	newHighlight:newHighlight
};
