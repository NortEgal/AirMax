// $('input[name="datefilter"]').daterangepicker({
// 	autoUpdateInput: false,
// 	locale: {
// 		cancelLabel: 'Clear'
// 	}
// });

// $('input[name="datefilter"]').on('apply.daterangepicker', function (ev, picker) {
// 	$(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
// });




let date_start = moment().format('MM DD YYYY'),
	date_end = moment().format('MM DD YYYY');

$(function () {
	$('input[name="calendar"]').daterangepicker({
		autoUpdateInput: false,
		locale: {
			cancelLabel: 'Очистить',
			applyLabel: 'Применить'
		}
	}, function (start, end, label) {
		//console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
		date_start = start.format('MM DD YYYY');
		date_end = end.format('MM DD YYYY');
	});
	$('input[name="calendar"]').on('cancel.daterangepicker', function (ev, picker) {
		$(this).val('');
	});
});

$('.dropdown-p').on('click', '.dropdown-menu', function (e) {
	e.stopPropagation();
});

$.ajax({
	url: "html/flight.html",
	success: function (data) {
		$('.tickets').append(data);
		let ticket = $('.ticket-1');

		ticket.find('.ticket-date .col').html(moment().format('DD MMMM'));
		//ticket.hide();
	},
	dataType: 'html'
});

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


//console.log(ticket);
/*
	tickets-result

*/