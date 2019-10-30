let where_from = getURL('from'),
	where_to = getURL('to'),
	date_start = getURL('date_start'),
	date_end = getURL('date_end'),
	seats = getURL('seats');

if (where_from != null) $('#input_from').val(where_from);
if (where_to != null) $('#input_to').val(where_to);
if (date_start != null) $('#input_time1').val(moment(date_start).format('DD MMM YYYY')); else date_start = moment();
if (date_end != null) $('#input_time2').val(moment(date_end).format('DD MMM YYYY')); else date_end = moment();
if (seats != null & !isNaN(seats)) $('#input_seats').val(seats);

$(function () {
	$('input[name="calendar1"]').daterangepicker({
		singleDatePicker: true,
		autoUpdateInput: false,
		startDate: moment(date_start),
	}, function (start, end, label) {
		date_start = start.format('YYYY-MM-DD');
		$('input[name="calendar1"]').val(moment(date_start).format('DD MMM YYYY'));
	});

	$('input[name="calendar2"]').daterangepicker({
		singleDatePicker: true,
		autoUpdateInput: false,
		startDate: moment(date_end),
	}, function (start, end, label) {
		date_end = start.format('YYYY-MM-DD');
		$('input[name="calendar2"]').val(moment(date_end).format('DD MMM YYYY'));
	});
});

$('.dropdown-p').on('click', '.dropdown-menu', function (e) {
	e.stopPropagation();
});

let ticket, 
	tickets_result = 0;

$.ajax({
	url: "html/flight.html",
	success: function (data) {
		$('.tickets').append(data);
		ticket = $('.ticket-1');
		$('.ticket-1').remove();
	},
	dataType: 'html'
});

$('.mainform').on('submit', function (e) {
	// $.ajax({
	// 	type: 'POST',
	// 	url: 'php/account.php?t=login',
	// 	data: {
	// 		mail: $('#materialLoginFormEmail').val(),
	// 		password: $('#materialLoginFormPassword').val()
	// 	},
	// 	success: function (info) {
	// 		if (info != false) {
	// 			info = JSON.parse(info);
	// 			localStorage.setItem("gag_account_id", info.id);
	// 			localStorage.setItem("gag_account_hash", info.password);
	// 			window.location.reload();
	// 		} else {
	// 			alert('Неправильно введена почта/пароль');
	// 		}
	// 	}
	// });
	let ticket_date = moment().format('DD MMMM'),
		ticket_start_time = moment(),
		ticket_start_city = 'Пермь',
		ticket_end_time = moment().add(Math.floor(Math.random() * 10) + 1, 'hour').add(Math.floor(Math.random() * 60), 'minute'),
		ticket_end_city = 'Москва',
		ticket_time = ticket_end_time.diff(ticket_start_time, 'hours') + ' ч. ' + ticket_end_time.diff(ticket_start_time, 'minutes')%60 + ' мин.',//moment().hours(2).minutes(37).format('h ч. m мин.'),		
		ticket_id = Math.floor(Math.random() * 10000),
		ticket_price_econom = Math.floor(Math.random() * 10000) + 5000,
		ticket_price_optim = Math.floor(ticket_price_econom * 1.5),	
		ticket_price_premium = Math.floor(ticket_price_econom * 3);

	let ticket_new = ticket.clone();
	$('.tickets').prepend(ticket_new);
	ticket_new.fadeIn('slow');

	ticket_new.find('.ticket-date .col').html(ticket_date);

	ticket_new.find('.ticket-time-fr span').first().html(ticket_start_time.format('HH:MM'));
	ticket_new.find('.ticket-time-fr span').next().html(ticket_start_city);

	ticket_new.find('.row.ticket-time.no-gutters .col span').first().html(ticket_time);
	ticket_new.find('.ticket-id').html(ticket_id);

	ticket_new.find('.ticket-time-to span').first().html(ticket_end_time.format('HH:MM'));
	ticket_new.find('.ticket-time-to span').next().html(ticket_end_city);

	ticket_new.find('.ticket-econom span').html(ticket_price_econom + '₽');
	ticket_new.find('.ticket-optim span').html(ticket_price_optim + '₽');
	ticket_new.find('.ticket-premium span').html(ticket_price_premium + '₽');

	tickets_result+=1;
	$('#tickets_result').html('Найдено: ' + tickets_result + ' вариантов');

	e.preventDefault();
});

function UpdateInfo() {
	$.ajax({
		type: "POST",
		url: 'php/search.php',
		data: {
			where_from: where_from,
			where_to: where_to,
			date_start: date_start,
			date_end: date_end,
			seats: seats
		},
		success: function (info) {
			info = JSON.parse(info);
			console.log(info);

		}
	});
}
//UpdateInfo();

/*
	

*/