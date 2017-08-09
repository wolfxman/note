var express = require('express');
var router = express.Router();
var moment = require('moment');

var Note = require('../models/note');//导入模型数据模块
var resp = require('../user_modules/response');//公共返回对象
router.get('/', function(req, res, next) {
	if(!req.session.user)
		res.redirect('/')
	Note.fetch(function(err, results) {
		if(err){
			console.log(err);
			res.render('list', {
				title: '列表页',
				user: req.session.user,
				items: []
			})
		}
		for (var i = 0; i < results.length; i++) {
			if(results[i].content.length > 40)
				results[i].content = results[i].content.substring(0, 40) + '...'
			if(results[i].title.length > 10)
				results[i].title = results[i].title.substring(0, 10) + '...'
		}
		res.render('list', {
			title: '列表页',
			user: req.session.user,
			items: results
		})
	});
});

module.exports = router;
