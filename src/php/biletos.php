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

		$array_flight['from_city'] = $array_from_city['name'];
		$array_flight['from_airport'] = $array_from_airport['name'];
		$array_flight['to_city'] = $array_to_city['name'];
		$array_flight['to_airport'] = $array_to_airport['name'];
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

	if($_GET['t'] == 'edit') {
		$id = $_POST['id'];
		$hash = $_POST['hash'];
		$flight = $_POST['flight'];

		$array_user = Query("SELECT password, rank FROM user WHERE id='$id'");
		if(!password_verify($array_user['password'], $hash) || $array_user['rank'] == 0 || $flight == null) exit();

		$from = preg_replace('/\D/', '', $_POST['from']);
		$to = preg_replace('/\D/', '', $_POST['to']);
		$time_departure = $_POST['time_departure'];
		$time_arrival = $_POST['time_arrival'];
		$time_back = $_POST['time_back'];
		$plane = $_POST['plane'];
		$places = $_POST['places'];
		$price = $_POST['price'];

		$array = Query("SELECT city_id FROM airport WHERE id = '$from'");
		if($array == null) exit();
		$from_city = $array['city_id'];

		$array = Query("SELECT city_id FROM airport WHERE id = '$to'");
		if($array == null) exit();
		$to_city = $array['city_id'];

		$array = Query("SELECT id, seats FROM plane WHERE model LIKE '$plane'");
		if($array == null) exit();
		$plane_id = $array['id'];
		if($array['seats'] > $places) $places = $array['seats'];

		$query = "UPDATE flight SET 
		plane_id = '$plane_id',
		from_city_id = '$from_city',
		from_airport_id = '$from',
		to_city_id = '$to_city',
		to_airport_id = '$to',
		time_departure = '$time_departure',
		time_arrival = '$time_arrival',
		time_back = '$time_back',
		free_places = '$places',
		price = '$price'
		WHERE id='$flight'";
		$result = mysqli_query($connection, $query);

		exit('nice');
	}

// id
// plane_id
// from_city_id
// from_airport_id
// to_city_id
// to_airport_id
// time_departure
// time_arrival
// time_back
// free_places
// price
?>