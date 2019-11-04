<?php
	require('bitconnect.php');

	if($_GET['t'] == 'get') {
		$id = $_POST['id'];
		$hash = $_POST['hash'];

		$array = Query("SELECT password, money FROM user WHERE id='$id'");

		if(!password_verify($array['password'], $hash)) exit('user');

		$flight = $_POST['flight'];
		$array_flight = Query("SELECT price FROM flight WHERE id='$flight'");

		if($array_flight == null) exit('exist');

		$send = [
			"price"=>$array_flight['price'],
			"money"=>$array['money']
		];

		echo json_encode($send);
	}

	if($_GET['t'] == 'flight') {
		$id = $_POST['id'];
		$hash = $_POST['hash'];

		$array_user = Query("SELECT password, rank, money FROM user WHERE id='$id'");

		$ticket_id = $_POST['t'];
		$ticket_type = $_POST['a'];
		$ticket_amount = $_POST['m'];
		$pay = $_POST['p'];

		if(!password_verify($array_user['password'], $hash) || !is_numeric($ticket_id) || !is_numeric($ticket_type) || !is_numeric($ticket_amount) || !is_numeric($pay)) exit();
		if($array_user['rank'] != 0) exit('rank');

		$array = Query("SELECT free_places FROM flight");
		if($array['free_places'] == 0 || $array['free_places'] < $ticket_amount) exit('places');
		
		$array = Query("SELECT flight_id, type FROM ticket WHERE flight_id = '$ticket_id' and type = '$ticket_type'");
		if($array != null) exit('already');

		$array_flight = Query("SELECT price FROM flight WHERE id='$ticket_id'");

		$money = $array_user['money'];
		$price = $array_flight['price'];
		if($ticket_type == 1) $price *= 1.5;
		if($ticket_type == 2) $price *= 3.0;
		$price = round($price);

		if($pay == 0) {
			$money+=round($price*0.3);
		}else {
			if($money < $price) exit('funds');
			$money-=$price;
		}

		$query = "UPDATE user SET money = '$money' WHERE id='$id'";
		$result = mysqli_query($connection, $query);

		$query = "INSERT INTO ticket (flight_id, user_id, type, amount) 
		VALUES('$ticket_id', '$id', '$ticket_type', '$ticket_amount')";
		$result = mysqli_query($connection, $query);

		exit('bought');
	}
?>