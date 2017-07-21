$(function(){
	$('#signIn').click(function(e) {
		var name = $('#userName').val();
		var pwd = $('#password').val();
		localStorage.setItem('name', name);
		location.href = '../list';
	});
	$('body').keyup(function(e) {if(e.keyCode == 13) {
			$('#signIn').click();
		}
		
	});
});