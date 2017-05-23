<link rel="stylesheet" type="text/css" href="<?=$web_host?>css/footer.css">
<script src="<?=$web_host?>js/jquery.visible.js" type="text/javascript"></script>
<script src="<?=$web_host?>js/footer.js" type="text/javascript"></script>
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-19969553-1', 'auto');
  ga('send', 'pageview');
</script>
<?php

if(session_status()==1) {
    @session_start();
}

unset($_SESSION["message"]);
unset($_SESSION["warning"]);
?>