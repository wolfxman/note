var mongoose = require('mongoose');

//声明mongoose对象
var UserSchema = mongoose.Schema({
	name: String,
	pwd: String,
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
},{
	collection: 'user'
});

//每次执行都会调用，时间更新操作
UserSchema.pre('save', function(next){
	if(this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	}else{
		this.meta.updateAt = Date.now();
	}
	
	next();
});

//查询的静态方法
UserSchema.statics = {
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

//暴露出去的方法
module.exports = UserSchema;