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

// request info

$firstname = $_POST['firstname'];
$lastname = $_POST['lastname'];
$address = $_POST['address'];
$city_town = $_POST['city_town'];
$country = $_POST['country_'];
$association = $_POST['organization'];
$province_state = $_POST['province_state'];
$postal_code = $_POST['postal_code'];
$phone = $_POST['phone'];
$email = $_POST['email'];

echo($firstname);
echo($lastname);
echo($address);
echo($city_town);
echo($country);
echo($association);
echo($province_state);
echo($postal_code);
echo($phone);
echo($email);

?>