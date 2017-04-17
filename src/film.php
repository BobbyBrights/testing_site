<?php
require 'src/film_json.php';
require 'src/getworkforpurchase.php';

$purchase_json = getWorkForPurchaseJson($match['params']['film_id']);

$film_json = getFilmJson($match['params']['film_id']);
?>

<link rel="stylesheet" type="text/css" href="<?=$web_host?>css/film.css">
<script type="text/javascript">
json_string = '<?php echo addslashes($film_json); ?>'
if (json_string) {
    film_obj = JSON.parse('<?php echo addslashes($film_json); ?>')
}
else {
    film_obj = '';
}
</script>
<script src="<?=$web_host?>js/film.js" type="text/javascript"></script>
<script src="https://content.jwplatform.com/libraries/2d2HEAIU.js" type="text/javascript"></script>