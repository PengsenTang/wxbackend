var db = require('../DAO/Connection');
var sqlCommands = require('../DAO/commonSQL');
var myJson = require('./jsonParser');


//
function newHighlight(req, res, next){
    console.log(req.session.openId)
    console.log(req.files.file.path)
    console.log(req.body)
    res.send("test result")
    if(!req.session.openId || !req.files.file){
        res.json({
            'code':'201',
            'msg': 'parameter error'
        });
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
