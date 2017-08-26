<?php

if(session_status()==1) {
        @session_start();
}

$header_str = 
'<!DOCTYPE html>
<html>
<head>
<title>Canadian Filmmakers Distribution Centre</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="'.$web_host.'css/style.css">
<script src="https://www.google.com/recaptcha/api.js"></script>
 <script type="text/javascript">
 var RecaptchaOptions = {
    theme : "white"
 };
 </script>
<script
  src="https://code.jquery.com/jquery-2.2.4.min.js"
  integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44="
  crossorigin="anonymous"></script> ';

if (isset($_SESSION["user_type"])) {
        $header_str .= '<script type="text/javascript">user_type=' . $_SESSION["user_type"] . ';</script>';
        $header_str .= '<script type="text/javascript">logged_in=1;</script>';
}
else {
        $header_str .= '<script type="text/javascript">user_type=0;</script>';
        $header_str .= '<script type="text/javascript">logged_in=0;</script>';
}

$header_str .= '<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
</head>
<body>
</body>';

echo $header_str;
require 'src/toolbar.php';
?>