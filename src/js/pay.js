if (account_id == null || getURL('t') == null) window.location.href = 'index.html';

$('button.btn-primary').on('click', function() {
	$.ajax({
		type: "POST",
		url: 'php/pay.php',
		data: {
			id: account_id,
			hash: account_hash,
			t: getURL('t')
		},
		success: function (info) {
			console.log(info);
			if (info == 'already') alert('Этот рейс уже куплен');
			if (info == 'bought') alert('Билет успешно куплен');
			window.location.href = 'profile.html';
		}
	});
});
