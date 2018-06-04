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

function queryPointsWithScale(longitude, latitude, scale, callback){
    var longitudeLowerLimit = (longitude - scaleToLongitude[scale]).toString()
    var longitudeUpperLimit = (longitude + scaleToLongitude[scale]).toString()
    var latitudeLowerLimit = (latitude - scaleToLongitude[scale]).toString()
    var latitudeUpperLimit = (latitude + scaleToLongitude[scale]).toString()
    var longitudeCondition = ' longitude between ' + longitudeLowerLimit + ' and ' + longitudeUpperLimit
    var latitudeCondition = ' latitude between ' + latitudeLowerLimit + ' and ' + latitudeUpperLimit
    var sql = 'select * from locationview where' + longitudeCondition + 'and' + latitudeCondition

    db.query(sql, function(error, rows){
        if (error) throw error
        callback(rows)
    })
    connection.end()
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







module.exports = {
	newHighlight:newHighlight
};
