var db = require('../DAO/Connection');
var sqlCommands = require('../DAO/commonSQL');
var session = require('express-session');
var redisStore = require('connect-redis')(session);
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

//

function parseNewHighlight(req){
	var param = []
	param.push(0)
	param.push(req.body.latitude)
	param.push(req.body.longtitude)
	param.push(req.body.description)
	param.push(req.session.openId)
	param.push(req.body.msg)
	param.push(req.files.file.path)
	return param
}


function newHighlight(req, res, next){
    if(!req.files.file || !req.session.openId){
        res.json({
            'code':'201',
            'msg': 'parameter error'
        });
    }
    else{ 		    
	    var param = parseNewHighlight(req)
	    console.log(param)
	    db.queryArgs(sqlCommands.highlight.new_highlight,param,
		function(err,result){
		    if(result){
			res.json({
				"code":"200",
				"msg":"new highlight established"
			})
		    }
		    else{
			res.json({
				"code":"201",
				"msg":"fail to new site"
			})
		    }
		})
	} 	
    }
//else{
      //  db.queryArgs(sqlCommands.highlight.newHighlight, req.body.id, function(err, result) {
        //        db.doReturn(res, 200, 'success', result);
          //  }
        //);
    //}






module.exports = {
	newHighlight:newHighlight
};
