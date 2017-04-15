<?php
require 'src/pages_json.php';

$about_json = getPagesJson(2640);
$mandate_json = getPagesJson(2641);
$vision_json = getPagesJson(2642);
$values_json = getPagesJson(2643);

?>

<link rel="stylesheet" type="text/css" href="<?=$web_host?>css/about.css">
<script type="text/javascript">

json_about_string = '<?php echo addslashes($about_json); ?>'
json_mandate_string = '<?php echo addslashes($mandate_json); ?>'
json_vision_string = '<?php echo addslashes($vision_json); ?>'
json_values_string = '<?php echo addslashes($values_json); ?>'

if (json_about_string) {
    about_json = JSON.parse('<?php echo addslashes($about_json); ?>')
}
else {
    about_json = '';
}

if (json_mandate_string) {
    mandate_json = JSON.parse('<?php echo addslashes($mandate_json); ?>')
}
else {
    mandate_json = '';
}

if (json_vision_string) {
    vision_json = JSON.parse('<?php echo addslashes($vision_json); ?>')
}
else {
    vision_json = '';
}

if (json_values_string) {
    values_json = JSON.parse('<?php echo addslashes($values_json); ?>')
}
else {
    values_json = '';
}

</script>
<script src="<?=$web_host?>js/about.js" type="text/javascript"></script>