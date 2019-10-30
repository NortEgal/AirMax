moment.locale('ru');

let where_from = getURL('from'),
	where_to = getURL('to'),
	date_start = getURL('date_start'),
	date_end = getURL('date_end'),
	seats = getURL('seats');

if (where_from != null) $('#input_from').val(where_from);
if (where_to != null) $('#input_to').val(where_to);
if (date_start != null) $('#input_time1').val(moment(date_start).format('DD MMM YYYY'));
if (date_end != null) $('#input_time2').val(moment(date_end).format('DD MMM YYYY'));
if (seats != null & !isNaN(seats)) $('#input_seats').val(seats);

$(function () {
	$('input[name="calendar1"]').daterangepicker({
		singleDatePicker: true,
		autoUpdateInput: false,
		startDate: moment(),
	}, function (start, end, label) {
		date_start = start.format('YYYY-MM-DD');
		$('input[name="calendar1"]').val(moment(date_start).format('DD MMM YYYY'));
	});

	$('input[name="calendar2"]').daterangepicker({
		singleDatePicker: true,
		autoUpdateInput: false,
		startDate: moment(),
	}, function (start, end, label) {
		date_end = start.format('YYYY-MM-DD');
		$('input[name="calendar2"]').val(moment(date_end).format('DD MMM YYYY'));
	});
});

$('.dropdown-p').on('click', '.dropdown-menu', function (e) {
	e.stopPropagation();
});

let ticket, 
	ticket_sorting = 0;

$('#sortTime').on('click', function () {
	ticket_sorting = 0;
	$(this).addClass('active');
	$('#sortPrice').removeClass('active');
	RequestInfo();
});

$('#sortPrice').on('click', function () {
	ticket_sorting = 1;
	$(this).addClass('active');
	$('#sortTime').removeClass('active');
	RequestInfo();
});

$.ajax({
	url: "html/flight.html",
	success: function (data) {
		$('.tickets').append(data);
		ticket = $('.ticket-1');
		$('.ticket-1').remove();
		if (where_from || where_to || date_start || date_end || seats) RequestInfo();
	},
	dataType: 'html'
});

$('.mainform').on('submit', function (e) {
	$('.tickets').empty();
	$('#tickets_result1').html('Идет обработка запроса');
	$('#tickets_result2').html('');

	where_from = $('#input_from').val();
	where_to = $('#input_to').val();
	seats = $('#input_seats').val();

	RequestInfo();
	e.preventDefault();
});

function CreateTicket(ticket_start_time, ticket_start_city, ticket_end_time, ticket_end_city, ticket_id, ticket_price_econom) {
	ticket_start_time = moment(ticket_start_time);
	ticket_end_time = moment(ticket_end_time);

	let	ticket_time = ticket_end_time.diff(ticket_start_time, 'hours') + ' ч. ' + ticket_end_time.diff(ticket_start_time, 'minutes') % 60 + ' мин.',	
		ticket_price_optim = Math.floor(ticket_price_econom * 1.5),
		ticket_price_premium = Math.floor(ticket_price_econom * 3);

	let ticket_new = ticket.clone();
	$('.tickets').append('<hr>');
	$('.tickets').append(ticket_new);
	ticket_new.hide().show('slow');

	ticket_new.find('.ticket-date .col').html(ticket_start_time.format('DD MMMM'));

	ticket_new.find('.ticket-time-fr span').first().html(ticket_start_time.format('HH:MM'));
	ticket_new.find('.ticket-time-fr span').next().html(ticket_start_city);

	ticket_new.find('.row.ticket-time.no-gutters .col span').first().html(ticket_time);
	ticket_new.find('.ticket-id').html(ticket_id);

	ticket_new.find('.ticket-time-to span').first().html(ticket_end_time.format('HH:MM'));
	ticket_new.find('.ticket-time-to span').next().html(ticket_end_city);

	ticket_new.find('.ticket-econom span').html(ticket_price_econom + '₽');
	ticket_new.find('.ticket-optim span').html(ticket_price_optim + '₽');
	ticket_new.find('.ticket-premium span').html(ticket_price_premium + '₽');

	ticket_new.css('cursor', 'pointer');
	ticket_new.mousedown(function () {
		window.open("biletos.html?t=" + ticket_id);
	});
}

function RequestInfo() {
	$.ajax({
		type: "POST",
		url: 'php/search.php',
		data: {
			where_from: where_from,
			where_to: where_to,
			date_start: date_start,
			date_end: date_end,
			seats: seats,
			sort: ticket_sorting
		},
		success: function (info) {
			info = JSON.parse(info);
			console.log(info);

			let sort;
			if(ticket_sorting == 0) sort = 'времени';
			if (ticket_sorting == 1) sort = 'цене';
			$('#tickets_result1').html('Найдено: ' + info.length + ' вариантов');
			$('#tickets_result2').html('Сортировано по ' + sort);

			$.each(info, function (i, row) {
				CreateTicket(row.time_departure, row.where_from, row.time_arrival, row.where_to, row.id, row.price);
			});
		}
	});
}