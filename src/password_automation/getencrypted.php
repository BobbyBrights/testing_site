<?php
require ('../../cms/pass_check.php');
$input = $_GET["input"];
$pass_func->hash($input);
echo $pass_func;
?>