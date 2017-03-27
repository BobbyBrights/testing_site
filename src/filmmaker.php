<?php
require 'src/filmmaker_json.php';
$filmmaker_json = getFilmmakerJson($match['params']['filmmaker_id']);
?>

<link rel="stylesheet" type="text/css" href="<?=$web_host?>css/filmmaker.css">
<script type="text/javascript">
json_string = '<?php echo addslashes($filmmaker_json); ?>'
if (json_string) {
    filmmaker_obj = JSON.parse('<?php echo addslashes($filmmaker_json); ?>')
}
else {
    filmmaker_obj = '';
}
</script>
<script src="<?=$web_host?>js/filmmaker.js" type="text/javascript"></script>