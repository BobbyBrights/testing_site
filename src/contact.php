<?php
require 'src/staff_board_json.php';
$staff_json = getStaffJson();
?>

<link rel="stylesheet" type="text/css" href="<?=$web_host?>css/contact.css">
<script type="text/javascript">
json_staff_string = '<?php echo addslashes($staff_json); ?>'

if (json_staff_string) {
    staff_json = JSON.parse('<?php echo addslashes($staff_json); ?>')
}
else {
    staff_json = '';
}
</script>
<script src="<?=$web_host?>js/contact.js" type="text/javascript"></script>

<script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAzRY_ImNu-3xHw0mu_riFlb0_aMHywQUQ&callback=initMap">
</script>

<script type="text/javascript">

</script>