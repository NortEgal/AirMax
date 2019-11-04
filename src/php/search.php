<?php
	require('bitconnect.php');

	$where_from = $_POST['where_from'];
	$where_to = $_POST['where_to'];
	$date_start = $_POST['date_start'];
	$date_end = $_POST['date_end'];
	$seats = $_POST['seats'];
	$sort = $_POST['sort'];

	$filters = "free_places > 0";

	if($where_from != null) {
		$array = Query("SELECT id FROM city WHERE city LIKE '$where_from'");
		$where_from = $array['id'];
		$filters.=" AND city_id_from = '$where_from'";
	}
	if($where_to != null) {
		$array = Query("SELECT id FROM city WHERE city LIKE '$where_to'");
		$where_to = $array['id'];
		$filters.=" AND city_id_to = '$where_to'";
	}
	if (strtotime($date_start)) {
		$date_start = date ("Y-m-d H:i:s", strtotime($date_start));
		$filters.= " AND time_departure >= '$date_start'";
	}
	if (strtotime($date_end)) {
		$date_end = date ("Y-m-d H:i:s", strtotime($date_end));
		$filters.= " AND time_back <= '$date_end'";
	}
	if (is_numeric($seats)) {
		$filters.= " AND free_places >= '$seats'";
	}
	if($sort == 1) {
		$sort = ' ORDER BY price ASC';
	}else{
		$sort = ' ORDER BY time_departure DESC';
	}

	$query = "SELECT city, airport FROM city";
	$result = mysqli_query($connection, $query);
	$city = [];

	while ($row = mysqli_fetch_assoc($result)) {
		array_push($city , array(
			'city'=>$row['city'],
			'airport'=>$row['airport']
		));
	}

	$query = "SELECT * FROM flight WHERE " . $filters . $sort . ' LIMIT 5';
	$result = mysqli_query($connection, $query);
	$send = [];

	while ($row = mysqli_fetch_assoc($result)) {
		array_push($send , array(
			"id"=>$row['id'], 
			"from_city"=>$city[$row['city_id_from']]['city'],
			"from_airport"=>$city[$row['city_id_from']]['airport'], 
			"to_city"=>$city[$row['city_id_to']]['city'],
			"to_airport"=>$city[$row['city_id_to']]['airport'],
			"time_departure"=>$row['time_departure'],
			"time_arrival"=>$row['time_arrival'],
			"time_back"=>$row['time_back'],
			//"free_places"=>$row['free_places'],
			"price"=>$row['price']
		));
	}
	echo json_encode($send);
	//echo $query;
?>