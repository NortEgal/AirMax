$(document).ready(function () {
	$('footer').load('html/footer.html');
	$('header').load('html/header.html');
});

function urlGet(string) {
	let url = new URLSearchParams(window.location.search);
	return url.get(string)
}

let account_id = localStorage.getItem("gag_account_id"),
	account_hash = localStorage.getItem("gag_account_hash");

if (account_id != null) {
	$.ajax({
		type: "POST",
		url: 'php/account.php?t=check',
		data: {
			id: account_id,
			hash: account_hash,
		},
		success: function (info) {
			if (info == true) $('#header_dropdown').load('html/header_options.html');
		}
	});
} else {
	if (location.pathname.substring(location.pathname.lastIndexOf("/") + 1) == 'profile.html') window.location.href = 'index.html';
}