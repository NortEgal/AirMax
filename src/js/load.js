$.ajaxSetup({
	cache: false
});

function getPageName() {
	var index = window.location.href.lastIndexOf("/") + 1,
		filenameWithExtension = window.location.href.substr(index),
		filename = filenameWithExtension.split(".")[0];

	return filename;
}

function getURL(string) {
	let url = new URLSearchParams(window.location.search);
	return url.get(string)
}

let scripts = [
	//"js/libs/jquery.min.js",
	'js/theme.js',
	"js/libs/popper.min.js",
	"js/libs/bootstrap.min.js",
	"js/libs/mdb.min.js",
	"js/libs/moment.min.js",
	"js/libs/moment/ru.js",
	"js/libs/daterangepicker.js",
	"js/libs/addons/stepper.min.js"
];
if (getPageName() != '') scripts.push('js/' + getPageName() + '.js'); else scripts.push('js/index.js');

$(document).ready(function () {
	$('body').hide().fadeIn('slow');
	$('footer').load('html/footer.html');
	$('header').load('html/header.html');

	for (path of scripts) {
		$.ajax({
			async: false,
			url: path,
			dataType: "script"
		});
	}
});

let account_id = localStorage.getItem("gag_account_id"),
	account_hash = localStorage.getItem("gag_account_hash"),
	account_info = localStorage.getItem("gag_account_info");
if (!account_info != null) account_info = JSON.parse(localStorage.getItem("gag_account_info"));

if (account_id != null) {
	$.ajax({
		type: "POST",
		url: 'php/account.php?t=get',
		data: {
			id: account_id,
			hash: account_hash,
		},
		success: function (info) {
			if (!isNaN(info)) {window.location.href = 'logout.html';}else{
				//console.log(info);
				localStorage.setItem("gag_account_info", info);
				account_info = JSON.parse(info);
				$('#header_dropdown').load('html/header_options_'+account_info.rank+'.html');
				console.log(account_info);
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
			
			$("#register-btn").click(function () {
				$("#SignINmodal").modal('hide');
			});

			$('#materialLoginFormForgot').on('click', function (e) {
				e.preventDefault();
				if ($('#materialLoginFormEmail').val() != '') {
					$.ajax({
						type: 'POST',
						url: 'php/account.php?t=forgot',
						data: {
							mail: $('#materialLoginFormEmail').val()
						},
						success: function (info) {
							if (info) {
								alert('Пароль: ' + info);
							} else {
								alert('Пользователя с такой почтой не существует');
							}
						}
					});
				}else{
					alert('Пожалуйста, укажите почту');
				}
			});

			$('#form_login').on('submit',function (e) {
				e.preventDefault();
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
			});
		},
		dataType: 'html'
	});

	$.ajax({
		url: "html/register.html",
		success: function (data) 
		{ 
			$('body').append(data);
			//Horizontal Stepper
				function validationFunction() {
					setTimeout(function () {
						$('#horizontal-stepper').nextStep();
					}, 1600);
				}
				function someTrueFunction() {
					return true;
				}
				$(document).ready(function () {
					$('.stepper').mdbStepper();
				})
			$('.tel').on('keydown', function (e) {
				if (e.key.length == 1 && e.key.match(/[^0-9'".]/)) {
					return false;
				};
			})
			//BOOMER CODE ALERT
			window.addEventListener("DOMContentLoaded", function () {
				[].forEach.call(document.querySelectorAll('.tel'), function (input) {
					var keyCode;
					function mask(event) {
						event.keyCode && (keyCode = event.keyCode);
						var pos = this.selectionStart;
						if (pos < 3) event.preventDefault();
						var matrix = "+7 (___) ___ ____",
							i = 0,
							def = matrix.replace(/\D/g, ""),
							val = this.value.replace(/\D/g, ""),
							new_value = matrix.replace(/[_\d]/g, function (a) {
								return i < val.length ? val.charAt(i++) || def.charAt(i) : a
							});
						i = new_value.indexOf("_");
						if (i != -1) {
							i < 5 && (i = 3);
							new_value = new_value.slice(0, i)
						}
						var reg = matrix.substr(0, this.value.length).replace(/_+/g,
							function (a) {
								return "\\d{1," + a.length + "}"
							}).replace(/[+()]/g, "\\$&");
						reg = new RegExp("^" + reg + "$");
						if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
						if (event.type == "blur" && this.value.length < 5) this.value = ""
					}

					input.addEventListener("input", mask, false);
					input.addEventListener("focus", mask, false);
					input.addEventListener("blur", mask, false);
					input.addEventListener("keydown", mask, false)

				});

			});

			$('#form_register_one').on('submit', function(e) {
				e.preventDefault();
				$('#SignUpModal .nav-link').eq(1).click();
			});

			$('#form_register_two').on('submit',function (e) {
				e.preventDefault();
				$.ajax({
					type: 'POST',
					url: 'php/account.php?t=register',
					data: {
						mail: $('#materialRegisterFormEmail').val(),
						password: $('#materialRegisterFormPassword').val(),
						firstname: $('#materialRegisterFormFirstName').val(),
						middlename: $('#materialRegisterFormMiddleName').val(),
						lastname: $('#materialRegisterFormLastName').val(),
						phone: $('#materialRegisterFormPhone').val().replace(/\D/g, ""),
						passport: $('#materialRegisterFormPassport').val()
					},
					success: function (info) {
						if (info == 'exist') {
							alert('Эта почта уже зарегистрирована');
						}else if (info == 'empty') {
							alert('Вы не указали почту/пароль');
						}else if (info == 'wrong') {
							alert('Вы неправильно указали почту');
						}else {
							info = JSON.parse(info);
							localStorage.setItem("gag_account_id", info.id);
							localStorage.setItem("gag_account_hash", info.password);
							$('#SignUpModal .nav-link').eq(2).click();
							setTimeout(window.location.reload(), 5000);
						} 
					}
				});
			});
		},
		dataType: 'html'
	});
}