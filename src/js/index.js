$(function () {
	$('input[name="calendar"]').daterangepicker({
		"minYear": 2019,
		"maxYear": 2020,
		"startDate": "10/02/2019",
		"endDate": "10/02/2019",
		"minDate": "dd/mm/yyyy",
		"maxDate": "dd/mm/yyyy"
	}, function (start, end, label) {
		console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
	});
});
$('.dropdown-p').on('click', '.dropdown-menu', function (e) {
	e.stopPropagation();
});