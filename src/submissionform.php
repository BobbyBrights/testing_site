<?php

if(session_status()==1) {
        @session_start();
}
?>



<link rel="stylesheet" type="text/css" href="<?=$web_host?>css/film_submission.css">

<script src="<?=$web_host?>js/submission_form.js" type="text/javascript"></script>

<script>
  client_id = -1;
  <?php 
    if ($_SESSION["loggedin"]) {
  ?>
      client_id = <?php echo $_SESSION['client_id']; ?>;
      username = <?php echo $_SESSION["username"]; ?>;
  <?php
    }
  ?>
  var el = document.createElement('script');
  el.type = 'application/ld+json';
  el.text = JSON.stringify({
    "@context": "http://schema.org",
    "@type": "WebPage",
    "url": window.location.href,
    "name": "Submission Form | Canadian Filmmakers Distribution Centre"
  });
  document.querySelector('body').appendChild(el);
</script>