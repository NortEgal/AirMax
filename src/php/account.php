<?php
	require('bitconnect.php');
	
	if($_GET['t'] == 'check'){
		$id = $_POST['id'];
		$hash = $_POST['hash'];

		$query = "SELECT password, rank FROM user WHERE id='$id'";
		$result = mysqli_query($connection, $query);
		$array = mysqli_fetch_row($result);

		if(password_verify($array[0], $hash)) {
			echo $array[1];
		}else {
			echo 'lox';
		}
	}

	if($_GET['t'] == 'get'){
		$id = $_POST['id'];
		$hash = $_POST['hash'];

		$query = "SELECT password FROM user WHERE id='$id'";
		$result = mysqli_query($connection, $query);
		$array = mysqli_fetch_row($result);

		if(password_verify($array[0], $hash)) {
			$query = "SELECT * FROM user WHERE id='$id'";
			$result = mysqli_query($connection, $query);
			$array = mysqli_fetch_row($result);
			echo json_encode($array);
		}else {
			echo false;
		}
	}

	if($_GET['t'] == 'set'){
		// if($update_field) {
		// 	$query = "UPDATE usertbl SET $update_field WHERE username='$username'";
		// 	mysqli_query($connection, $query) or die(mysqli_error($connection));
		// }
	}

	if($_GET['t'] == 'login'){
		$mail = $_POST['mail'];
		$password = $_POST['password'];

		$query = "SELECT id, password FROM user WHERE mail='$mail' and password='$password'";
		$result = mysqli_query($connection, $query);
		$array = mysqli_fetch_row($result);

		if($array != null) {
			$info = [
				'id' => $array[0], 
				'hash' => password_hash($array[1], PASSWORD_DEFAULT)
			];

			echo json_encode($info);
		}else{
			echo false;
		}
	}

	if($_GET['t'] == 'register'){

	}
?>