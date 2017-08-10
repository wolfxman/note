var express = require('express');
var router = express.Router();
var moment = require('moment');


router.get('/', function(req, res, next) {
	req.session.destroy(function(err){
		res.render('signIn', {
			title: '注册 / 登录'
		})
	});
});

module.exports = router;
