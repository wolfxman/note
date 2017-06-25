var express = require('express');
var router = express.Router();
var moment = require('moment');


router.get('/', function(req, res, next) {
	res.render('admin', {
		title: '录入页',
		note: {
			title: '',
			content: ''
		}
	})
});
module.exports = router;
