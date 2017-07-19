var express = require('express');
var mongoose = require('mongoose');//导入mongoose模块

var Users = require('../module/users');//导入模型数据模块

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

module.exports = router;
