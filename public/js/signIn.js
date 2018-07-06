$(function(){
	$('#signIn').click(function(e) {
		var name = $('#userName').val().trim();
		var password = $('#password').val().trim();
		if(name.length == 0 || password.length == 0)
			return;
		var data = {};
		data.name = name;
		data.password = password;
		$.ajax({
			type: 'POST',
			url: 'user/signIn',
			data: data
		})
		.done(function(res){
			if(res.meta.code === 'success'){
				console.log('signIn success...');
				sessionStorage.setItem('user', JSON.stringify(res.result[0]));
				location.href = '../list';
			}else{
				alert(res.meta.msg);
				location.href = '../user/signUp';
			}
		})
	});
	$('body').keyup(function(e) {
		if(e.keyCode == 13)
			$('#signIn').click();
	});
});
