<?php

if(session_status()==1) {
    @session_start();
}

$firstname = $_POST['firstname'];
$lastname = $_POST['lastname'];
$organization = $_POST['organization'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$address = $_POST['address'];
$city_town = $_POST['city_town'];
$province_state = $_POST['province_state'];
$country = $_POST['country_'];
$postal_code = $_POST['postal_code'];
$acct_type = $_POST['acct_type'];

$outcome = 0;

if (isCorrectCaptcha($_POST)) {

    $servername = "external-db.s219085.gridserver.com";
    $username = "db219085_admin";
    $password = "XQ245_Qfhuz";
    $database = "db219085_cfmdc";

    $mysqli = new mysqli($servername, $username, $password, $database);
    if ($mysqli->connect_errno) {
        $outcome = 0;
    }
    else {
        //$sql = "INSERT INTO `account_request`(`firstname`, `lastname`, `organization`, `phone_number`, `email`, `address`, `province_state`, `country`, `postal_zip`, `city_town`, `account_type`) VALUES ('$firstname','$lastname','$organization','$phone','$email','$address','$province_state','$country','$postal_code','$city_town','$acct_type')";

        $stmt = $mysqli->prepare("INSERT INTO `account_request`(`firstname`, `lastname`, `organization`, `phone_number`, `email`, `address`, `province_state`, `country`, `postal_zip`, `city_town`, `account_type`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssssssssss", $firstname,$lastname,$organization,$phone,$email,$address,$province_state,$country,$postal_code,$city_town,$acct_type);

        $stmt->execute();

        //$result = mysqli_query($mysqli, $sql);
        

        $count = $stmt->affected_rows;

        $stmt->close();
        $mysqli->close();

        if ($count == 1) {
            $outcome = 1;
            otherMail($firstname, $lastname, $organization, $phone, $email, $address, $city_town, $province_state, $country, $postal_code, $acct_type);
        }
        else {
            $outcome = 0;
        }
    }

}
else {
    $outcome = 0;
}

if ($outcome) {
    $_SESSION['message'] = '<div class="normal_text"> <div class="big">An account request has been submitted to CFMDC.</div>\
				Please allow 24hrs to hear back from our staff. Thanks.</div>';
}
else {
    $_SESSION['warning'] = '<div class="normal_text"> <div class="big">Your account request failed to be submitted. Please try again.</div>If you have further issues please contact <a class="small" href="mailto:members@cfmdc.org">bookings@cfmdc.org</a></div>';
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

function otherMail($firstname, $lastname, $organization, $phone, $email, $address, $city_town, $province_state, $country, $postal_code, $acct_type) {
    $body = "Firstname: $firstname <br>
    Lastname: $lastname <br>
    Organization: $organization <br>
    Phone: $phone <br>
    Email: $email <br>
    Address: $address <br>
    City/Town: $city_town <br>
    Province/State: $province_state <br>
    Country: $country <br>
    Postal Code: $postal_code <br>
    Account Type: $acct_type
    ";

    $headers[] = 'MIME-Version: 1.0';
    $headers[] = 'Content-type: text/html; charset=iso-8859-1';

    $headers[] = 'To: CFMDC WEB <web@cfmdc.org>';
    $headers[] = 'From: CFMDC WEB <web@cfmdc.org>';

    mail("web@cfmdc.org", 'CFMDC ACCOUNT REQUESTED', $body, implode("\r\n", $headers));
}


function send_message($firstname, $lastname, $organization, $phone, $email, $address, $city_town, $province_state, $country, $postal_code, $acct_type) {
    require('/home/219085/users/.home/PHPMailer/PHPMailerAutoload.php');
    $mail=new PHPMailer();
    $mail->CharSet = 'UTF-8';

    $body = "Firstname: $firstname <br>
    Lastname: $lastname <br>
    Organization: $organization <br>
    Phone: $phone <br>
    Email: $email <br>
    Address: $address <br>
    City/Town: $city_town <br>
    Province/State: $province_state <br>
    Country: $country <br>
    Postal Code: $postal_code <br>
    Account Type: $acct_type
    ";

    $mail->IsSMTP();
    
    $mail->Host       = 'kmlm-ccr6.accessdomain.com';

    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->SMTPDebug  = 1;
    $mail->SMTPAuth   = true;

    $mail->Username   = 'web@cfmdc.org';
    $mail->Password   = 'Snowman44!';

    $mail->SetFrom('web@cfmdc.org', $name);
    $mail->AddReplyTo('no-reply@cfmdc.org','no-reply');
    $mail->Subject    = 'CFMDC ACCOUNT REQUESTED';
    $mail->isHTML(true);   
    $mail->Body = $body;

    $mail->SingleTo = true;
    $mail->AddAddress('web@cfmdc.org');

    ob_start();
    $mail->send();
    ob_get_clean();
    $mail->SMTPDebug = 0;

}
?>