<link rel="stylesheet" type="text/css" href="<?=$web_host?>css/footer.css">
<script src="<?=$web_host?>js/jquery.visible.js" type="text/javascript"></script>
<script src="<?=$web_host?>js/footer.js" type="text/javascript"></script>

<?php

if(session_status()==1) {
    @session_start();
}

unset($_SESSION["message"]);
unset($_SESSION["warning"]);
?>