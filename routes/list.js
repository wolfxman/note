var express = require('express');
var router = express.Router();
var moment = require('moment');


router.get('/', function(req, res, next) {
	var noteStr = localStorage.getItem('note');
	var notes = noteStr.split(' ');
	var datas = [];
	for (var i = 0; i < notes.length; i++) {
		var note = notes[i].split(',');
		var obj = {};
		obj.title = note[0];
		obj.content = note[1];
		obj.createAt = note[2];
		datas.push(obj);
	}
	res.render('list', {
		title: '列表页',
		items: datas/*[{
			_id: 1,
			title: '第一次日记',
			createAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
			content: '啥也没记'
		}]*/
	})
});
module.exports = router;
