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
			console.log(info[8]);

			$('#profile_image').attr('src', info[8]);
			$('#profile_name').html(info[1] + ' ' + info[2] + ' ' + info[3]);
			$('#profile_mail').html(info[4]);
			$('#profile_money').html(info[7] + ' гривен');
		}
	});
}

UpdateInfo();