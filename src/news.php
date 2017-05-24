<?php
require 'src/news_nid_json.php';
$news_id = $match['params']['nid'];
$news_json = getSingleNews($news_id);
?>

<link rel="stylesheet" type="text/css" href="<?=$web_host?>css/news.css">
<script type="text/javascript">

json_string = '<?php echo addslashes($news_json); ?>'

if (json_string) {
    news_obj = JSON.parse('<?php echo addslashes($news_json); ?>')
}
else {
    news_obj = ''
}

</script>
<script src="<?=$web_host?>js/news.js" type="text/javascript"></script>

<script>
  var el = document.createElement('script');
  el.type = 'application/ld+json';
  el.text = JSON.stringify({
    "@context": "http://schema.org",
    "@type": "WebPage",
    "url": window.location.href,
    "name": "What's New | Canadian Filmmakers Distribution Centre"
  });
  document.querySelector('body').appendChild(el);
</script>