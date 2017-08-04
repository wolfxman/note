var express = require('express');
var LocalStorage = require('node-localstorage').LocalStorage;
var localStorage = new LocalStorage('./scratch');
var router = express.Router();

var Note = require('../models/note');//导入模型数据模块
var User = require('../models/user');
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
	var loginUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};
	if(!loginUser._id){
		resp.meta.code = 'error';
		resp.meta.msg = '请重新登录';
		res.send(resp);
	}
	User.findById(loginUser._id, function(err, results) {
		if(err)
			console.log(err);
		if(results.name !== undefined){
			userId = results._id;
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