<?php
require ('../../cms/pass_check.php');

function generatePassword($length){
    return substr(preg_replace("/[^a-zA-Z0-9]/", "", base64_encode(getRandomBytes($length+1))),0,$length);
}

$pass = generatePassword(8);
$enc_pass = $pass_func->hash($pass);
echo $enc_pass;
?>