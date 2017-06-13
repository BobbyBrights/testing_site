<?php
require 'src/search_json.php';

$query = $match['params']['query'];
$page = $match['params']['page'];
$increment = 20;

//print(urldecode($query));

$search_json = getSearchJson($query, $page, $increment);
?>

<link rel="stylesheet" type="text/css" href="<?=$web_host?>css/search.css">
<script type="text/javascript">
json_string = '<?php echo addslashes($search_json); ?>'

search_obj = '';
if (json_string) {
    search_obj = JSON.parse('<?php echo addslashes($search_json); ?>');
    increment = <?php echo $increment; ?>;
    page = <?php echo $page; ?>;
    query = '<?php echo $query; ?>';
}
else {
    search_obj = '';
}
</script>
<script src="<?=$web_host?>js/search.js" type="text/javascript"></script>
<script src="<?=$web_host?>js/jquery.visible.js" type="text/javascript"></script>