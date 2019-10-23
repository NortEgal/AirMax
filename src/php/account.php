<?php
	require('bitconnect.php');
	
	if($_GET['t'] == 'check'){
		$id = $_POST['id'];
		$hash = $_POST['hash'];

		$query = "SELECT password FROM user WHERE id='$id'";
		$result = mysqli_query($connection, $query);
		$array = mysqli_fetch_row($result);
		echo password_verify($array[0], $hash);
	}

	if($_GET['t'] == 'set'){
		if($update_field) {
			$query = "UPDATE usertbl SET $update_field WHERE username='$username'";
			mysqli_query($connection, $query) or die(mysqli_error($connection));
		}
	}
?>