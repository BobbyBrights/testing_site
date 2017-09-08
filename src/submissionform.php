<?php
?>

<link rel="stylesheet" type="text/css" href="<?=$web_host?>css/page.css">

<script src="<?=$web_host?>js/submission_form.js" type="text/javascript"></script>

<script>
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