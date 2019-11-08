<?php
    require('bitconnect.php');
    
    
    if (isset( $_POST["add_account"]))
    {
        $formplane = $_POST["form-plane"];
        $formwhere_from = $_POST["formwhere_from"];
        $formwhere_to = $_POST["formwhere_to"];
        $formtime_departure = $_POST["formtime_departure"];
        $formtime_arrival = $_POST["formtime_arrival"];
        $formprice = $_POST["formprice"];

        $query = "INSERT INTO flight VALUES (NULL, '$formplane', '$formwhere_from', '', '$formwhere_to', '', '$formtime_departure', '$formtime_arrival', NULL, '0', '$formprice');";
		$result = mysqli_query($connection, $query);
    }
?>