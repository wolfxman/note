var express = require('express');
var mongoose = require('mongoose');//导入mongoose模块
var bcrypt = require('bcrypt');
var LocalStorage = require('node-localstorage').LocalStorage;
var localStorage = new LocalStorage('./scratch');

var router = express.Router();
var User = require('../models/user');//导入模型数据模块
var resp = require('../user_modules/response');//公共返回对象
/* GET user listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/user', function(req, res, next) {
	User.fetch(function(err, user) {
		if(err) {
			console.log(err);
		}
		res.render('user', {title: '用户列表', user: user});
	});
});

router.post('/signIn', function(req, res) {
	var queryObj = req.body;
	User.findByName(queryObj.name, function(err, results) {
		if(err)
			console.log(err);
		bcrypt.compare(queryObj.password, results._doc.password, function(err, isMatch) {
			if(err){
				console.log(err);
				resp.meta.code = 'error';
				resp.meta.msg = '用户名或密码不正确';
			}
			if(isMatch){
				req.session._id = results._doc._id;
				req.session.user = results._doc.name;
				resp.meta.code = 'success';
				resp.meta.msg = 'success';
			}
			res.send(resp);
		});
	});
});
router.get('/signUp', function(req, res, next) {
	res.render('signUp', {title: '注册', user: ''});
});
router.post('/signUp', function(req, res) {
	var queryObj = req.body;
	queryObj.name = queryObj.name.trim();
	User.findByName(queryObj.name, function(err, results) {
		if(err)
			console.log(err);
		if(!results){
			var user = new User(queryObj);
			user.save(function(err, results) {
				if(err){
					console.log(err);
					resp.meta.code = 'error';
					resp.meta.msg = '插入数据库时发生错误，请重新注册';
				}
				req.session._id = results._doc._id;
				req.session.user = results._doc.name;
				resp.meta.code = 'success';
				resp.meta.msg = 'success';
				res.send(resp);
			});
		}else if(results._doc.name == queryObj.name){
			resp.meta.code = 'error';
			resp.meta.msg = '用户名已被使用';
			res.send(resp);
		}
	});
});

module.exports = router;
