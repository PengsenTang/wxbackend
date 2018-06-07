//
var highlight = {
	new_highlight:'insert into location values(?,?,?,?,?,?,?)',
	whether_rate:'select count(*) as amount from comments where locationid = ? and open_id = ?',
	new_rate:'insert into comments values(?,?,?)',
	update_rate:'update comments set rate = ? where locationid = ? and open_id = ?'
}


//exports
module.exports = {
    highlight:highlight
};
