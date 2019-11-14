<?php
	require('bitconnect.php');

	if($_GET['t'] == 'flight_get') {
		$id = $_POST['id'];
		$hash = $_POST['hash'];
		$array = Query("SELECT password, rank FROM user WHERE id='$id'");
		if(!password_verify($array['password'], $hash) || $array['rank'] == 0) exit();

		$query = "SELECT * FROM flight";
		$result = mysqli_query($connection, $query);
		$send = [];

		while ($row = mysqli_fetch_assoc($result)) {
			array_push($send , array(
				"id"=>$row['id'],
				"plane_id"=>$row['plane_id'], 
				"from_city_id"=>$row['from_city_id'],
				"from_airport_id"=>$row['from_airport_id'],
				"to_city_id"=>$row['to_city_id'],
				"to_airport_id"=>$row['to_airport_id'],
				"time_departure"=>$row['time_departure'],
				"time_arrival"=>$row['time_arrival'],
				"time_back"=>$row['time_back'],
				"free_places"=>$row['free_places'],
				"price"=>$row['price']
			));
		}

		exit(json_encode($send));
	}

	if($_GET['t'] == 'flight_edit') {
		$input = filter_input_array(INPUT_POST);

		if ($input['action'] == 'edit') {
			$update_field='';
			if(isset($input['plane_id'])) {
				$update_field.= "plane_id='".$input['plane_id']."'";
			} else if(isset($input['from_city_id'])) {
				$update_field.= "from_city_id='".$input['from_city_id']."'";
			} else if(isset($input['from_airport_id'])) {
				$update_field.= "from_airport_id='".$input['from_airport_id']."'";
			} else if(isset($input['to_city_id'])) {
				$update_field.= "to_city_id='".$input['to_city_id']."'";
			} else if(isset($input['to_airport_id'])) {
				$update_field.= "to_airport_id='".$input['to_airport_id']."'";
			} else if(isset($input['time_departure'])) {
				$update_field.= "time_departure='".$input['time_departure']."'";
			} else if(isset($input['time_arrival'])) {
				$update_field.= "time_arrival='".$input['time_arrival']."'";
			} else if(isset($input['time_back'])) {
				$update_field.= "time_back='".$input['time_back']."'";
			} else if(isset($input['free_places'])) {
				$update_field.= "free_places='".$input['free_places']."'";
			} else if(isset($input['price'])) {
				$update_field.= "price='".$input['price']."'";
			}

			if($update_field && $input['id']) {
				$query = "UPDATE flight SET $update_field WHERE id=" . $input['id'];
				mysqli_query($connection, $query);
			}
		}

		if ($input['action'] == 'delete') {
			$query = "DELETE FROM flight WHERE id=" . $input['id'];
			mysqli_query($connection, $query);
		}
	}

	if($_GET['t'] == 'flight_add') {
		$id = $_POST['id'];
		$hash = $_POST['hash'];
		$array = Query("SELECT password, rank FROM user WHERE id='$id'");
		if(!password_verify($array['password'], $hash) || $array['rank'] == 0) exit();

		$plane_id = $_POST['plane_id'];
		$from_city_id = $_POST['from_city_id'];
		$from_airport_id = $_POST['from_airport_id'];
		$to_city_id = $_POST['to_city_id'];
		$to_airport_id = $_POST['to_airport_id'];
		$time_departure = $_POST['time_departure'];
		$time_arrival = $_POST['time_arrival'];
		$time_back = $_POST['time_back'];
		$free_places = $_POST['free_places'];
		$price = $_POST['price'];

		$query = "INSERT INTO flight (plane_id, from_city_id, from_airport_id, to_city_id, to_airport_id, time_departure, time_arrival, time_back, free_places, price) 
		VALUES ('$plane_id', '$from_city_id', '$from_airport_id', '$to_city_id', '$to_airport_id', '$time_departure', '$time_arrival', '$time_back', '$free_places', '$price')";
	    //exit($query);
		$result = mysqli_query($connection, $query) or die(mysqli_error($connection));
		exit(mysqli_insert_id($connection));
	}

	if($_GET['t'] == 'user_get') {
		$id = $_POST['id'];
		$hash = $_POST['hash'];
		$array = Query("SELECT password, rank FROM user WHERE id='$id'");
		if(!password_verify($array['password'], $hash) || $array['rank'] != 2) exit();

		$query = "SELECT * FROM user";
		$result = mysqli_query($connection, $query);
		$send = [];

		while ($row = mysqli_fetch_assoc($result)) {
			array_push($send , array(
				"id"=>$row['id'],
				"lastname"=>$row['lastname'], 
				"firstname"=>$row['firstname'],
				"patronymic"=>$row['patronymic'],
				"mail"=>$row['mail'],
				"password"=>$row['password'],
				"phone"=>$row['phone'],
				"passport"=>$row['passport'],
				"money"=>$row['money'],
				"rank"=>$row['rank']
			));
		}

		exit(json_encode($send));
	}

	if($_GET['t'] == 'user_edit') {
		$input = filter_input_array(INPUT_POST);

		if ($input['action'] == 'edit') {
			$update_field='';
			if(isset($input['lastname'])) {
				$update_field.= "lastname='".$input['lastname']."'";
			} else if(isset($input['firstname'])) {
				$update_field.= "firstname='".$input['firstname']."'";
			} else if(isset($input['patronymic'])) {
				$update_field.= "patronymic='".$input['patronymic']."'";
			} else if(isset($input['mail'])) {
				$update_field.= "mail='".$input['mail']."'";
			} else if(isset($input['password'])) {
				$update_field.= "password='".$input['password']."'";
			} else if(isset($input['phone'])) {
				$update_field.= "phone='".$input['phone']."'";
			} else if(isset($input['passport'])) {
				$update_field.= "passport='".$input['passport']."'";
			} else if(isset($input['money'])) {
				$update_field.= "money='".$input['money']."'";
			} else if(isset($input['rank'])) {
				$update_field.= "rank='".$input['rank']."'";
			}

			if($update_field && $input['id']) {
				$query = "UPDATE user SET $update_field WHERE id=" . $input['id'];
				mysqli_query($connection, $query);
			}
		}

		if ($input['action'] == 'delete') {
			$query = "DELETE FROM user WHERE id=" . $input['id'];
			mysqli_query($connection, $query);
		}
	}

	if($_GET['t'] == 'user_add') {
		$id = $_POST['id'];
		$hash = $_POST['hash'];
		$array = Query("SELECT password, rank FROM user WHERE id='$id'");
		if(!password_verify($array['password'], $hash) || $array['rank'] != 2) exit();

		$query = "INSERT INTO user () VALUES ()";
		$result = mysqli_query($connection, $query);
	}
?>