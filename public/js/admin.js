$(function(){
	$('#submit').click(function(e) {
		var title = $('#noteTitle').val();
		var content = $('#noteContent').val();

		var note = localStorage.getItem('note') ? localStorage.getItem('note') : '';
		note += ' ' + title + ',' + content + ',' + new Date().getTime();
		localStorage.setItem('note', note);
		var data = {};
		data.title = title;
		data.content = content;
		var user = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : {};
		if(!user._id){
			alert('请重新登录');
			return;
		}else{
			data.userId = user._id;
		}
		$.ajax({
			type: 'POST',
			url: 'save',
			data: data
		})
		.done(function(res){
			if(res.meta.code === 'success'){
				console.log('save note success...');
				location.href = '../list';
			}
		})
	});
});