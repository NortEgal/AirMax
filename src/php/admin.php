<?php
	require('bitconnect.php');

	if($_GET['t'] == 'flight_get') {
		$id = $_POST['id'];
		$hash = $_POST['hash'];

		$array = Query("SELECT password, rank FROM user WHERE id='$id'");

		if(!password_verify($array['password'], $hash) || $array['rank'] == 0) exit();

		$query = "SELECT * FROM flight";
		$result = mysqli_query($connection, $query);
		$send = [];

		while ($row = mysqli_fetch_assoc($result)) {
			array_push($send , array(
				"id"=>$row['id'],
				"plane_id"=>$row['plane_id'], 
				"from_city_id"=>$row['from_city_id'],
				"from_airport_id"=>$row['from_airport_id'],
				"to_city_id"=>$row['to_city_id'],
				"to_airport_id"=>$row['to_airport_id'],
				"time_departure"=>$row['time_departure'],
				"time_arrival"=>$row['time_arrival'],
				"time_back"=>$row['time_back'],
				"free_places"=>$row['free_places'],
				"price"=>$row['price']
			));
		}

		echo json_encode($send);
	}

	if($_GET['t'] == 'flight_edit') {
		$input = filter_input_array(INPUT_POST);

		echo $input['action'];
	}
?>