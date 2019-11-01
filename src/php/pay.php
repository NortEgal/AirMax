<?php
	require('bitconnect.php');

	if($_GET['t'] == 'get') {
		$id = $_POST['id'];
		$hash = $_POST['hash'];

		$query = "SELECT password, money FROM user WHERE id='$id'";
		$result = mysqli_query($connection, $query);
		$array = mysqli_fetch_row($result);

		if(!password_verify($array[0], $hash)) exit();

		$flight = $_POST['flight'];

		$query = "SELECT price FROM flight WHERE id='$flight'";
		$result = mysqli_query($connection, $query);
		$array_flight = mysqli_fetch_row($result);

		if($array_flight == null) exit('exist');

		$send = [
			"price"=>$array_flight[0],
			"money"=>$array[1]
		];

		echo json_encode($send);
	}

	if($_GET['t'] == 'flight') {
		$id = $_POST['id'];
		$hash = $_POST['hash'];

		$query = "SELECT password, flights, money FROM user WHERE id='$id'";
		$result = mysqli_query($connection, $query);
		$array = mysqli_fetch_assoc($result);

		$t = $_POST['t'];
		$a = $_POST['a'];
		$p = $_POST['p'];

		if(!password_verify($array['password'], $hash) || !is_numeric($t) || !is_numeric($a) || !is_numeric($p)) exit();

		$send = [
			'id'=>$t,
			'type'=>$a
		];

		if($array['flights'] == '') {
			$flights = [];
			array_push($flights, $send);
			$flights = json_encode($flights);
		}else{
			$flights = json_decode($array['flights']);

			foreach ($flights as $row) {
				if ($row->id == $t) {
					exit('already');
				}
			}

			array_push($flights, $send);
			$flights = json_encode($flights);
		}

		$query = "SELECT price FROM flight WHERE id='$t'";
		$result = mysqli_query($connection, $query);
		$array_flight = mysqli_fetch_row($result);

		$money = $array['money'];
		$price = $array_flight[0];
		if($a == 1) $price *= 1.5;
		if($a == 2) $price *= 3.0;
		$price = round($price);

		if($p == 0) {
			$money+=round($price*0.3);
		}else {
			if($money < $price) exit('funds');
			$money-=$price;
		}

		$query = $query = "UPDATE user SET flights = '$flights', money = '$money' WHERE id='$id'";
		$result = mysqli_query($connection, $query);

		exit('bought');
	}
?>