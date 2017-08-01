$(function(){
	$('#signIn').click(function(e) {
		var name = $('#userName').val();
		var password = $('#password').val();
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
				location.href = '../list';
			}
		})
	});
	$('body').keyup(function(e) {
		if(e.keyCode == 13)
			$('#signIn').click();
	});
});