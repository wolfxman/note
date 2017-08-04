var express = require('express');
var router = express.Router();
var moment = require('moment');

var Note = require('../models/note');//导入模型数据模块
var resp = require('../user_modules/response');//公共返回对象
router.get('/', function(req, res, next) {
	Note.fetch(function(err, results) {
		if(err){
			console.log(err);
			res.render('list', {
				title: '列表页',
				items: []
			})
		}
		res.render('list', {
			title: '列表页',
			items: results
		})
	});
});
router.post('/', function(req, res, next) {
	var queryObj = req.body;
	var userId = queryObj.userId;
	Note.findByUserId(userId, function(err, results) {
		if(err)
			console.log(err);
		resp.meta.code = 'success';
		resp.meta.msg = 'success';
		resp.result.push(results);
		res.send(resp);
	});
});
module.exports = router;
