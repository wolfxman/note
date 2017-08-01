var express = require('express');
var mongoose = require('mongoose');//导入mongoose模块

var router = express.Router();
var User = require('../models/user');//导入模型数据模块

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
	User.findByName(queryObj.name, function(err, result) {
		console.log('err: ' + err + ', result: ' + result);
		res.send({res: 'success', result: result});
	});
});

module.exports = router;
