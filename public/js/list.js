$(function(){
	$('#addNew').click(function(e) {
		location.href = '../note/add';
	});
	$('.del').click(function(e) {
		var _id = $(e.target).attr('data-id');
		var data = {};
		data._id = _id;
		$.ajax({
			type: 'POST',
			url: 'note/delOne',
			data: data
		})
		.done(function(res){
			if(res.meta.code === 'success'){
				location.reload();
			}
		})
	});
	$('.edit').click(function(e) {
		var _id = $(e.target).attr('data-id');
		location.href = 'note/add/' + _id;
	});
});
function find(){
	var data = {};
	var user = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : {};
	if(!user._id){
		alert('请重新登录');
		return;
	}else{
		data.userId = user._id;
	}
	$.ajax({
		type: 'POST',
		url: 'list',
		data: data
	})
	.done(function(res){
		if(res.meta.code === 'success'){
			console.log('save note success...');
		}
	})
}