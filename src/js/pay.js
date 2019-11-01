let t = getURL('t'),
	a = getURL('a'),
	rt;

if (account_id == null || t == null || a == null) window.location.href = 'index.html';

if(!isNaN(t)) {
	rt = 'flight';
	let type;
	if (a == 0) type = 'Эконом';
	if (a == 1) type = 'Оптимальный';
	if (a == 2) type = 'Премиум';

	$('#type_pay').html('Покупка билета на рейс '+ t);
	$('#type_a').html('Тип билета: ' + type);

	$.ajax({
		type: "POST",
		url: 'php/pay.php?t=get',
		data: {
			id: account_id,
			hash: account_hash,
			flight: t
		},
		success: function (info) {
			if(info == 'exist') {
				alert('Такого рейса не существует');
				window.location.href = 'index.html';
			}else{
				info = JSON.parse(info);
				if (a == 1) info.price *= 1.5;
				if (a == 2) info.price *= 3;
				$('#type_price').html('Цена: ' + info.price + ' ₽');

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
			t: t,
			a: a,
			p: p
		},
		success: function (info) {
			//console.log(info);
			if (info == 'funds') alert('Недостаточно гривен для покупки билета');
			if (info == 'already') alert('Этот рейс уже куплен');
			if (info == 'bought') { alert('Билет успешно куплен'); window.location.href = 'profile.html'; }
			if (info == 'grivni') { alert('Гринвы успешно приобретены'); window.location.href = 'profile.html'; }
		}
	});
});
