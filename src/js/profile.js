if (account_id == null) window.location.href = 'index.html';

function UpdateInfo() {
	$.ajax({
		type: "POST",
		url: 'php/account.php?t=get',
		data: {
			id: account_id,
			hash: account_hash,
		},
		success: function (info) {
			info = JSON.parse(info);
			console.log(info);
			if (info.image == '') info.image = 'https://icon-library.net/images/steam-question-mark-icon/steam-question-mark-icon-6.jpg';
			$('#profile_image').attr('src', info.image);
			$('#profile_name').html(info.firstname + ' ' + info.middlename + ' ' + info.surname);
			$('#profile_mail').html(info.mail);
			$('#profile_phone').html('+' + info.phone);
			$('#profile_money').html(info.money + ' гривен');
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
formProfileImage

profile_button
*/