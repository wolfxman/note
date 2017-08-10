$(function(){
	$('#signUp').click(function(e) {
		signUp();
	});
	$('body').keyup(function(e) {
		if(e.keyCode == 13) {
			$('#signUp').click();
		}
	});
});
function signUp(){
	var name = $('#userName').val().trim();
	var password = $('#password').val().trim();
	var repwd = $('#rePassword').val().trim();
	if(name.length == 0){
		alert('请输入用户名');
		return false;
	}
	if(password.length == 0){
		alert('请输入密码');
		return false;
	}
	if(password != repwd){
		alert('两次密码不一致');
		return false;
	}
	var data = {};
	data.name = name;
	data.password = password;
	$.ajax({
		url: 'signUp',
		type: "POST",
		data: data
	})
	.done(function(res){
		if(res.meta.code === 'error'){
			alert(res.meta.msg);
		}else if(res.meta.code === 'success'){
			console.log('signUp success...');
			location.href = '../../list';
		}
	})
}