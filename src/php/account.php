<?php
	require('bitconnect.php');
	
	if($_GET['t'] == 'get'){
		$id = $_POST['id'];
		$hash = $_POST['hash'];

		$array = Query("SELECT * FROM user WHERE id='$id'");

		if(!password_verify($array['password'], $hash)) exit(0);

		$array['password'] = 'sosi jepy';
		exit(json_encode($array));
	}

	if($_GET['t'] == 'set'){
		$id = $_POST['id'];
		$hash = $_POST['hash'];

		$array = Query("SELECT password FROM user WHERE id='$id'");

		if(!password_verify($array['password'], $hash)) exit('hash');

		$mail = $_POST['mail'];
		$phone = substr($_POST['phone'], 0, 10);
		$passport = substr($_POST['passport'], 0, 9);
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
			if($passwordOld != $array[0]) exit('old');
			if($passwordOld == $passwordNew) exit('new');

			$query = "UPDATE user SET password = '$passwordNew' WHERE id='$id'";
			$result = mysqli_query($connection, $query);
			exit(password_hash($passwordNew, PASSWORD_DEFAULT));
		}
	}

	if($_GET['t'] == 'flights'){
		$id = $_POST['id'];
		$hash = $_POST['hash'];

		$array = Query("SELECT password, flights FROM user WHERE id='$id'");

		if(!password_verify($array['password'], $hash) || $array['flights'] == '') exit();
		$array_flights = json_decode($array['flights'], true);

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

		$array = Query("SELECT password FROM user WHERE mail='$mail'");

		if($array != null) {
			echo $array['password'];
		}else{
			echo false;
		}
	}

	if($_GET['t'] == 'login'){
		$mail = $_POST['mail'];
		$password = $_POST['password'];

		$array = Query("SELECT id, password FROM user WHERE mail='$mail' and password='$password'");

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

		$array = Query("SELECT id FROM user WHERE mail='$mail'");

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