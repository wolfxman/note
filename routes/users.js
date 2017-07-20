var express = require('express');
var mongoose = require('mongoose');//导入mongoose模块

var Users = require('../modules/users');//导入模型数据模块

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/users', function(req, res, next) {
	Users.fetch(function(err, users) {
		if(err) {
			console.log(err);
		}
		res.render('users', {title: '用户列表', users: users});
	});
});
router.post('/signUp', function(req, res, next) {
	var User = req;
	Users.findByName(function(err, User) {
		if(err) {
			console.log(err);
		}
		res.render('user', {name: User.name});
	});
});

module.exports = router;
