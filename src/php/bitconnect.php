<?php
	define("DB_SERVER", "localhost");
	define("DB_USER", "root");
	define("DB_PASS", "");
	define("DB_NAME", "storage_log");
	$connection = mysqli_connect(DB_SERVER,DB_USER,DB_PASS,DB_NAME);

	if ($connection->connect_error) {
	    die("Connection failed: " . $connection->connect_error);
	} 
	echo "Connected successfully";
	mysqli_set_charset($connection,'utf8');
?>