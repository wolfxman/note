var express = require('express');
var LocalStorage = require('node-localstorage').LocalStorage;
var localStorage = new LocalStorage('./scratch');
var _ = require('underscore');
var router = express.Router();

var Note = require('../models/note');//导入模型数据模块
var User = require('../models/user');
var resp = require('../user_modules/response');//公共返回对象

router.get('/add', function(req, res, next) {
	if(!req.session.user)
		res.redirect('/')
	res.render('admin', {
		title: '新增页',
		user: req.session.user,
		note: {
			title: '',
			content: ''
		}
	})
});
router.get('/add/:id', function(req, res, next) {
	if(!req.session.user)
		res.redirect('/')
	var id = req.params.id;
	var title = '编辑页';
	if(id){
		Note.findById(id, function(err, results) {
			if(err)
				console.log(err);
			res.render('admin', {
				title: title,
				note: results
			})
		});
	}
});
router.post('/save', function(req, res, next) {
	if(!req.session.user) {
		resp.meta.code = 'error';
		resp.meta.msg = '请重新登录';
		res.send(resp);
	}
	var queryObj = req.body;
	var note = new Note(queryObj);
	note.save(function(err, results) {
		if(err)
			console.log(err);
		resp.meta.code = 'success';
		resp.meta.msg = 'success';
		resp.result.push(results);
		res.send(resp);
	});
});
router.post('/update', function(req, res, next) {
	if(!req.session.user) {
		resp.meta.code = 'error';
		resp.meta.msg = '请重新登录';
		res.send(resp);
	}
	var queryObj = req.body;
	Note.findById(queryObj._id, function(err, results) {
		if (err){
			console.log(err);
			resp.meta.code = 'error';
			resp.meta.msg = err;
			res.send(resp);
		}else{
			var note = _.extend(results, queryObj);
			note.save(function(err, results) {
				if(err)
					console.log(err);
				resp.meta.code = 'success';
				resp.meta.msg = 'success';
				resp.result.push(results);
				res.send(resp);
			});
		}

	});	
});
router.post('/delOne', function(req, res, next) {
	if(!req.session.user) {
		resp.meta.code = 'error';
		resp.meta.msg = '请重新登录';
		res.send(resp);
	}
	var queryObj = req.body;
	Note.delOne(queryObj._id, function(err, results) {
		if(err)
			console.log(err);
		resp.meta.code = 'success';
		resp.meta.msg = 'success';
		resp.result.push(results);
		res.send(resp);
	});
});
module.exports = router;