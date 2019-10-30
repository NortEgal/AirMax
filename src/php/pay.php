<?php
	require('bitconnect.php');

	$id = $_POST['id'];
	$hash = $_POST['hash'];
	$query = "SELECT password FROM user WHERE id='$id'";
	$result = mysqli_query($connection, $query);
	$array = mysqli_fetch_row($result);

	$t = $_POST['t'];
	if(is_numeric($t) && password_verify($array[0], $hash)) {
		$query = "SELECT flights FROM user WHERE id='$id'";
		$result = mysqli_query($connection, $query);
		$array = mysqli_fetch_row($result);

		$flights = json_decode($array[0]);
		if(!in_array ($t, $flights)) {
			array_push($flights, $t);
			$flights = json_encode($flights);

			$query = $query = "UPDATE user SET flights = '$flights' WHERE id='$id'";
			$result = mysqli_query($connection, $query);

			//echo $flights;
			echo 'bought';
		}else{
			echo 'already';
		}
	}
?>