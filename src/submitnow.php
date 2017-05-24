<?php
require 'src/pages_json.php';
$page_json = getPagesJson(2645);
?>

<link rel="stylesheet" type="text/css" href="<?=$web_host?>css/page.css">
<script type="text/javascript">

json_string = '<?php echo addslashes($page_json); ?>'

if (json_string) {
    page_obj = JSON.parse('<?php echo addslashes($page_json); ?>')
}
else {
    page_obj = ''
}

</script>
<script src="<?=$web_host?>js/submitnow.js" type="text/javascript"></script>

<script>
  var el = document.createElement('script');
  el.type = 'application/ld+json';
  el.text = JSON.stringify({
    "@context": "http://schema.org",
    "@type": "WebPage",
    "url": window.location.href,
    "name": "Submit Now | Canadian Filmmakers Distribution Centre"
  });
  document.querySelector('body').appendChild(el);
</script>