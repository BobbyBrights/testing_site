<?php
require 'src/getClassCompLinks.php';

$links = getCompLinks();
?>

<link rel="stylesheet" type="text/css" href="<?=$web_host?>css/compilations_main.css">
<script type="text/javascript">
json_string = '<?php echo addslashes($links); ?>'

comp_obj = '';
if (json_string) {
    comp_obj = JSON.parse('<?php echo addslashes($links); ?>');
}
else {
    comp_obj = '';
}
</script>
<script src="<?=$web_host?>js/filmsfortheclassroom_main.js" type="text/javascript"></script>

<script>
  var el = document.createElement('script');
  el.type = 'application/ld+json';
  el.text = JSON.stringify({
    "@context": "http://schema.org",
    "@type": "WebPage",
    "url": window.location.href,
    "name": "Films For The Classroom | Canadian Filmmakers Distribution Centre"
  });
  document.querySelector('body').appendChild(el);
</script>