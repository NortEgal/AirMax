let id = getURL('t');

$.ajax({
	type: "POST",
	url: 'php/biletos.php',
	data: {
		id: id,
	},
	success: function (info) {
		info = JSON.parse(info);
		//console.log(info);

		let date_start = moment(info.time_departure),
			date_end = moment(info.time_arrival),
			date_diff = date_end.diff(date_start, 'hours') + ' ч. ' + date_end.diff(date_start, 'minutes') % 60 + ' мин.'

		$('div.h2.px-4.pb-4').html('Рейс ' + info.id);

		$('div.row.p-5.border.rounded span').eq(0).html(date_start.format('DD MMMM'));
		$('div.row.p-5.border.rounded span').eq(1).html(date_start.format('HH:MM'));
		$('div.row.p-5.border.rounded span').eq(2).html(info.where_from);

		$('div.row.p-5.border.rounded span').eq(3).html(date_diff);

		$('div.row.p-5.border.rounded span').eq(4).html(date_end.format('DD MMMM'));
		$('div.row.p-5.border.rounded span').eq(5).html(date_end.format('HH:MM'));
		$('div.row.p-5.border.rounded span').eq(6).html(info.where_to);

		$('.col-3 div').last().html(info.plane_id);
	}
});

if (account_id == null) {
	$('a.btn').attr('data-target', '#SignINmodal');
	$('a.btn').attr('data-toggle', 'modal');
	$('a.btn').on('click', function (e) {
		e.preventDefault();
	});
}else{
	$('a.btn').on('click', function (e) {
		e.preventDefault();
		window.location.href = 'pay.html?t='+id;
	});
}
