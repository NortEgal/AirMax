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
});

$(function () {
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
	tickets-result

*/