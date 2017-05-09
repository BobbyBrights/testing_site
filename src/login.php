<?php
    //header('Access-Control-Allow-Origin: *');
    if(session_status()==1) {
        @session_start();
    }

    $user_username = $_REQUEST['username'];
    $user_password = $_REQUEST['password'];

    require ('../cms/pass_check.php');

    $servername = "external-db.s220335.gridserver.com";
    $username = "db220335";
    $password = "XQ245_Qfhuz";
    $database = "db220335_cfmdc";

    $mysqli = new mysqli($servername, $username, $password, $database);
    if ($mysqli->connect_errno) {
        echo "-1";
    }
    $sql = "SELECT u.pass, u.mail, cid.field_filemaker_client_id_value, ur.roles_target_id
            FROM users_field_data u
            JOIN user__field_filemaker_client_id cid ON cid.entity_id = u.uid
            JOIN user__roles ur ON ur.entity_id = u.uid
            WHERE u.name =  '$user_username'";


    $result = mysqli_query($mysqli, $sql);

    $row = $result->fetch_array();

    if ($row) {
        if ($pass_func->check($user_password, $row['pass'])) {
            $_SESSION["loggedin"] = 1;
            $_SESSION["username"] = $user_username;
            if ($row['roles_target_id'] == "client" || $row['roles_target_id'] == "administrator") {
                $_SESSION["user_type"] = 1;
            }
            else {
                $_SESSION["user_type"] = 2;
            }
            $_SESSION["client_id"] = $row['field_filemaker_client_id_value'];
            $_SESSION["mail"] = $row['mail'];
            echo "1";
        }
        else {
            $_SESSION['loggedin'] = 0;
            echo "0";
        }
    }

    else {
        $_SESSION['loggedin'] = 0;
        echo "0";
    }

?>
