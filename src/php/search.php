<?php
	require('bitconnect.php');

	if($_GET['t'] == 'cities') {
		$query = "SELECT name FROM city";
		$result = mysqli_query($connection, $query);
		$city = [];
		while ($row = mysqli_fetch_assoc($result)) {
			array_push($city , $row['name']);
		}
		echo json_encode($city);
	}

	if($_GET['t'] == 'flights') {
		$where_from = $_POST['where_from'];
		$where_to = $_POST['where_to'];
		$date_start = $_POST['date_start'];
		$date_end = $_POST['date_end'];
		$seats = $_POST['seats'];
		$sort = $_POST['sort'];

		$filters = "free_places > 0";

		if($where_from != null) {
			$array = Query("SELECT id FROM city WHERE name LIKE '$where_from'");
			$where_from = $array['id'];
			$filters.=" AND from_city_id = '$where_from'";
		}
		if($where_to != null) {
			$array = Query("SELECT id FROM city WHERE name LIKE '$where_to'");
			$where_to = $array['id'];
			$filters.=" AND to_city_id = '$where_to'";
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

		$query = "SELECT id, name FROM city";
		$result = mysqli_query($connection, $query);
		$city = [];
		while ($row = mysqli_fetch_assoc($result)) {
			//array_push($city , $row['name']);
			$city[$row['id']] = $row['name'];
		}

		$query = "SELECT id, name FROM airport";
		$result = mysqli_query($connection, $query);
		$airport = [];
		while ($row = mysqli_fetch_assoc($result)) {
			//array_push($airport , $row['name']);
			$airport[$row['id']] = $row['name'];
		}

		$query = "SELECT * FROM flight WHERE " . $filters . $sort . ' LIMIT 200';
		$result = mysqli_query($connection, $query);
		$send = [];

		while ($row = mysqli_fetch_assoc($result)) {
			array_push($send , array(
				"id"=>$row['id'], 
				"from_city"=>$city[$row['from_city_id']],
				"from_airport"=>$airport[$row['from_airport_id']], 
				"to_city"=>$city[$row['to_city_id']],
				"to_airport"=>$airport[$row['to_airport_id']],
				"time_departure"=>$row['time_departure'],
				"time_arrival"=>$row['time_arrival'],
				"time_back"=>$row['time_back'],
				//"free_places"=>$row['free_places'],
				"price"=>$row['price']
			));
		}

		echo json_encode($send);
	}
?>