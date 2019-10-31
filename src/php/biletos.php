<?php
	require('bitconnect.php');

	$id = $_POST['id'];

	$query = "SELECT * FROM flight WHERE id='$id'";
	$result = mysqli_query($connection, $query);
	$array_flight = mysqli_fetch_assoc($result);

	if($array_flight == null) exit();

	$plane_id = $array_flight['plane_id'];

	$query = "SELECT * FROM plane WHERE id='$plane_id'";
	$result = mysqli_query($connection, $query);
	$array_plane = mysqli_fetch_assoc($result);

	$array_flight['plane_id'] = $array_plane['model'];

	echo json_encode($array_flight);
?>