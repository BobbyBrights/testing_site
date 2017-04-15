<?php
require 'src/pages_json.php';
$pages_json = getPagesJson(2624);
?>

<link rel="stylesheet" type="text/css" href="<?=$web_host?>css/links.css">
<script type="text/javascript">
json_string = '<?php echo addslashes($pages_json); ?>'
if (json_string) {
    pages_json = JSON.parse('<?php echo addslashes($pages_json); ?>')
}
else {
    pages_json = '';
}
</script>
<script src="<?=$web_host?>js/links.js" type="text/javascript"></script>