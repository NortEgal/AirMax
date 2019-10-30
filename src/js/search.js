let date_start = moment().format('MM DD YYYY'),
	date_end = moment().format('MM DD YYYY');

$(function () {
	$('input[name="calendar"]').daterangepicker({}, function (start, end, label) {
		//console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
		date_start = start.format('MM DD YYYY');
		date_end = end.format('MM DD YYYY');
	});
});

$('.dropdown-p').on('click', '.dropdown-menu', function (e) {
	e.stopPropagation();
});

$.ajax({
	url: "html/flight.html",
	success: function (data) {
		$('.tickets').append(data);
		let ticket = $('.ticket-1')
		ticket.find('.ticket-date .col').html(moment().format('DD MMMM'));
		//ticket.hide();
	},
	dataType: 'html'
});

//console.log(ticket);
/*
	tickets-result

*/