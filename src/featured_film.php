<?php

$host = "http://www.testing.cfmdc.org/";

function getFeaturedFilmsJson() {
    global $host; 
    
    $cms_featured_film_url = $host . "cms/api/featured_films/?_format=xml";

    $data_cms = simplexml_load_string(file_get_contents_retry($cms_featured_film_url));

    if (!$data_cms) {
            return "";
    }

    $featured_films_obj = getFeaturedFilms($data_cms);

    return utf8_decode(json_encode(utf8ize($featured_films_obj), JSON_UNESCAPED_UNICODE));
}

function getFeaturedFilms($obj) {
    $featured_film = array();

    for ($i = 0; $i < count($obj->item); $i++) {
        $featured_film[] = getFeaturedFilm($obj->item[$i]);
    }
    return $featured_film;
}

function getFeaturedFilm($obj) {
    global $host; 
    $featured_film = array();
    $featured_film['image_url'] = (string) $obj->field_banner_image->url;
    $featured_film['title'] = (string) $obj->title->value;
    $featured_film['filmmaker'] = (string) $obj->field_filmmaker->value;
    $featured_film['film_id'] = $host . "film/" . (string) $obj->field_film_id_number->value;

    return $featured_film;
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