var mysql = require('mysql')
var mysqlSetting = {
    host    : 'localhost',
    user    : 'root',
    password: 'password',
    database: 'wx'
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

    var connection = mysql.createConnection(mysqlSetting)
    connection.connect()
    connection.query(sql, function(error, rows){
        if (error) throw error
        callback(rows)
    })
    connection.end()
}

exports.queryPointsWithScale = queryPointsWithScale
