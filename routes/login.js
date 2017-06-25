var express = require('express');
var router = express.Router();
var moment = require('moment');


router.get('/', function(req, res, next) {
	res.render('login', {
		title: '个人日记'
	})
});
module.exports = router;
