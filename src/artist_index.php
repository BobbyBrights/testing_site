<?php
require 'src/artist_index_json.php';

$alpha = $match['params']['alpha'];
if (!$alpha) {
    $alpha = "a";
}

$artist_index_json = getArtistList($alpha);
?>

<link rel="stylesheet" type="text/css" href="<?=$web_host?>css/artist_index.css">
<script type="text/javascript">
json_string = '<?php echo addslashes($artist_index_json); ?>'

artist_index_obj = '';
if (json_string) {
    artist_index_obj = JSON.parse('<?php echo addslashes($artist_index_json); ?>');
    alpha = '<?php echo $alpha; ?>';
}

</script>
<script src="<?=$web_host?>js/artist_index.js" type="text/javascript"></script>