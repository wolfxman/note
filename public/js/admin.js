$(function(){
	$('#submit').click(function(e) {
		var title = $('#noteTitle').val();
		var content = $('#noteContent').val();

		var note = localStorage.getItem('note') ? localStorage.getItem('note') : '';
		note += ' ' + title + ',' + content + ',' + new Date().getTime();
		localStorage.setItem('note', note);

		var data = {};
		var _id = $('.noteId').text();
		if(_id != 'undefined' && _id != ''){
			data._id = _id;
		}
		data.title = title;
		data.content = content;
		var user = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : {};
		if(!user._id){
			alert('请重新登录');
			return;
		}else{
			data.userId = user._id;
		}
		var url = '';
		if(data._id)
			url = '../update';
		else
			url = '/note/save';
		$.ajax({
			type: 'POST',
			url: url,
			data: data
		})
		.done(function(res){
			if(res.meta.code === 'success'){
				console.log('save note success...');
				var url = '';
				if($('.noteId').text() != 'undefined')
					url = '../../list';
				else
					url = '../list';
				location.href = url;
			}
		})
	});
});