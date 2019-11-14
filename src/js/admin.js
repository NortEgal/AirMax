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

	/*
		USER
	*/
	if (account_info.rank != 2) 
	{
		$("#users-table-tab").remove();
		$("#users-table").remove();
	}else{
		$('#users-table-tab').click(function () {
			$.ajax({
				type: "POST",
				url: 'php/admin.php?t=user_get',
				data: {
					id: account_id,
					hash: account_hash
				},
				success: function (info) {
					//console.log(info);
					info = JSON.parse(info);
					console.log(info);

					let body = $('table#user tbody');
					body.empty();

					$.each(info, function (i, row) {
						new_row = tr_temp.clone();
						td_temp.clone().appendTo(new_row).html(row.id);
						td_temp.clone().appendTo(new_row).html(row.lastname);
						td_temp.clone().appendTo(new_row).html(row.firstname);
						td_temp.clone().appendTo(new_row).html(row.patronymic);
						td_temp.clone().appendTo(new_row).html(row.mail);
						td_temp.clone().appendTo(new_row).html(row.password);
						td_temp.clone().appendTo(new_row).html(row.phone);
						td_temp.clone().appendTo(new_row).html(row.passport);
						td_temp.clone().appendTo(new_row).html(row.money);
						td_temp.clone().appendTo(new_row).html(row.rank);
						body.append(new_row);
					});

					$('table#user').Tabledit({
						url: 'php/admin.php?t=user_edit',
						columns: {
							identifier: [0, 'id'],
							editable: [
								[1, 'lastname'],
								[2, 'firstname'],
								[3, 'patronymic'],
								[4, 'mail'],
								[5, 'password'],
								[6, 'phone'],
								[7, 'passport'],
								[8, 'money'],
								[9, 'rank']
							]
						},
						restoreButton: false,
						editButton: false,
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
						onFail: function (jqXHR, textStatus, errorThrown) {
							$('#users-table-tab').click();
						},
						onSuccess: function (data, textStatus, jqXHR) {
							$('#users-table-tab').click();
						},
					});
				}
			});
		});

		$('button#add_user').on('click', function() {
			$.ajax({
				type: "POST",
				url: 'php/admin.php?t=user_add',
				data: {
					id: account_id,
					hash: account_hash
				},
				success: function (info) {
					$('#users-table-tab').click();
				}
			});
		});
	}

	/*
		FLIGHT
	*/
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
					url: 'php/admin.php?t=flight_edit',
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
					editButton: false,
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
					onFail: function (jqXHR, textStatus, errorThrown) {
						$('#flight-table-tab').click();
					},
					onSuccess: function (data, textStatus, jqXHR) {
						$('#flight-table-tab').click();
					},
				});
			}
		});
	});

	$('#adminAddFlight input[name="calendar1"]').on('change', function () {
		var value = moment(this.value).format('YYYY-MM-DD HH:MM');
		if (value != 'Invalid date') this.value = value; 
	});
	$('#adminAddFlight input[name="calendar2"]').on('change', function () {
		var value = moment(this.value).format('YYYY-MM-DD HH:MM');
		if (value != 'Invalid date') this.value = value;
	});
	$('#adminAddFlight input[name="calendar3"]').on('change', function () {
		var value = moment(this.value).format('YYYY-MM-DD HH:MM');
		if (value != 'Invalid date') this.value = value;
	});

	$('#adminAddFlight #price').on('change', function () {
		let price = this.value;
		if (isNaN(price)) price = 0;
		$('#adminAddFlight #price_optimal').html('Цена оптимального (X 1.5): ' + Math.round(price * 1.5) + '₽');
		$('#adminAddFlight #price_premium').html('Цена премиум (X 3): ' + Math.round(price * 3) + '₽');
	});

	$('#adminAddFlight').on('submit', function(e) {
		e.preventDefault();

		$.ajax({
			type: "POST",
			url: 'php/admin.php?t=flight_add',
			data: {
				id: account_id,
				hash: account_hash,
				plane_id: $('#adminAddFlight #plane_id').val(),
				from_city_id: $('#adminAddFlight #from_city_id').val(),
				from_airport_id: $('#adminAddFlight #from_airport_id').val(),
				to_city_id: $('#adminAddFlight #to_city_id').val(),
				to_airport_id: $('#adminAddFlight #to_airport_id').val(),
				time_departure: $('#adminAddFlight #input_time1').val(),
				time_arrival: $('#adminAddFlight #input_time2').val(),
				time_back: $('#adminAddFlight #input_time3').val(),
				free_places: $('#adminAddFlight #free_places').val(),
				price: $('#adminAddFlight #price').val()
			},
			success: function (info) {
				console.log(info);

				if (!isNaN(info)) {
					alert('Рейс ' + info + ' успешно добавлен');
					$('#adminAddFlight').modal('hide');
					$('#flight-table-tab').click();
				}
			}
		});
	});

	/*
		TICKET
	*/
	$('#ticket-table-tab').click(function () {
		$.ajax({
			type: "POST",
			url: 'php/admin.php?t=ticket_get',
			data: {
				id: account_id,
				hash: account_hash
			},
			success: function (info) {
				//console.log(info);
				info = JSON.parse(info);
				console.log(info);

				let body = $('table#ticket tbody');
				body.empty();

				$.each(info, function (i, row) {
					new_row = tr_temp.clone();
					td_temp.clone().appendTo(new_row).html(row.id);
					td_temp.clone().appendTo(new_row).html(row.flight_id);
					td_temp.clone().appendTo(new_row).html(row.user_id);
					td_temp.clone().appendTo(new_row).html(row.type);
					td_temp.clone().appendTo(new_row).html(row.amount);
					body.append(new_row);
				});

				$('table#ticket').Tabledit({
					url: 'php/admin.php?t=ticket_edit',
					columns: {
						identifier: [0, 'id'],
						editable: [
							[1, 'flight_id'],
							[2, 'user_id'],
							[3, 'type'],
							[4, 'amount']
						]
					},
					restoreButton: false,
					editButton: false,
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
					onFail: function (jqXHR, textStatus, errorThrown) {
						$('#ticket-table-tab').click();
					},
					onSuccess: function (data, textStatus, jqXHR) {
						$('#ticket-table-tab').click();
					},
				});
			}
		});
	});

	$('button#add_ticket').on('click', function () {
		$.ajax({
			type: "POST",
			url: 'php/admin.php?t=ticket_add',
			data: {
				id: account_id,
				hash: account_hash
			},
			success: function (info) {
				$('#ticket-table-tab').click();
			}
		});
	});

	/*
		PLANE
	*/
	$('#plane-table-tab').click(function () {
		$.ajax({
			type: "POST",
			url: 'php/admin.php?t=plane_get',
			data: {
				id: account_id,
				hash: account_hash
			},
			success: function (info) {
				//console.log(info);
				info = JSON.parse(info);
				console.log(info);

				let body = $('table#plane tbody');
				body.empty();

				$.each(info, function (i, row) {
					new_row = tr_temp.clone();
					td_temp.clone().appendTo(new_row).html(row.id);
					td_temp.clone().appendTo(new_row).html(row.model);
					td_temp.clone().appendTo(new_row).html(row.seats);
					td_temp.clone().appendTo(new_row).html(row.sheme);
					body.append(new_row);
				});

				$('table#plane').Tabledit({
					url: 'php/admin.php?t=plane_edit',
					columns: {
						identifier: [0, 'id'],
						editable: [
							[1, 'model'],
							[2, 'seats'],
							[3, 'sheme']
						]
					},
					restoreButton: false,
					editButton: false,
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
					onFail: function (jqXHR, textStatus, errorThrown) {
						$('#plane-table-tab').click();
					},
					onSuccess: function (data, textStatus, jqXHR) {
						$('#plane-table-tab').click();
					},
				});
			}
		});
	});

	$('button#add_plane').on('click', function () {
		$.ajax({
			type: "POST",
			url: 'php/admin.php?t=plane_add',
			data: {
				id: account_id,
				hash: account_hash
			},
			success: function (info) {
				$('#plane-table-tab').click();
			}
		});
	});

	/*
		CITY
	*/
	$('#city-table-tab').click(function () {
		$.ajax({
			type: "POST",
			url: 'php/admin.php?t=city_get',
			data: {
				id: account_id,
				hash: account_hash
			},
			success: function (info) {
				//console.log(info);
				info = JSON.parse(info);
				console.log(info);

				let body = $('table#city tbody');
				body.empty();

				$.each(info, function (i, row) {
					new_row = tr_temp.clone();
					td_temp.clone().appendTo(new_row).html(row.id);
					td_temp.clone().appendTo(new_row).html(row.name);
					td_temp.clone().appendTo(new_row).html(row.img);
					body.append(new_row);
				});

				$('table#city').Tabledit({
					url: 'php/admin.php?t=city_edit',
					columns: {
						identifier: [0, 'id'],
						editable: [
							[1, 'name'],
							[2, 'img']
						]
					},
					restoreButton: false,
					editButton: false,
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
					onFail: function (jqXHR, textStatus, errorThrown) {
						$('#city-table-tab').click();
					},
					onSuccess: function (data, textStatus, jqXHR) {
						$('#city-table-tab').click();
					},
				});
			}
		});
	});

	$('button#add_city').on('click', function () {
		$.ajax({
			type: "POST",
			url: 'php/admin.php?t=city_add',
			data: {
				id: account_id,
				hash: account_hash
			},
			success: function (info) {
				$('#city-table-tab').click();
			}
		});
	});

	/*
		AIRPORT
	*/
	$('#airport-table-tab').click(function () {
		$.ajax({
			type: "POST",
			url: 'php/admin.php?t=airport_get',
			data: {
				id: account_id,
				hash: account_hash
			},
			success: function (info) {
				//console.log(info);
				info = JSON.parse(info);
				console.log(info);

				let body = $('table#airport tbody');
				body.empty();

				$.each(info, function (i, row) {
					new_row = tr_temp.clone();
					td_temp.clone().appendTo(new_row).html(row.id);
					td_temp.clone().appendTo(new_row).html(row.city_id);
					td_temp.clone().appendTo(new_row).html(row.name);
					body.append(new_row);
				});

				$('table#airport').Tabledit({
					url: 'php/admin.php?t=airport_edit',
					columns: {
						identifier: [0, 'id'],
						editable: [
							[1, 'city_id'],
							[2, 'name']
						]
					},
					restoreButton: false,
					editButton: false,
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
					onFail: function (jqXHR, textStatus, errorThrown) {
						$('#airport-table-tab').click();
					},
					onSuccess: function (data, textStatus, jqXHR) {
						$('#airport-table-tab').click();
					},
				});
			}
		});
	});

	$('button#add_airport').on('click', function () {
		$.ajax({
			type: "POST",
			url: 'php/admin.php?t=airport_add',
			data: {
				id: account_id,
				hash: account_hash
			},
			success: function (info) {
				$('#airport-table-tab').click();
			}
		});
	});
});