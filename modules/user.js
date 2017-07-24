var mongoose = require('mongoose');
var UserSchema = require('../schemas/user');//拿到导出的数据集模块
var User = mongoose.model('Uesr', UserSchema);//编译生成Users模型

module.exports = User;