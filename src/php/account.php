<?php
	require('bitconnect.php');
	
	if($_GET['t'] == 'check'){
		$id = $_POST['id'];
		$hash = $_POST['hash'];

		$query = "SELECT * FROM user WHERE id='$id'";
		$result = mysqli_query($connection, $query);
		$array = mysqli_fetch_assoc($result);

		if(!password_verify($array['password'], $hash)) exit(0);

		$array['password'] = 'sosi jepy';
		echo json_encode($array);
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
		$id = $_POST['id'];
		$hash = $_POST['hash'];

		$query = "SELECT password FROM user WHERE id='$id'";
		$result = mysqli_query($connection, $query);
		$array = mysqli_fetch_row($result);

		if(!password_verify($array[0], $hash)) {echo 'hash';}else {
			$mail = $_POST['mail'];
			$phone = $_POST['phone'];
			$passport = $_POST['passport'];
			$firstname = $_POST['firstname'];
			$lastname = $_POST['lastname'];
			$patronymic = $_POST['patronymic'];

			$query = "UPDATE user SET 
			firstname = '$firstname',
			lastname = '$lastname',
			patronymic = '$patronymic',
			mail = '$mail',
			phone = '$phone',
			passport = '$passport'
			 WHERE id='$id'";
			$result = mysqli_query($connection, $query);

			$passwordOld = $_POST['passwordOld'];
			$passwordNew = $_POST['passwordNew'];
			if($passwordOld != '' & $passwordNew != '') {
				if($passwordOld != $array[0]) {echo 'old';}else {
					if($passwordOld == $passwordNew) {echo 'new';}else {
						$query = "UPDATE user SET password = '$passwordNew' WHERE id='$id'";
						$result = mysqli_query($connection, $query);
						echo password_hash($passwordNew, PASSWORD_DEFAULT);
					}
				}
			}
		}
	}

	if($_GET['t'] == 'flights'){
		$id = $_POST['id'];
		$hash = $_POST['hash'];

		$query = "SELECT password FROM user WHERE id='$id'";
		$result = mysqli_query($connection, $query);
		$array = mysqli_fetch_row($result);

		if(!password_verify($array[0], $hash)) exit();

		$query = "SELECT flights FROM user WHERE id='$id'";
		$result = mysqli_query($connection, $query);
		$array_flights = mysqli_fetch_row($result);
		$array_flights = json_decode($array_flights[0], true);

		$send = [];

		foreach ($array_flights as $row) {
			$flight = $row["id"];
			$query = "SELECT plane_id, where_from, where_to, time_departure, price FROM flight WHERE id='$flight'";
			$result = mysqli_query($connection, $query);
			$array = mysqli_fetch_assoc($result);

			$plane = $array['plane_id'];
			$query = "SELECT model FROM plane WHERE id='$plane'";
			$result = mysqli_query($connection, $query);
			$array_plane = mysqli_fetch_row($result);

			array_push($send , array(
				"id"=>$row['id'], 
				"time_departure"=>$array['time_departure'],
				"where_from"=>$array['where_from'], 
				"where_to"=>$array['where_to'],
				"model"=>$array_plane[0], 
				"price"=>$array['price'],
				'type'=>$row['type']
			));
		}

		exit(json_encode($send));
	}

	if($_GET['t'] == 'forgot'){
		$mail = $_POST['mail'];

		$query = "SELECT password FROM user WHERE mail='$mail'";
		$result = mysqli_query($connection, $query);
		$array = mysqli_fetch_assoc($result);

		if($array != null) {
			echo json_encode($array['password']);
		}else{
			echo false;
		}
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
		$mail = filter_var($_POST['mail'], FILTER_SANITIZE_EMAIL);
		$password = $_POST['password'];
		$firstname = $_POST['firstname'];
		$middlename = $_POST['middlename'];
		$lastname = $_POST['lastname'];
		$phone = substr($_POST['phone'], 0, 10);
		$passport = substr($_POST['passport'], 0, 9);

		if($mail == '' || $password == '') exit('empty');
		if(!filter_var($mail, FILTER_VALIDATE_EMAIL)) exit('wrong');

		$query = "SELECT id FROM user WHERE mail='$mail'";
		$result = mysqli_query($connection, $query);
		$array = mysqli_fetch_row($result);

		if($array != null) exit('exist');

		$query = "INSERT INTO user (lastname, firstname, patronymic, mail, password, phone, passport) 
		VALUES ('$lastname', '$firstname', '$middlename', '$mail', '$password', '$phone', '$passport')";
		$result = mysqli_query($connection, $query);

		$info = [
			'id' => mysqli_insert_id($connection),
			'password' => password_hash($password, PASSWORD_DEFAULT)
		];
		echo json_encode($info);
	}
?>