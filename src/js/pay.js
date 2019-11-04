let ticket_id = getURL('t'),
	ticket_type = getURL('a'),
	ticket_amount = getURL('m'),
	rt;

if (account_id == null || ticket_id == null || ticket_type == null || ticket_amount == null) window.location.href = 'index.html';

if(!isNaN(ticket_id)) {
	rt = 'flight';
	let type;
	if (ticket_type == 0) type = 'Эконом';
	if (ticket_type == 1) type = 'Оптимальный';
	if (ticket_type == 2) type = 'Премиум';

	$('#type_pay').html('Покупка билета на рейс ' + ticket_id);
	$('#type_a').html('Тип билета: ' + type);

	$.ajax({
		type: "POST",
		url: 'php/pay.php?t=get',
		data: {
			id: account_id,
			hash: account_hash,
			flight: ticket_id
		},
		success: function (info) {
			if(info == 'user'){
				window.location.href = 'logout.html';
			}else if(info == 'exist') {
				alert('Такого рейса не существует');
				window.location.href = 'index.html';
			}else{
				info = JSON.parse(info);
				if (ticket_type == 1) info.price *= 1.5;
				if (ticket_type == 2) info.price *= 3;
				
				let html = 'Цена: ' + (info.price * ticket_amount) + ' ₽';
				if (ticket_amount > 1) html += ' (' + info.price + ' ₽ x ' + ticket_amount + ' места)';
				$('#type_price').html(html);

				$('#panel13 .md-form.md-outline.my-auto').html('У вас на счету ' + info.money + ' гривен');
			}
		}
	});
}else{
	rt = 'money';
}

$('button.btn-primary').on('click', function() {
	let p = 0
	if($('ul .nav-link.active').attr('href') == '#panel13') p = 1;

	$.ajax({
		type: "POST",
		url: 'php/pay.php?t=' + rt,
		data: {
			id: account_id,
			hash: account_hash,
			t: ticket_id,
			a: ticket_type,
			m: ticket_amount,
			p: p
		},
		success: function (info) {
			//console.log(info);
			if (info == 'rank') alert('Администраторам нельзя совершать покупки');
			if (info == 'funds') alert('Недостаточно гривен для покупки билета');
			if (info == 'places') alert('Не достаточо свободных мест на рейсе');
			if (info == 'already') alert('Этот рейс уже куплен');
			if (info == 'bought') { alert('Билет успешно куплен'); window.location.href = 'profile.html'}
		}
	});
});
