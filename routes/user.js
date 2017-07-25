var express = require('express');
var mongoose = require('mongoose');//导入mongoose模块

var User = require('../modules/user');//导入模型数据模块
var router = express.Router();

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
	User.fetch(function(err, result) {
		console.log(result);
		res.send({res: 'success', result: result});
	});
});
router.post('/signUp', function(req, res, next) {
	var queryObj = req;
	User.findByName(function(err, User) {
		if(err) {
			console.log(err);
		}
		res.render('user', {name: User.name});
	});
});

module.exports = router;
