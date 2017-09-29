<?php

define ('SITE_ROOT', realpath(dirname(__FILE__) . '/..' . '/..'));

echo SITE_ROOT;

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

// form(s)

$number_of_forms = $_POST['form_count'];

// print_r($_POST['search-org-format_1']);

//echo(implode(',', $_POST['search-org-format_1']));

//echo guidv4(openssl_random_pseudo_bytes(16));


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
    // else {
    // 	$stmt = $mysqli->prepare("INSERT INTO `film_submission_request`(`firstname`, `lastname`, `association_with_film`, `phone_number`, `email`, `address`, `province_state`, `country`, `postal_code_zip_code`, `city_town`, `client_id`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    //     $stmt->bind_param("ssssssssssi",$firstname,$lastname,$association,$phone,$email,$address,$province_state,$country,$postal_code,$city_town,$client_id);

    //     $stmt->execute();

    //     $current_id = $mysqli->insert_id;

    //     $count = $stmt->affected_rows;

    //     $stmt->close();
    //     $mysqli->close();

    //     if ($count != 1) {
    //         return $outcome;
    //     }
    //     // else {

    //     // }
    // }
}

function guidv4($data)
{
    assert(strlen($data) == 16);

    $data[6] = chr(ord($data[6]) & 0x0f | 0x40); // set version to 0100
    $data[8] = chr(ord($data[8]) & 0x3f | 0x80); // set bits 6-7 to 10

    return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
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