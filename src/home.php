<?php

if(session_status()==1) {
    @session_start();
}

?>

<link rel="stylesheet" type="text/css" href="css/home.css">


<script type="text/javascript">
message = '<?= $_SESSION["message"] ?>';
warning = '<?= $_SESSION["warning"] ?>';
<?php
unset($_SESSION["message"]);
unset($_SESSION["warning"]);
?>
</script>

<script src="js/home.js"
        type="text/javascript"></script>