<?php
require ('../../cms/pass_check.php');

function generatePassword($length){
    return substr(preg_replace("/[^a-zA-Z0-9]/", "", base64_encode(getRandomBytes($length+1))),0,$length);
}

function getRandomBytes($nbBytes = 32)
{
    $bytes = openssl_random_pseudo_bytes($nbBytes, $strong);
    if (false !== $bytes && true === $strong) {
        return $bytes;
    }
}

$pass = generatePassword(8);
$enc_pass = $pass_func->hash($pass);
echo $pass . " " . $enc_pass;

if ($pass_func->check('6KfoEQ7k', '$S$ElOHAKs9C1XjkBbtAQdRMKoA0O/u8Pe.QQZC6MXoBEEjhi19lYTt')) {
	echo "hi";
}
else {
	echo "no";
}

?>