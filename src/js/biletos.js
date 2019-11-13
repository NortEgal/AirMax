let id = getURL('t');
if (id == null) window.location.href = 'index.html';

$('#type_econom').click();

let date_start, date_end, date_back;

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
			//console.log(info);
			info = JSON.parse(info);
			console.log(info);

			date_start = moment(info.time_departure);
			date_end = moment(info.time_arrival);
			date_back = moment(info.time_back);
			let date_diff = date_end.diff(date_start, 'hours') + ' ч. ' + date_end.diff(date_start, 'minutes') % 60 + ' мин.';

			$('div.h1.px-4.pb-4').html('Рейс ' + info.id);
			$('div.row.p-5.border.rounded span').eq(0).html(date_start.format('DD MMMM'));
			$('div.row.p-5.border.rounded span').eq(1).html(date_start.format('HH:MM'));
			$('div.row.p-5.border.rounded span').eq(2).html(info.from_city + '<br>' + info.from_airport);

			$('div.row.p-5.border.rounded span').eq(3).html(date_diff);

			$('div.row.p-5.border.rounded span').eq(4).html(date_end.format('DD MMMM'));
			$('div.row.p-5.border.rounded span').eq(5).html(date_end.format('HH:MM'));
			$('div.row.p-5.border.rounded span').eq(6).html(info.to_city + '<br>' + info.to_airport);

			$('tbody tr').eq(5).children().eq(1).html(info.price + '₽');
			$('tbody tr').eq(5).children().eq(2).html(Math.round(info.price*1.5) + '₽');
			$('tbody tr').eq(5).children().eq(3).html(Math.round(info.price*3) + '₽');

			$('.col-3 div').last().html(info.plane_id);

			$('#input_seats').attr('max', info.free_places)

			$('#formAirportFrom').val(info.from_airport_id+' - '+info.from_city+' - '+info.from_airport);
			$('#formAirportTo').val(info.to_airport_id + ' - ' + info.to_city + ' - ' + info.to_airport);
			$('#input_time1').val(moment(date_start).format('YYYY-MM-DD HH:MM'));
			$('#input_time2').val(moment(date_end).format('YYYY-MM-DD HH:MM'));
			if (date_back != 'Invalid date') $('#input_time3').val(moment(date_back).format('YYYY-MM-DD HH:MM'));
			$('#formPlaneModel').val(info.plane_id);
			$('#formFreePlaces').val(info.free_places);
			$('#formPrices').val(info.price);
			$('#form_price_optimal').html('Цена оптимального (X 1.5): ' + Math.round(info.price * 1.5) + '₽');
			$('#form_price_premium').html('Цена премиум (X 3): ' + Math.round(info.price * 3) + '₽');
		}
	}
});

if (account_id == null) {
	$('#edit').hide();
	$('#delete').hide();
	$('#input_seats').hide();
	$('.md-form.md-outline label').remove();
	$('.h4.ml-4.mt-4.pt-3').hide();

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

let edit_airports, edit_planes;

$('#edit').on('click', function () {
	if(edit_airports == null){
		$.ajax({
			//async: false,
			type: "GET",
			url: 'php/search.php?t=airports',
			success: function (info) {
				//console.log(info);
				edit_airports = JSON.parse(info);
				console.log(edit_airports);

				$('#formAirportFrom').mdbAutocomplete({
					data: edit_airports
				});
				$('#formAirportTo').mdbAutocomplete({
					data: edit_airports
				});
			}
		});
	}
	if (edit_planes == null) {
		$.ajax({
			//async: false,
			type: "GET",
			url: 'php/search.php?t=planes',
			success: function (info) {
				//console.log(info);
				edit_planes = JSON.parse(info);
				console.log(edit_planes);

				$('#formPlaneModel').mdbAutocomplete({
					data: edit_planes
				});
			}
		});
	}
});

$('input[name="calendar1"]').on('change', function() {
	var value = moment(this.value).format('YYYY-MM-DD HH:MM');
	if (value != 'Invalid date') this.value = value; else this.value = moment(date_start).format('YYYY-MM-DD HH:MM');
});
$('input[name="calendar2"]').on('change', function () {
	var value = moment(this.value).format('YYYY-MM-DD HH:MM');
	if (value != 'Invalid date') this.value = value; else this.value = moment(date_end).format('YYYY-MM-DD HH:MM');
});
$('input[name="calendar3"]').on('change', function () {
	var value = moment(this.value).format('YYYY-MM-DD HH:MM');
	if (value != 'Invalid date') this.value = value; else this.value = moment(date_back).format('YYYY-MM-DD HH:MM');
});

$('#formPrices').on('change', function () {
	let price = this.value;
	if(isNaN(price)) price = 0;
	$('#form_price_optimal').html('Цена оптимального (X 1.5): ' + Math.round(price * 1.5) + '₽');
	$('#form_price_premium').html('Цена премиум (X 3): ' + Math.round(price * 3) + '₽');
});

$('#edit_form').on('submit', function (e) {
	e.preventDefault();

	$.ajax({
		type: "POST",
		url: 'php/biletos.php?t=edit',
		data: {
			id: account_id,
			hash: account_hash,
			flight: id,
			from: $('#formAirportFrom').val(),
			to: $('#formAirportTo').val(),
			time_departure: $('#input_time1').val(),
			time_arrival: $('#input_time2').val(),
			time_back: $('#input_time3').val(),
			plane: $('#formPlaneModel').val(),
			places: $('#formFreePlaces').val(),
			price: $('#formPrices').val()
		},
		success: function (info) {
			console.log(info);

			if(info == 'nice') {
				alert('Данные успешно обновлены');
				window.location.reload();
			}else{
				alert('Введены некорректные данные');
			}
		}
	});
});