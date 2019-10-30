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
			$array = mysqli_fetch_assoc($result);
			$array['password'] = 'sosi jepy';
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
		$array = mysqli_fetch_assoc($result);

		if($array != null) {
			$array['password'] = password_hash($array['password'], PASSWORD_DEFAULT);
			echo json_encode($array);
		}else{
			echo false;
		}
	}

	if($_GET['t'] == 'register'){
		$mail = $_POST['mail'];
		$password = $_POST['password'];
		$firstname = $_POST['firstname'];
		$middlename = $_POST['middlename'];
		$lastname = $_POST['lastname'];
		$phone = substr($_POST['phone'], 0, 10);
		$passport = substr($_POST['passport'], 0, 9);

		if(filter_var($mail, FILTER_VALIDATE_EMAIL) && $password != ''){
			$query = "SELECT id FROM user WHERE mail='$mail'";
			$result = mysqli_query($connection, $query);
			$array = mysqli_fetch_row($result);

			if($array == null) {
				$query = "INSERT INTO user (firstname, middlename, surname, mail, password, phone, passport) VALUES ('$firstname', '$middlename', '$lastname', '$mail', '$password', '$phone', '$passport')";
				$result = mysqli_query($connection, $query);

				$info = [
					'id' => mysqli_insert_id($connection),
					'password' => password_hash($password, PASSWORD_DEFAULT)
				];
				echo json_encode($info);
			}else{
				echo 0;
			}
		}else{
			echo 1;
		}
	}
?>