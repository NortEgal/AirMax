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

$('#search').click( function() {
	let url = "search.html?",
		from = $('#input_from').val(),
		to = $('#input_to').val(),
		seats = Number($('#input_seats').val());
	
	if (from != '') url += 'from=' + from + '&';
	if (to != '') url += 'to=' + to + '&';
	if (date_start != '' & date_start != undefined) url += 'time_start=' + date_start + '&';
	if (date_end != '' & date_end != undefined) url += 'time_end=' + date_end + '&';
	if (seats != '' & !isNaN(seats)) url += 'seats=' + seats;
	
	//console.log(url);
	window.location.href = url;
});