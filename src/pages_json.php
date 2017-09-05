<?php

$host = "http://www.testing.cfmdc.org/";

//echo getPagesJson(2643);

function getPagesJson($id) {
    global $host; 

    $cms_pages_url = $host . "cms/api/page/" . $id . "?_format=xml";

    $data_cms = simplexml_load_string(file_get_contents_retry($cms_pages_url));

    if (!$data_cms) {
            return "";
    }

    $page_obj = getPage($data_cms);

    return utf8_decode(json_encode(utf8ize($page_obj), JSON_UNESCAPED_UNICODE));

}

function getPage($obj) {
    $page = array();
    $page['body'] = (string) $obj->item->body->value;

    $page['body'] = preg_replace ("/<p>(\s*)/", "", $page['body']);
    $page['body'] = preg_replace ("/(\s*)<\/p>(\s*)/", "<br><br>", $page['body']);
    $page['body'] = preg_replace ("/<br><br>$/", "", $page['body']);
    $page['body'] = preg_replace ("/<br><br>&nbsp;<br><br>/", "<br><br><br>", $page['body']);
    $page['body'] = preg_replace ("/<strong>/", "<b>", $page['body']);
    $page['body'] = preg_replace ("/<\/strong>/", "</b>", $page['body']);

    $page['body'] = convertQuotes($page['body']);

    $page['images'] = array();

    for ($i = 0; $i < count($obj->item->field_images); $i++) {
        $page['images'][] = (string) $obj->item->field_images[$i]->url;
    }

    return $page;
}


function convertQuotes($str) {
    $str = str_replace("‘", "'", $str);
    $str = str_replace("’", "'", $str);
    $str = str_replace("“", '"', $str);
    $str = str_replace("”", '"', $str);
    $str = str_replace("–", "-", $str);
    $str = str_replace("…", "...", $str);
    return $str;
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

?>

