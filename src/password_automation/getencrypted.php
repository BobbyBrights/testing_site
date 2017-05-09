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
echo $pass; 
echo "\n";
echo $enc_pass;

if ($pass_func->check('X2epPBgu', '$S$Ew.qJG.yehiICBSAoAz/wRYm3xnsr74KjbCI8KVJfnnPKm3xI4qS')) {
	echo "hi";
}
else {
	echo "nope";
}
?>