var db = require('../DAO/Connection');
var sqlCommands = require('../DAO/commonSQL');
var request = require('request');

function login(req, res, next){
    var code = req.body.code;
    console.log(req.session);
    request.get({
        uri:targetUrl = 'https://api.weixin.qq.com/sns/jscode2session',
        json:true,
        qs:{
            grant_type:'authorization_code',
            appid:'wxdc58986362520d3e',
            secret:'6b29735ab3efac6e9a70cc3d5880e4ce',
            js_code:code
        }
    },(err,response,data) => {
        if(response.statusCode===200) {
            console.log("[open_id]",data.openid)
            console.log("[session]",data.session_key)
            req.session.openId = data.openid;
            res.send({"as":"as"});
        }   
    })
}



module.exports = {
    login:login
};
