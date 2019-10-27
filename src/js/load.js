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
			if (!isNaN(info)) {
				$('#header_dropdown').load('html/header_options_'+info+'.html');
			}else {
				window.location.href = 'logout.html';
			}
		}
	});
} else {
	//if (location.pathname.substring(location.pathname.lastIndexOf("/") + 1) == 'profile.html') window.location.href = 'index.html';

	$.ajax({
		url: "html/login.html",
		success: function (data) 
		{ 
			$('body').append(data); 

			$('#form_login').on('submit',function (e) {
				$.ajax({
					type: 'POST',
					url: 'php/account.php?t=login',
					data: {
						mail: $('#materialLoginFormEmail').val(),
						password: $('#materialLoginFormPassword').val()
					},
					success: function (info) {
						if(info != false) {
							info = JSON.parse(info);
							localStorage.setItem("gag_account_id", info.id);
							localStorage.setItem("gag_account_hash", info.password);
							window.location.reload();
						}else {
							alert('Неправильно введена почта/пароль');
						}
					}
				});
				e.preventDefault();
			});
		},
		dataType: 'html'
	});

	$.ajax({
		url: "html/register.html",
		success: function (data) 
		{ 
			$('body').append(data);

			$('#form_register').on('submit',function (e) {
				$.ajax({
					type: 'POST',
					url: 'php/account.php?t=register',
					data: {
						mail: $('#materialRegisterFormEmail').val(),
						password: $('#materialRegisterFormPassword').val(),
						firstname: $('#materialRegisterFormFirstName').val(),
						middlename: $('#materialRegisterFormMiddleName').val(),
						lastname: $('#materialRegisterFormLastName').val(),
						phone: $('#materialRegisterFormPhone').val(),
						passport: $('#materialRegisterFormPassport').val()
					},
					success: function (info) {
						console.log(info);
						if(isNaN(info)) {
							info = JSON.parse(info);
							localStorage.setItem("gag_account_id", info.id);
							localStorage.setItem("gag_account_hash", info.password);
							//window.location.reload();
						} 
						if(info == 0){
							alert('Эта почта уже зарегистрирована');
						}
						if(info == 1){
							alert('Вы не указали почту/пароль');
						}
					}
				});
				e.preventDefault();
			});
		},
		dataType: 'html'
	});
}