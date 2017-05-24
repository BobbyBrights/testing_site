<?php
require 'src/staff_board_json.php';
$staff_json = getStaffJson();
$board_json = getBoardJson();
?>

<link rel="stylesheet" type="text/css" href="<?=$web_host?>css/staffboard.css">
<script type="text/javascript">
json_staff_string = '<?php echo addslashes($staff_json); ?>'
json_board_string = '<?php echo addslashes($board_json); ?>'

if (json_staff_string) {
    staff_json = JSON.parse('<?php echo addslashes($staff_json); ?>')
}
else {
    staff_json = '';
}

if (json_board_string) {
    board_json = JSON.parse('<?php echo addslashes($board_json); ?>')
}
else {
    board_json = '';
}

</script>
<script src="<?=$web_host?>js/staffboard.js" type="text/javascript"></script>
<script>
  var el = document.createElement('script');
  el.type = 'application/ld+json';
  el.text = JSON.stringify({
    "@context": "http://schema.org",
    "@type": "WebPage",
    "url": window.location.href,
    "name": "Staff + Board | Canadian Filmmakers Distribution Centre"
  });
  document.querySelector('body').appendChild(el);
</script>