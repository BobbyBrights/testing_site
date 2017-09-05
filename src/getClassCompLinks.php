<?php

//echo getCompLinks();

function getCompLinks() {
    $host = "http://testing.cfmdc.org/";

    $cms_comp_url = $host . "cms/api/classcomps?_format=xml";

    $data_cms = simplexml_load_string(file_get_contents_retry($cms_comp_url));

    //print_r($data_cms);

    $records = getAllCompLinks($data_cms->item);

    return json_encode($records);
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

function getAllCompLinks($records) {
    $records_returned = array();
    for ($i=0; $i<count($records); $i++) {
        $record = array();
        $record['nid'] = (string) $records[$i]->nid->value;
        $record['title'] = (string) $records[$i]->title->value;
        $record['colour'] = (string) $records[$i]->field_classroom_colour->value;
        $record['image'] = (string) $records[$i]->field_backgroun->url;

        if ($record['image'] && file_exists_($record['image'])) {
            $image_size = getimagesize($record['image']);
            $record['still_width'] = (string) $image_size[0];
            $record['still_height'] = (string) $image_size[1];
        }

        $records_returned[] = $record;
    }
    return $records_returned;
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

?>