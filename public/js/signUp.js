$(function(){
	$('#signUp').click(function(e) {
		checkUser();
	});
	$('body').keyup(function(e) {
		if(e.keyCode == 13) {
			$('#signUp').click();
		}
	});
});
function checkUser(){
	var name = $('#userName').val();
	var password = $('#password').val();
	var repwd = $('#repassword').val();
	if(name.trim().length == 0){
		$xsq.tips('请输入用户名');
		return false;
	}
	if(password.trim().length == 0){
		$xsq.tips('请输入密码');
		return false;
	}
	if(password != repwd){
		$xsq.tips('两次密码不一致');
		return false;
	}
	var data = {};
	data.name = name;
	data.password = password;
	$.ajax({
		url: 'signUp',
		type: "POST",
		data: data,
		enctype: 'application/json;charset=utf-8',
		dataType: "text",
		success: function(datas) {
			
		},
		error: function(xhr, error) {}
	});
}