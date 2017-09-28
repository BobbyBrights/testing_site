<?php

if(session_status()==1) {
    @session_start();
}

echo($_SESSION['loggedin']);

?>