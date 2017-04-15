<?php

require 'src/featured_film.php';
require 'src/facebook.php';
require 'src/news_json.php';
require 'src/recent_aquisitions_json.php';

$featured_film_json = getFeaturedFilmsJson();
$facebook_json = getFacebookPosts();
$news_json = getAllNews();
$recent_aquisitions_json = getRecentAquisitions();

if(session_status()==1) {
    @session_start();
}

?>

<link rel="stylesheet" type="text/css" href="addons/flickity.min.css">
<link rel="stylesheet" type="text/css" href="css/home.css">


<script type="text/javascript">
message = '<?= $_SESSION["message"] ?>';
warning = '<?= $_SESSION["warning"] ?>';
<?php
unset($_SESSION["message"]);
unset($_SESSION["warning"]);
?>

featured_film_json = JSON.parse('<?php echo addslashes($featured_film_json); ?>')
facebook_json = JSON.parse('<?php echo addslashes($facebook_json); ?>')
news_json = JSON.parse('<?php echo addslashes($news_json); ?>')
recent_aquisitions_json = JSON.parse('<?php echo addslashes($recent_aquisitions_json); ?>')

</script>

<script src="addons/flickity.pkgd.min.js"
        type="text/javascript"></script>
<script src="js/home.js"
        type="text/javascript"></script>