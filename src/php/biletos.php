<?php
	require('bitconnect.php');

	if($_GET['t'] == 'get') {
		$id = $_POST['id'];

		$array_flight = Query("SELECT * FROM flight WHERE id='$id'");

		if($array_flight == null) exit('exist');

		$from_city = $array_flight['from_city_id'];
		$from_airport = $array_flight['from_airport_id'];
		$to_city = $array_flight['to_city_id'];
		$to_airport = $array_flight['to_airport_id'];
		$plane_id = $array_flight['plane_id'];

		$array_from_city = Query("SELECT name FROM city WHERE id='$from_city'");
		$array_from_airport = Query("SELECT name FROM airport WHERE id='$from_airport'");
		$array_to_city = Query("SELECT name FROM city WHERE id='$to_city'");
		$array_to_airport = Query("SELECT name FROM airport WHERE id='$to_airport'");
		$array_plane = Query("SELECT model FROM plane WHERE id='$plane_id'");

		$array_flight['from_city_id'] = $array_from_city['name'];
		$array_flight['from_airport_id'] = $array_from_airport['name'];
		$array_flight['to_city_id'] = $array_to_city['name'];
		$array_flight['to_airport_id'] = $array_to_airport['name'];
		$array_flight['plane_id'] = $array_plane['model'];

		echo json_encode($array_flight);
	}

	if($_GET['t'] == 'delete') {
		$id = $_POST['id'];
		$hash = $_POST['hash'];
		$flight = $_POST['flight'];

		$array_user = Query("SELECT password, rank FROM user WHERE id='$id'");

		if(!password_verify($array_user['password'], $hash) || $array_user['rank'] == 0 || $flight == null) exit();

		$query = "DELETE FROM ticket WHERE flight_id = '$flight'";
		$result = mysqli_query($connection, $query);

		$query = "DELETE FROM flight WHERE id = '$flight'";
		$result = mysqli_query($connection, $query);
	}
?>