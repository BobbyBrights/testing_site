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


$outcome = 0;

if (isCorrectCaptcha($_POST)) {
    $servername = "external-db.s220335.gridserver.com";
    $username = "db220335";
    $password = "XQ245_Qfhuz";
    $database = "db220335_cfmdc";

    $mysqli = new mysqli($servername, $username, $password, $database);

    if ($mysqli->connect_errno) {
        $outcome = 0;
    }
    else {
    	$stmt = $mysqli->prepare("INSERT INTO `film_submission_request`(`firstname`, `lastname`, `association_with_film`, `phone_number`, `email`, `address`, `province_state`, `country`, `postal_code_zip_code`, `city_town`, `client_id`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssssssssi",$firstname,$lastname,$association,$phone,$email,$address,$province_state,$country,$postal_code,$city_town,$client_id);

        $stmt->execute();

        echo ($mysqli->insert_id);

        $count = $stmt->affected_rows;



        $stmt->close();
        $mysqli->close();

        if ($count != 1) {
            return $outcome;
        }
        // else {

        // }
    }
}

function isCorrectCaptcha($postvar) {
    $url = 'https://www.google.com/recaptcha/api/siteverify';
    $secret = "6LemsxcUAAAAAK8i2Iv2ZcCjzlggw1IkGuS-e8CO";
    $captcha = $postvar['g-recaptcha-response'];
    $myvars = 'secret=' . $secret . '&response=' . $captcha;

    $ch = curl_init( $url );
    curl_setopt( $ch, CURLOPT_POST, 1);
    curl_setopt( $ch, CURLOPT_POSTFIELDS, $myvars);
    curl_setopt( $ch, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt( $ch, CURLOPT_HEADER, 0);
    curl_setopt( $ch, CURLOPT_RETURNTRANSFER, 1);

    $response = curl_exec( $ch );

    $s = json_decode($response);

    return $s->success;
}

?>