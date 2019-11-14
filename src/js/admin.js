if (account_id == null || account_info.rank == 0) window.location.href = 'index.html';

$(document).ready(function () {
	$.ajax({
		async: false,
		url: "js/libs/jquery.tabledit.min.js",
		dataType: "script"
	});

	let td_temp = $('table#flight tbody td');
	td_temp.remove();
	let tr_temp = $('table#flight tbody tr');
	console.log(tr_temp);
	tr_temp.remove();

	if (account_info.rank != 2) 
	{
		$("#users-table-tab").remove();
		$("#users-table").remove();
	}else{
		
	}

	$('#flight-table-tab').click(function () {
		$.ajax({
			type: "POST",
			url: 'php/admin.php?t=flight_get',
			data: {
				id: account_id,
				hash: account_hash
			},
			success: function (info) {
				//console.log(info);
				info = JSON.parse(info);
				console.log(info);

				let body = $('table#flight tbody');
				body.empty();

				$.each(info, function (i, row) {
					new_row = tr_temp.clone();
					td_temp.clone().appendTo(new_row).html(row.id);
					td_temp.clone().appendTo(new_row).html(row.plane_id);
					td_temp.clone().appendTo(new_row).html(row.from_city_id);
					td_temp.clone().appendTo(new_row).html(row.from_airport_id);
					td_temp.clone().appendTo(new_row).html(row.to_city_id);
					td_temp.clone().appendTo(new_row).html(row.to_airport_id);
					td_temp.clone().appendTo(new_row).html(row.time_departure);
					td_temp.clone().appendTo(new_row).html(row.time_arrival);
					td_temp.clone().appendTo(new_row).html(row.time_back);
					td_temp.clone().appendTo(new_row).html(row.free_places);
					td_temp.clone().appendTo(new_row).html(row.price);
					body.append(new_row);
				});

				$('table#flight').Tabledit({
					url: 'php/admin.php?t=flight_edit?',
					columns: {
						identifier: [0, 'id'],
						editable: [
							[1, 'plane_id'], 
							[2, 'from_city_id'], 
							[3, 'from_airport_id'], 
							[4, 'to_city_id'], 
							[5, 'to_airport_id'], 
							[6, 'time_departure'], 
							[7, 'time_arrival'], 
							[8, 'time_back'], 
							[9, 'free_places'], 
							[10, 'price']
						]
					},
					restoreButton: false,
					//editButton: false,
					buttons: {
						edit: {
							class: 'btn btn-sm btn-blue',
							html: '<i class="material-icons my-auto">edit</i>',
							action: 'edit'
						},
						delete: {
							class: 'btn btn-sm btn-danger',
							html: '<i class="material-icons my-auto">delete</i>',
							action: 'delete'
						},
						save: {
							class: 'btn btn-sm btn-success',
							html: '<i class="material-icons my-auto">done</i>'
						},
						confirm: {
							class: 'btn btn-sm btn-warning',
							html: 'Подтвердить'
						}
					},
					onAjax: function (action, serialize) {
						console.log('onAjax(action, serialize)');
						console.log(action);
						console.log(serialize);
					},
					onSuccess: function (data, textStatus, jqXHR) {
						console.log('onSuccess(data, textStatus, jqXHR)');
						console.log(data);
						console.log(textStatus);
						console.log(jqXHR);
					},
				});
			}
		});
	});
});