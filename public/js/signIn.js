$(function(){
	$('#signIn').click(function(e) {
		var name = $('#userName').val();
		var pwd = $('#password').val();
		var data = {};
		data.name = name;
		data.pwd = pwd;
		$.ajax({
			type: 'POST',
			url: 'user/signIn',
			data: data
		})
		.done(function(results){
			if(results.success === 1){
				console.log('signIn success...');
			}
		})
		//location.href = '../list';
	});
	$('body').keyup(function(e) {
		if(e.keyCode == 13)
			$('#signIn').click();
	});
});