<?php

if(session_status()==1) {
    @session_start();
}

echo($_SESSION['logged_in']);

?>