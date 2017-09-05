<?php

if(session_status()==1) {
    @session_start();
}

$user_username = trim($_REQUEST['username']);
$user_email = trim($_REQUEST['email']);

require ('../cms/pass_check.php');

$servername = "external-db.s220335.gridserver.com";
$username = "db220335";
$password = "XQ245_Qfhuz";
$database = "db220335_cfmdc";

$mysqli = new mysqli($servername, $username, $password, $database);

$new_pass = "";

if ($mysqli->connect_errno || !$user_email) {
    echo "3";
}

else {
    $sql = "SELECT * FROM users_field_data where name = '$user_username' and mail = '$user_email'";
    $result = $mysqli->query($sql);
    if ($result->num_rows > 0) {
        $result->close();
        $pass = generatePassword(8);
        $newPass = $pass_func->hash($pass);
        //echo $newPass;
        $sql ="UPDATE `users_field_data` SET `pass` = '$newPass' WHERE name = '$user_username'";
        $result = $mysqli->query($sql);
        if ($mysqli->affected_rows > 0) {
            otherMail($user_email, $user_username, $pass);
            $_SESSION['message'] = '<div class="normal_text"><div class="big">Your account password has been reset. Please check your email.</div>If you have further issues please contact <a class="small" href="mailto:bookings@cfmdc.org">bookings@cfmdc.org</a></div>';
            echo "1";
        }
        else {
            echo "3";
        }
    }
    else {
        echo "2";
    }
}

function getRandomBytes($nbBytes = 32)
{
    $bytes = openssl_random_pseudo_bytes($nbBytes, $strong);
    if (false !== $bytes && true === $strong) {
        return $bytes;
    }
}

function generatePassword($length){
    return substr(preg_replace("/[^a-zA-Z0-9]/", "", base64_encode(getRandomBytes($length+1))),0,$length);
}

function otherMail($mail, $username, $password) {
    $body = "The password for $username, has been reset to $password.<br>
    Please visit <a href='http://www.testing.cfmdc.org'>www.testing.cfmdc.org</a>, and attempt to login again.";

    $headers[] = 'MIME-Version: 1.0';
    $headers[] = 'Content-type: text/html; charset=iso-8859-1';

    $headers[] = "To: <$mail>";
    $headers[] = 'From: CFMDC WEB <web@cfmdc.org>';

    mail($mail, 'CFMDC ACCOUNT PASSWORD', $body, implode("\r\n", $headers));
}
?>