// import
let express = require('express')
let mysqlClient = require('./wxSQL.js')
let bodyParser = require('body-parser')


// init
let app = express()
app.use(bodyParser.json({limit: '1mb'}))
app.use(bodyParser.urlencoded({ extended: true }))

// static file directory
app.use(express.static('static'));


// router
app.get('/query', function(req, res){
    var data = req.query
    console.log(data)
    var longitude = parseFloat(data.longitude)
    var latitude = parseFloat(data.latitude)
    var scale = parseInt(data.scale)
    mysqlClient.queryPointsWithScale(longitude, latitude, scale, function(result){
        res.json(result)
    })
})

let server = app.listen(8080, function () {
    var post = server.address().port;

    console.log('Listening at http://localhost:%s', post)
})
