let date_start, date_end;

$(function () {
	$('input[name="calendar1"]').daterangepicker({
		singleDatePicker: true,
		autoUpdateInput: false
	}, function (start, end, label) {
		date_start = start.format('YYYY-MM-DD');
		$('input[name="calendar1"]').val(moment(date_start).format('DD MMM YYYY'));
	});

	$('input[name="calendar2"]').daterangepicker({
		singleDatePicker: true,
		autoUpdateInput: false
	}, function (start, end, label) {
		date_end = start.format('YYYY-MM-DD');
		$('input[name="calendar2"]').val(moment(date_end).format('DD MMM YYYY'));
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
	if (date_start != '' & date_start != undefined) url += 'date_start=' + date_start + '&';
	if (date_end != '' & date_end != undefined) url += 'date_end=' + date_end + '&';
	if (seats != '' & !isNaN(seats)) url += 'seats=' + seats;
	
	//console.log(url);
	window.location.href = url;
});