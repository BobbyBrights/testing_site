<?php
require 'src/getComp.php';
$filmmaker_json = getComp($match['params']['nid']);
?>

<link rel="stylesheet" type="text/css" href="<?=$web_host?>css/compilations.css">
<script type="text/javascript">
json_string = '<?php echo addslashes($filmmaker_json); ?>'
if (json_string) {
    filmmaker_obj = JSON.parse('<?php echo addslashes($filmmaker_json); ?>')
}
else {
    filmmaker_obj = '';
}
</script>
<script src="<?=$web_host?>js/filmsfortheclassroom.js" type="text/javascript"></script>