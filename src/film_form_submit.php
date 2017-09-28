<?php

if(session_status()==1) {
    @session_start();
}

if ($_SESSION['loggedin']) {
	$client_id = $_SESSION['client_id'];
}
else {
	$client_id = -1;
}

$firstname = $_POST['firstname'];

echo($firstname);

?>