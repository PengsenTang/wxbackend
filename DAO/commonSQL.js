//
var highlight = {
	newHighlight:'insert into highlight(latitude,longtitude,description,contributor,msg,snapshot) values(?,?,?,?,?,?)',
	create_authentication:'insert into authentication values(?,?)',
}


//exports
module.exports = {
    highlight:highlight
};
