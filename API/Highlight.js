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

var scaleToLongitude = new Array()
scaleToLongitude[16] = 0.032
scaleToLongitude[17] = 0.016
scaleToLongitude[18] = 0.008
scaleToLongitude[19] = 0.004
scaleToLongitude[20] = 0.002


function queryPointsWithScale(longitude, latitude, scale, uid, callback){
    var longitudeLowerLimit = (longitude - scaleToLongitude[scale]).toString()
    var longitudeUpperLimit = (longitude + scaleToLongitude[scale]).toString()
    var latitudeLowerLimit = (latitude - scaleToLongitude[scale]).toString()
    var latitudeUpperLimit = (latitude + scaleToLongitude[scale]).toString()
    var longitudeCondition = ' longitude between ' + longitudeLowerLimit + ' and ' + longitudeUpperLimit
    var latitudeCondition = ' latitude between ' + latitudeLowerLimit + ' and ' + latitudeUpperLimit
    var sql = 'select * from locationview where ' + longitudeCondition + ' and ' + latitudeCondition + ';'
    var param = []
    param.push(latitude)
    param.push(longitude)
    param.push(scale)
    param.push(uid)
   // db.query(sql, function(error, rows){
     //   if (error) throw error
       // callback(rows)
    //})
    console.log(param)
    //sql = "call querywithuid(39.0839,117.1999,17,'002');"
    db.queryArgs('call querywithuid(?,?,?,?)',param,function(error,rows){
      //db.query(sql,function(error,rows){
	if(error) throw error
	callback(rows)
	})
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

function rateHighlight(req,res,next){
	if(!req.body.rate || !req.session.openId || !req.body.locationid){
		res.json({
			"code":"201",
			"msg":"parameter error"
		})
	}
	else{
        var param = [] 
	var updateParam = []
        param.push(req.body.locationid)
        param.push(req.session.openId)
	updateParam.push(req.body.rate)
	updateParam.push(req.body.locationid)
	updateParam.push(req.session.openId)
	var params = param
	params.push(req.body.rate)
        db.queryArgs(sqlCommands.highlight.whether_rate,param,
        	function(err,result){
                if(result[0]['amount'] == 0){
			console.log("0")
                	db.queryArgs(sqlCommands.highlight.new_rate,params,
				function(err,rusult){
					res.status(200).send('created')
				})
                }
		else if(result[0]['amount'] ==1){
			console.log("1")
			db.queryArgs(sqlCommands.highlight.update_rate,updateParam,function(err,result){
			res.status(200).send('modified')
			})
		}
                else {
                	res.json({
                		"code":"201",
                		"msg":"Something Wrong"
                	})
                }
        	})
	}
}






module.exports = {
	newHighlight:newHighlight,
	queryHighlight:queryPointsWithScale,
	rateHighlight:rateHighlight
};
