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

			$('#profile_money').html(info.money + ' гривен');

			$('input#formProfileEmail').val(info.mail);
			$('input#formProfileTelephone').val(info.phone);
			$('input#formProfileName').val(info.firstname);
			$('input#formProfileLastname').val(info.lastname);
			$('input#formProfilePatronymic').val(info.patronymic);
			$('input#formProfilePassport').val(info.passport);
		}
	});
}
UpdateInfo();

function SendInfo() {
	$.ajax({
		type: "POST",
		url: 'php/account.php?t=set',
		data: {
			id: account_id,
			hash: account_hash,
			firstname: $('input#formProfileName').val(),
			patronymic: $('input#formProfilePatronymic').val(),
			lastname: $('input#formProfileLastname').val(),
			mail: $('input#formProfileEmail').val(),
			passwordOld: $('input#formProfilePasswordOld').val(),
			passwordNew: $('input#formProfilePasswordNew').val(),
			phone: $('input#formProfileTelephone').val(),
			passport: $('input#formProfilePassport').val()
		},
		success: function (info) {
			//console.log(info);
			if(info == 'new') {
				alert('Новый пароль совпадает со старым.');
			}else if (info == 'old') {
				alert('Текущий пароль введен неправильно.');
			} else if (info == 'hash') {
				alert('Ты кто?');
			}else{
				if (info != '') localStorage.setItem("gag_account_hash", info);
				UpdateInfo();
			}
		}
	});
}

$('#profile_button_add').on('click', function (e) {
	e.preventDefault();
	SendInfo();
});

$('#profile_pay').on('click', function (e) {
	e.preventDefault();
	window.location.href = 'pay.html?t=money';
});

let ticket_template = $('.ticket');
$('.ticket').remove();

function CreateTicket(where_from, where_to, time_departure, id, model, price) {
	let ticket = ticket_template.clone();
	$('.tickets').prepend(ticket).show('slow');

	ticket.find('#city-trip').html(where_from + ' - ' + where_to);
	ticket.find('#date-trip').html(moment(time_departure).format('DD MMMM YYYY'));
	ticket.find('#id-flight').html('Рейс: ' + id);
	ticket.find('#airplane').html('Самолет: ' + model);
	ticket.find('#price-trip').html('Цена: ' + price + ' ₽');

	ticket.css('cursor', 'pointer');
	ticket.mousedown(function () {
		window.open("biletos.html?t=" + id);
	});
}

$.ajax({
	type: "POST",
	url: 'php/account.php?t=flights',
	data: {
		id: account_id,
		hash: account_hash,
	},
	success: function (info) {
		if(info != '') {
			info = JSON.parse(info);
			console.log(info);

			$.each(info, function (i, row) {
				if (row.type == 1) row.price *= 1.5;
				if (row.type == 2) row.price *= 3;

				CreateTicket(row.where_from, row.where_to, row.time_departure, row.id, row.model, Math.round(row.price));
			});
		}
	}
});