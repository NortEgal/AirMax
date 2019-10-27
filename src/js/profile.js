if (account_id == null) window.location.href = 'index.html';

function UpdateInfo() {
	$.ajax({
		type: "POST",
		url: 'php/account.php?t=get',
		data: {
			id: account_id,
			hash: account_hash,
		},
		dataType: 'json',
		success: function (info) {
			if (info[9] == '') info[9] = 'https://icon-library.net/images/steam-question-mark-icon/steam-question-mark-icon-6.jpg';
			$('#profile_image').attr('src', info[9]);
			$('#profile_name').html(info[1] + ' ' + info[2] + ' ' + info[3]);
			$('#profile_mail').html(info[4]);
			$('#profile_phone').html('+' + info[6]);
			$('#profile_money').html(info[8] + ' гривен');
		}
	});
}
UpdateInfo();

/*
formProfileEmail
formProfilePasswordOld
formProfilePasswordNew
formProfileTelephone
formProfilePassport
formProfileName
formProfilePatronymic
formProfileLastname
formProfileCity

profile_button
*/