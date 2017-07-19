$(function(){
	$('#submit').click(function(e) {
		var title = $('#noteTitle').val();
		var content = $('#noteContent').val();

		var note = localStorage.getItem('note') ? localStorage.getItem('note') : '';
		note += ' ' + title + ',' + content + ',' + new Date().getTime();
		localStorage.setItem('note', note);
		location.href = '../list';
	});
});