<?php

getWorkForPurchaseJson(3678);

function getWorkForPurchaseJson($film_number) {
    $host = "http://s219085.gridserver.com/";

    $cms_work_for_purchase_url = $host . "cms/api/work_for_purchase/" . $film_number . "?_format=xml";

    $data_cms = simplexml_load_string(file_get_contents_retry($cms_work_for_purchase_url));

    print_r($data_cms);

    if (!$data_cms) {
        return "";
    } else {
        $film_array = array();

        $film_description = (string) $data_cms->item->field_work_description; 
        $large_image_url = (string) $data_cms->item->field_large_image->url; 
        $large_image_width = (string) $data_cms->item->field_large_image->width; 
        $large_image_height = (string) $data_cms->item->field_large_image->height;

        $film_array['film_description'] = $film_description;
        $film_array['large_image_url'] = $large_image_url;
        $film_array['large_image_width'] = $large_image_width;
        $film_array['large_image_height'] = $large_image_height;

        print_r ($film_array);

        $volume_references =  $data_cms->item->field_volume_references;
    }

}

function file_get_contents_retry($url) {
    $a = false;
    $i = 0;
    while($a == false && $i < 10)
    {
        $a = @file_get_contents($url);
        $i++;
        if ($a == false) {
            usleep(10);
        }
    }
    return $a;
}

function utf8ize($d) {
    if (is_array($d)) {
        foreach ($d as $k => $v) {
            $d[$k] = utf8ize($v);
        }
    } else if (is_string ($d)) {
        $d = str_replace("\xe2\x80\xa8", '\\u2028', $d);
        $d = str_replace("\xe2\x80\xa9", '\\u2029', $d);
        return utf8_encode($d);
    }
    return $d;
}

function file_exists_($file_path) {
    $file_headers = @get_headers($file_path);
    
    if( strpos($file_headers[0], '404 Not Found') !== false){
        return false;
    } else if (strpos($file_headers[0], '302 Found') !== false && strpos($file_headers[7], '404 Not Found') !== false){
        return false;
    } else {
        return true;
    }
}

?>