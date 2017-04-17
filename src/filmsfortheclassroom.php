<?php
require 'src/getCompLinks.php';

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