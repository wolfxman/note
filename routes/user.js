var express = require('express');
var mongoose = require('mongoose');//导入mongoose模块

var User = require('../models/user');//导入模型数据模块
var router = express.Router();

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

/*test*/
var U = mongoose.Schema({
	name: String,
	pwd: String
});
U.statics = {
	fetch: function(cb) {//查询所有数据
		return this
			.find({})
			//.sort('meta.updateAt')//排序
			.exec(cb)//回调
	},
	findById: function(id, cb) {//根据id查询单条数据
		return this
			.findOne({_id: id})
			.exec(cb)
	},
	findByName: function(name, cb) {//根据name查询
		var obj = {};
		obj.name = name;
		return this.findOne(obj).exec(cb);
	}
}
var Us = mongoose.model('Us', U);//编译生成Users模型

var testSchema = new mongoose.Schema({ name: String });
var Giftcard = mongoose.model('giftcard', testSchema);

const giftcard = new Giftcard({ // new instance of the model
  name: 'test'
});

giftcard.save((err) => {
  throw new Error('woops');
  // this never happens - the callback is never called
});

/*test end*/
router.post('/signIn', function(req, res) {
	var queryObj = req.body;
	Us.findByName(queryObj.name, function(err, result) {
		console.log('err: ' + err + ', result: ' + result);
		res.send({res: 'success', result: result});
	});
});

module.exports = router;
