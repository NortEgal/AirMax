moment.locale('ru');
$('.result-days').hide();

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

let ticket = $('.ticket-1'), 
	ticket_sorting = 0;
//$('.ticket-1').remove();
if (where_from || where_to || date_start || date_end || seats) RequestInfo();

$('#sortTime').on('click', function () {
	ticket_sorting = 0;
	$(this).addClass('active');
	$('#sortPrice').removeClass('active');
	if($('.tickets').children().length != 0) RequestInfo();
});

$('#sortPrice').on('click', function () {
	ticket_sorting = 1;
	$(this).addClass('active');
	$('#sortTime').removeClass('active');
	if($('.tickets').children().length != 0) RequestInfo();
});

$('.mainform').on('submit', function (e) {
	where_from = $('#input_from').val();
	where_to = $('#input_to').val();
	seats = $('#input_seats').val();

	RequestInfo();
	e.preventDefault();
});

function CreateTicket(ticket_start_time, ticket_start_city, ticket_start_airport, ticket_end_time, ticket_end_city, ticket_end_airport, ticket_back_time, ticket_id, ticket_price_econom) {
	ticket_start_time = moment(ticket_start_time);
	ticket_end_time = moment(ticket_end_time);

	let	ticket_time = ticket_end_time.diff(ticket_start_time, 'hours') + ' ч. ' + ticket_end_time.diff(ticket_start_time, 'minutes') % 60 + ' мин.',	
		ticket_price_optim = Math.floor(ticket_price_econom * 1.5),
		ticket_price_premium = Math.floor(ticket_price_econom * 3);

	let ticket_new = ticket.clone();
	$('.tickets').append('<hr>');
	$('.tickets').append(ticket_new);
	ticket_new.hide().show('slow');

	ticket_new.find('.ticket-date .col-auto .col').html(ticket_start_time.format('DD MMMM'));

	if (ticket_back_time == null) {
		ticket_new.find('.ticket-date .col-auto').last().remove();
	}else {
		ticket_back_time = moment(ticket_back_time);
		ticket_new.find('.ticket-date .col-auto .col').last().html(ticket_back_time.format('DD MMMM'));
	}

	ticket_new.find('.ticket-time-fr span').first().html(ticket_start_time.format('HH:MM'));
	ticket_new.find('.ticket-time-fr span').next().html(ticket_start_city);
	ticket_new.find('.ticket-port-from').html(ticket_start_airport);

	ticket_new.find('.row.ticket-time.no-gutters .col span').first().html(ticket_time);
	ticket_new.find('.ticket-id').html(ticket_id);

	ticket_new.find('.ticket-time-to span').first().html(ticket_end_time.format('HH:MM'));
	ticket_new.find('.ticket-time-to span').next().html(ticket_end_city);
	ticket_new.find('.ticket-port-to').html(ticket_end_airport);

	ticket_new.find('.ticket-econom span').html(ticket_price_econom + '₽');
	ticket_new.find('.ticket-optim span').html(ticket_price_optim + '₽');
	ticket_new.find('.ticket-premium span').html(ticket_price_premium + '₽');

	ticket_new.css('cursor', 'pointer');
	ticket_new.mousedown(function (e) {
		if(e.which != 3) {
			window.open("biletos.html?t=" + ticket_id);
		}
	});
}

function RequestInfo() {
	$('.tickets').empty();
	$('#tickets_result1').html('Идет обработка запроса');
	$('#tickets_result2').html('');

	$.ajax({
		type: "POST",
		url: 'php/search.php?t=flights',
		data: {
			where_from: where_from,
			where_to: where_to,
			date_start: date_start,
			date_end: date_end,
			seats: seats,
			sort: ticket_sorting
		},
		success: function (info) {
			//console.log(info);
			info = JSON.parse(info);
			console.log(info);

			let sort;
			if(ticket_sorting == 0) sort = 'времени';
			if (ticket_sorting == 1) sort = 'цене';
			$('#tickets_result1').html('Найдено ' + info.length + ' вариантов');
			$('#tickets_result2').html('Сортировано по ' + sort);

			$.each(info, function (i, row) {
				CreateTicket(row.time_departure, row.from_city, row.from_airport, row.time_arrival, row.to_city, row.to_airport, row.time_back, row.id, row.price);
			});
		}
	});
}

$.ajax({
	type: "GET",
	url: 'php/search.php?t=cities',
	success: function (info) {
		//console.log(info);
		info = JSON.parse(info);
		console.log(info);

		$('#input_from').mdbAutocomplete({
			data: info
		});
		$('#input_to').mdbAutocomplete({
			data: info
		});
	}
});