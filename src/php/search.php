<?php
	require('bitconnect.php');

	$where_from = $_POST['where_from'];
	$where_to = $_POST['where_to'];
	$date_start = $_POST['date_start'];
	$date_end = $_POST['date_end'];
	$seats = $_POST['seats'];
	$sort = $_POST['sort'];

	$filters = "free_places > 0";

	if($where_from != null) $filters.=" AND where_from LIKE '$where_from'";
	if($where_to != null) $filters.=" AND where_to LIKE '$where_to'";
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

	$query = "SELECT * FROM flight WHERE " . $filters . $sort;
	$result = mysqli_query($connection, $query);
	$array = mysqli_fetch_assoc($result);
	$send = [];
	while ($row = mysqli_fetch_assoc($result)) {
		array_push($send , array(
			"id"=>$row['id'], 
			"where_from"=>$row['where_from'], 
			"where_to"=>$row['where_to'],
			"time_departure"=>$row['time_departure'],
			"time_arrival"=>$row['time_arrival'],
			//"time_back"=>$row['time_back'],
			//"free_places"=>$row['free_places'],
			"price"=>$row['price']
		));
	}
	echo json_encode($send);
	//echo $query;
?>