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

	if($_GET['t'] == 'delete_tickets'){
		$id = $_POST['id'];
		$hash = $_POST['hash'];

		$array = Query("SELECT password FROM user WHERE id='$id'");
		if(!password_verify($array['password'], $hash)) exit('hash');

		$query = "DELETE FROM ticket WHERE user_id = '$id'";
		$result = mysqli_query($connection, $query);
	}

	if($_GET['t'] == 'delete_profile'){
		$id = $_POST['id'];
		$hash = $_POST['hash'];

		$array = Query("SELECT password FROM user WHERE id='$id'");
		if(!password_verify($array['password'], $hash)) exit('hash');

		$query = "DELETE FROM ticket WHERE user_id = '$id'";
		$result = mysqli_query($connection, $query);

		$query = "DELETE FROM user WHERE id = '$id'";
		$result = mysqli_query($connection, $query);
	}

	if($_GET['t'] == 'flights'){
		$id = $_POST['id'];
		$hash = $_POST['hash'];

		$array = Query("SELECT password FROM user WHERE id='$id'");

		if(!password_verify($array['password'], $hash)) exit();

		$query = "SELECT * FROM city";
		$result = mysqli_query($connection, $query);
		$city = [];
		while ($row = mysqli_fetch_assoc($result)) {
			$city[$row['id']]['name'] = $row['name'];
			$city[$row['id']]['img'] = $row['img'];
		}

		$query = "SELECT id, name FROM airport";
		$result = mysqli_query($connection, $query);
		$airport = [];
		while ($row = mysqli_fetch_assoc($result)) {
			$airport[$row['id']] = $row['name'];
		}

		$query = "SELECT * FROM ticket WHERE user_id='$id'";
		$result = mysqli_query($connection, $query);
		$send = [];
		while ($row = mysqli_fetch_assoc($result)) {
			$flight_id = $row['flight_id'];
			$array_flight = Query("SELECT * FROM flight WHERE id = '$flight_id'");
			$plane_id = $array_flight['plane_id'];
			$array_plane = Query("SELECT model FROM plane WHERE id = '$plane_id'");

			array_push($send , array(
				"id"=>$row['flight_id'], 
				"from_city"=>$city[$array_flight['from_city_id']]['name'],
				"from_airport"=>$airport[$array_flight['from_airport_id']], 
				"to_city"=>$city[$array_flight['to_city_id']]['name'],
				"to_city_img"=>$city[$array_flight['to_city_id']]['img'],			
				"to_airport"=>$airport[$array_flight['to_airport_id']],
				"time_departure"=>$array_flight['time_departure'],
				"time_back"=>$array_flight['time_back'],
				"type"=>$row['type'],
				"amount"=>$row['amount'],
				"price"=>$array_flight['price'],
				"model"=>$array_plane['model']
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