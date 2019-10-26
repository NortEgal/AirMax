<?php
	define("DB_SERVER", "VH274.spaceweb.ru");
	define("DB_USER", "sokolovma2");
	define("DB_PASS", "2140174Qq");
	define("DB_NAME", "sokolovma2");

	// define("DB_SERVER", "localhost");
	// define("DB_USER", "allah");
	// define("DB_PASS", "YV0QXuCo8pGRFtbCGrcX");
	// define("DB_NAME", "Allah");

	$connection = mysqli_connect(DB_SERVER,DB_USER,DB_PASS,DB_NAME);

	if ($connection->connect_error) {
	    die("Connection failed: " . $connection->connect_error);
	} 
	mysqli_set_charset($connection, 'utf8');

	//echo "Connected successfully";
?>