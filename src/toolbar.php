<link rel="stylesheet" type="text/css" href="<?=$web_host?>css/toolbar.css">
<?php
// Retrieving Genre and Category from filemaker
$map_url = "http://n462.fmphost.com/fmi/xml/FMPXMLLAYOUT.xml?-db=cfmdc_full&-lay=web_toolbar_info&-view";

$data = simplexml_load_string(file_get_contents($map_url));

$json_results_categories_genre = "";

if (!$data) {
    echo "Error loading XML\n";
    foreach(libxml_get_errors() as $error) {
        echo "\t", $error->message;
    }
} else {
    $genre = $data->VALUELISTS->VALUELIST[0];
    $category = $data->VALUELISTS->VALUELIST[1];
    
    //print_r($genre);
    
    $category_array = array();
    $genre_array = array();

    for ($i=0; $i<count($genre); $i++) {
        array_push($genre_array, array((string) $genre->VALUE[$i]));
    }

     for ($i=0; $i<count($category); $i++) {
        array_push($category_array, array(strtolower((string) $category->VALUE[$i])));
    }   

    $json_categories_genre = array("genre"=> $genre_array, "category"=> $category_array);

    ?>
<script type="text/javascript"> 
categories_genre_obj = JSON.parse('<?php echo json_encode($json_categories_genre); ?>');
</script>
<script src="<?=$web_host?>js/toolbar.js"
        type="text/javascript"></script>
    <?php
}
?>
