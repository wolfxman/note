var express = require('express');
var moment = require('moment');
var router = express.Router();

var Note = require('../models/note');//导入模型数据模块
var User = require('../schemas/user');
var resp = require('../user_modules/response');//公共返回对象

router.get('/add', function(req, res, next) {
	res.render('admin', {
		title: '录入页',
		note: {
			title: '',
			content: ''
		}
	})
});
router.post('/save', function(req, res, next) {
	var queryObj = req.body;
	var userId = ''
	var userName = req.session.user;
	User.findByName(userName, function(err, results) {
		if(err)
			console.log(err);
		if(results[0].name == userName){
			userId = results[0]._id;
			var note = new Note(queryObj);
			note.save(function(err, results) {
				if(err)
					console.log(err);
				resp.meta.code = 'success';
				resp.meta.msg = 'success';
				resp.result.push(results);
				res.send(resp);
			});
		}
	})
});
module.exports = router;
