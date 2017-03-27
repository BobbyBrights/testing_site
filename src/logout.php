<?php
if(session_status()==1) {
    @session_start();
}

unset($_SESSION["loggedin"]);
unset($_SESSION["username"]);
unset($_SESSION["user_type"]);
unset($_SESSION["client_id"]);
unset($_SESSION["mail"]);

echo "1";

?>