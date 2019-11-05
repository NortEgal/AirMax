let id = getURL('t');
if (id == null) window.location.href = 'index.html';

$('#type_econom').click();

$.ajax({
	type: "POST",
	url: 'php/biletos.php?t=get',
	data: {
		id: id,
	},
	success: function (info) {
		if(info == 'exist') {
			alert('Такого рейса не существует');
			window.location.href = 'index.html';
		}else{
			console.log(info);
			info = JSON.parse(info);
			console.log(info);

			let date_start = moment(info.time_departure),
				date_end = moment(info.time_arrival),
				date_diff = date_end.diff(date_start, 'hours') + ' ч. ' + date_end.diff(date_start, 'minutes') % 60 + ' мин.'

			$('div.h1.px-4.pb-4').html('Рейс ' + info.id);
			$('div.row.p-5.border.rounded span').eq(0).html(date_start.format('DD MMMM'));
			$('div.row.p-5.border.rounded span').eq(1).html(date_start.format('HH:MM'));
			$('div.row.p-5.border.rounded span').eq(2).html(info.from_city_id + '<br>' + info.from_airport_id);

			$('div.row.p-5.border.rounded span').eq(3).html(date_diff);

			$('div.row.p-5.border.rounded span').eq(4).html(date_end.format('DD MMMM'));
			$('div.row.p-5.border.rounded span').eq(5).html(date_end.format('HH:MM'));
			$('div.row.p-5.border.rounded span').eq(6).html(info.to_city_id + '<br>' + info.to_airport_id);

			$('tbody tr').eq(5).children().eq(1).html(info.price + '₽');
			$('tbody tr').eq(5).children().eq(2).html(Math.round(info.price*1.5) + '₽');
			$('tbody tr').eq(5).children().eq(3).html(Math.round(info.price*3) + '₽');

			$('.col-3 div').last().html(info.plane_id);

			$('#input_seats').attr('max', info.free_places)
		}
	}
});

if (account_id == null) {
	$('#buy').attr('data-target', '#SignINmodal');
	$('#buy').attr('data-toggle', 'modal');
	$('#buy').on('click', function (e) {
		e.preventDefault();
	});
} else {
	if(account_info.rank == 0) {
		$('#edit').hide();
		$('#delete').hide();

		$('#buy').on('click', function (e) {
			e.preventDefault();
			let type = 0;
			if ($('#type_econom').is(':checked')) type = 0;
			if ($('#type_optima').is(':checked')) type = 1;
			if ($('#type_premium').is(':checked')) type = 2;
			window.location.href = 'pay.html?t=' + id + '&a=' + type + '&m=' + $('#input_seats').val();
		});
	}else{
		$('#buy').hide();
		$('#input_seats').hide();
		$('.md-form.md-outline label').remove();
		$('.h4.ml-4.mt-4.pt-3').hide();

		$('#delete').on('click', function (e) {
			e.preventDefault();

			$.ajax({
				type: "POST",
				url: 'php/biletos.php?t=delete',
				data: {
					id: account_id,
					hash: account_hash,
					flight: id
				},
				success: function (info) {
					alert('Рейс успешно удален');
					window.location.href = 'search.html';
				}
			});
		});
	}

}