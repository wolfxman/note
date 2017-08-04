var express = require('express');
var mongoose = require('mongoose');//导入mongoose模块
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
		if(results._doc.password == queryObj.password){
			localStorage.setItem('user', JSON.stringify(results));
			resp.meta.code = 'success';
			resp.meta.msg = 'success';
			resp.result.push(results);
		}else{
			resp.meta.code = 'error';
			resp.meta.msg = '用户名或密码不正确';
		}
		res.send(resp);
	});
});

module.exports = router;
