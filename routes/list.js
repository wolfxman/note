var express = require('express');
var router = express.Router();
var moment = require('moment');

router.get('/', function(req, res, next) {
	res.render('list', {
		title: '列表页',
		items: [{
			_id: 1,
			title: '第一次日记',
			createAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
			content: '啥也没记'
		}]
	})
});
module.exports = router;
