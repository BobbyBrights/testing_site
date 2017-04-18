<?php

getRecentAquisitions();

function getRecentAquisitions() {
    $host = "http://s219085.gridserver.com/";

    $fmpro_search_url = "http://n462.fmphost.com/fmi/xml/fmresultset.xml?-db=cfmdc_full&-lay=web_film&-script=promoted_films&-max=1000&-findall";
    $fmpro_cms = simplexml_load_string(file_get_contents_retry($fmpro_search_url));

    if ($fmpro_cms) {

        $fmpro_film_ids = getFilmIdStr($fmpro_cms->resultset->record);

        $cms_film_url = $host . "cms/api/film_stills/" . $fmpro_film_ids . "?_format=xml";

        $data_cms = simplexml_load_string(file_get_contents_retry($cms_film_url));

        $final_record = array();

        for ($k=0; $k<count($fmpro_cms->resultset->record); $k++) {
            print_r($fmpro_cms->resultset->record[$k]);
            $final_record[] = getCMSrecord($fmpro_cms->resultset->record[$k], $data_cms->item);
        }

        return utf8_decode(json_encode(utf8ize($final_record), JSON_UNESCAPED_UNICODE));

    }
    else {
        return "";
    }

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

function getTimeString($length) {
    $time_explode = explode(".", $length);
    
    if (count($time_explode) == 1) {
        $mins = $time_explode[0];
        $seconds = "0";
    }
    else {
        $mins = $time_explode[0];
        $seconds = $time_explode[1];
    }

    $mins_int = intval($mins);
    $hours_int = floor($mins_int/60);

    //echo $hours_int;

    if (intval($seconds) < 10) {
        $seconds_str = "0" . intval($seconds);
    }
    else {
        $seconds_str = $seconds;
    }

    if ($hours_int == 0) {
        return $mins . ":" . $seconds_str;
    }
    else {
        $mins_int = $mins_int - ($hours_int * 60);
         if (intval($mins_int) < 10) {
            $mins_str = "0" . $mins_int;
        }
        else {
            $mins_str = $mins_int;
    }
        return $hours_int . ":" . $mins_str . ":" . $seconds_str;
    }
}

function getMainFilmmakerName($filmmaker) {
    $init_exp = explode(",", $filmmaker);
    if (count($init_exp) > 1) {
        return trim($init_exp[1]) . " " . trim($init_exp[0]);
    }
    else {
        return $filmmaker;
    }
}

function getFilmmakerName($filmmaker) {
    $filmmaker = preg_replace("/\([^)]+\)/","", $filmmaker);

    $name_exp_semi_colon = explode(";", $filmmaker);
    $name_exp_ampersand = explode("&", $filmmaker);
	$name_exp_and = explode(" and", $filmmaker);

    $init_exp = (count($name_exp_semi_colon) > count($name_exp_ampersand) ? $name_exp_semi_colon : $name_exp_ampersand);
	$init_exp = (count($init_exp) > count($name_exp_and) ? $init_exp : $name_exp_and);

    if (strpos($filmmaker, ';') === false && strpos($filmmaker, '&') === false && strpos($filmmaker, ' and') === false) {
        $name_exp_comma = explode(",", $filmmaker);
        if (count($name_exp_comma) > 1) {
            $first_words = count(explode(" ",trim($name_exp_comma[0])));
            $second_words = count(explode(" ",trim($name_exp_comma[1])));
            if($first_words > 1 && $second_words > 1) {
                $init_exp = explode(",", $filmmaker);
            }
        }
    }

    $final_str = "";

    for ($i=0; $i<count($init_exp); $i++) {
        $name_exp = explode(",", $init_exp[$i]);

        if (count($name_exp) < 2) {
            $final_str .= ($i > 0 ? " & " . trim($name_exp[0]) : trim($name_exp[0]));
        }
        else {
            $final_str .= ($i > 0 ? " & " . trim($name_exp[1]) . " " . trim($name_exp[0]) : trim($name_exp[1]) . " " . trim($name_exp[0]));
        }
    }
	
    return $final_str;
}

// function utf8ize($d) {
//     if (is_array($d)) {
//         foreach ($d as $k => $v) {
//             $d[$k] = utf8ize($v);
//         }
//     } else if (is_string ($d)) {
//         $d = str_replace("\xe2\x80\xa8", '\\u2028', $d);
//         $d = str_replace("\xe2\x80\xa9", '\\u2029', $d);
//         return utf8_encode($d);
//     }
//     return $d;
// }

function getCMSrecord($filmrecord, $records) {
    $record = array();

    $record['year'] = (string) $filmrecord->field[5]->data;
    $record['film_id'] = (string) $filmrecord->field[12]->data;
    $record['title'] = (string) $filmrecord->field[0]->data;
    $record["filmmaker_name"] = getMainFilmmakerName((string) $filmrecord->field[2]->data);
    if ($secondary_filmmaker) {
        $record["secondary_filmmaker"] = getFilmmakerName((string) $filmrecord->field[3]->data);
    }
    //$record['length'] = getTimeString((string) $filmrecord->field[3]->data);

    if (strpos((string) $filmrecord->field[6]->data, ':') === false && !ctype_alpha((string) $filmrecord->field[6]->data)) {
        $record["length"] = getTimeString((string) $filmrecord->field[6]->data);
    } 
    else {
        $record["length"] = (string) $filmrecord->field[6]->data;
    }

    for ($i = 0; $i < count($records); $i++) {
        if ((string) $records[$i]->field_filemaker_film_id->value == $record['film_id']) {
            $old_still = (string) $records[$i]->field_old_web_still_optional_->url;
            $medium_still = (string) $records[$i]->field_medium_film_still_740_x_41->url;

            if ($medium_still && file_exists_($medium_still)) {
                $record['still'] = $medium_still;
                $image_size = getimagesize($record['still']);
                $record['still_width'] = (string) $image_size[0];
                $record['still_height'] = (string) $image_size[1];
            }

            else if ($old_still && file_exists_($old_still)) {
                $record['still'] = $old_still;
                $image_size = getimagesize($record['still']);
                $record['still_width'] = (string) $image_size[0];
                $record['still_height'] = (string) $image_size[1];
            }
        }
    }
    
    return $record;
}

function getFilmIdStr($filmRecords) {
    $film_id_str = "";
    for ($i=0; $i<count($filmRecords); $i++) {
        $film_id = (string) $filmRecords[$i]->field[12]->data;
        if ($film_id) {
            $film_id_str .= $film_id;
            if ($i != (count($filmRecords) - 1)) {
                $film_id_str .= ',';
            }
        }
    }
    return $film_id_str;
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

function convertQuotes($str) {
    $str = str_replace("‘", "'", $str);
    $str = str_replace("’", "'", $str);
    $str = str_replace("“", '"', $str);
    $str = str_replace("”", '"', $str);
    $str = str_replace("–", "-", $str);
    $str = str_replace("…", "...", $str);
    return $str;
}

?>