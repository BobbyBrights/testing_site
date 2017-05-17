<?php

//getComp("2503");

function getComp($nid) {
    $host = "http://www.cfmdc.org/";

    $cms_comp_url = $host . "cms/api/classcomps?_format=xml";

    $data_cms = simplexml_load_string(file_get_contents_retry($cms_comp_url));

    $records = getCompDetails($data_cms->item, $nid);

    if (empty($records)) {
        return "";
    }

    $film_id_str = getFilmIdsStr($records['films']);

    if (!empty($film_id_str)) {
        $fmp_film_id_link = str_replace("+", "%2B", $film_id_str);
        $fmp_link = "http://n462.fmphost.com/fmi/xml/fmresultset.xml?-db=cfmdc_full&-lay=web_film&-script=multi_search_film_id&-script.param=" . $fmp_film_id_link . "&-max=1000&-findall";

        $data_fmp = simplexml_load_string(file_get_contents_retry($fmp_link));

        $cms_film_url = $host . "cms/api/film_stills/" . $film_id_str . "?_format=xml";

        $data_cms_stills = simplexml_load_string(file_get_contents_retry($cms_film_url));

        $allrecords = getFilmRecords($data_fmp->resultset->record, $data_cms_stills->item, $records['films']);

       $records['films'] = $allrecords;

       return utf8_decode(json_encode(utf8ize($records), JSON_UNESCAPED_UNICODE)); //json_encode($records);

    }

    return "";
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

function getFilmRecords($filmrecords, $cmsrecords, $comp_records) {
    $allrecords = array();

    //print_r($comp_records[0]);

    for ($i=0; $i<count($filmrecords); $i++) {
        $isPublishable = intval((string) $filmrecords[$i]->field[13]->data);
        if ($isPublishable) {
            $film_id = intval($filmrecords[$i]->field[12]->data);
            $comp_records_index = findID($film_id, $comp_records);
            if ($comp_records_index != -1) {
                $record = getCMSrecord($filmrecords[$i], $cmsrecords, $comp_records[$comp_records_index]);
                $allrecords[] = $record;
            }
        }
    }

    return $allrecords;
}

function findID($film_id, $comp_records) {
    for ($j=0; $j<count($comp_records); $j++) {
        if (intval($comp_records[$j]->field_classroom_id->value) == $film_id) {
            return $j;
        }
    }
    return -1;
}

function getMainFilmmakerName($filmmaker) {
    $init_exp = explode(",", $filmmaker);
    if (count($init_exp) > 1) {
        return "<b>" . trim($init_exp[1]) . " " . trim($init_exp[0]) . "</b>";
    }
    else {
        return "<b>" . $filmmaker . "</b>";
    }
}

function getCMSrecord($filmrecord, $records, $compRecord) {
    $record = array();

    if ($compRecord->field_film_description->value) {
        $record['description'] = (string) $compRecord->field_film_description->value;
    }
    else {
        $record['description'] = (string) $filmrecord->field[21]->data;
    }

    $record['description'] = (string) $compRecord->field_film_description_classroom->value;
    $record['description'] = preg_replace ("/<p>(\s*)/", "", $record['description']);
    $record['description'] = preg_replace ("/(\s*)<\/p>(\s*)/", "<br><br>", $record['description']);
    $record['description'] = preg_replace ("/<br><br>$/", "", $record['description']);
    $record['description'] = convertQuotes($record['description']);

    $record['year'] = (string) $filmrecord->field[5]->data;
    $record['film_id'] = (string) $filmrecord->field[12]->data;
    $record['title'] = (string) $filmrecord->field[0]->data;
    $record['filmmaker_name'] = getMainFilmmakerName((string) $filmrecord->field[2]->data);
    $record['filmmaker_id'] = (string) $filmrecord->field[1]->data;
    if ((string) $filmrecord->field[3]->data) {
       $record['secondary_filmmaker'] = getFilmmakerName((string) $filmrecord->field[3]->data);
    }
    $record['country'] = (string) $filmrecord->field[7]->data;
    //$record['length'] = getTimeString((string) $filmrecord->field[3]->data);

     if ((string) $filmrecord->field[6]->data) {
        if (strpos((string) $filmrecord->field[3]->data, ':') === false && !ctype_alpha((string) $filmrecord->field[3]->data)) {
            $record["length"] = getTimeString((string) $filmrecord->field[6]->data);
        } 
        else {
            $record["length"] = (string) $filmrecord->field[6]->data;
        }
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
            $final_str .= ($i > 0 ? " & <b>" . trim($name_exp[0]) . '</b>': "<b>" . trim($name_exp[0]) . '</b>');
        }
        else {
            $final_str .= ($i > 0 ? " & <b>" . trim($name_exp[1]) . " " . trim($name_exp[0]) . '</b>': "<b>" . trim($name_exp[1]) . " " . trim($name_exp[0]) . '</b>');
        }
    }
	
    return $final_str;
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

function getFilmIdsStr($film_records) {
    $film_number_str = "";
    for ($i=0; $i<count($film_records); $i++) {
        $film_number_str .= (string) $film_records[$i]->field_classroom_id->value . "+";
    }
    if (!empty($film_number_str)) {
        $film_number_str = substr(trim($film_number_str), 0, -1);
    }
    return $film_number_str;
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

function getCompDetails($records, $nid) {
    $record = array();
    for ($i=0; $i<count($records); $i++) {
        if ((int) $records[$i]->nid->value == (int) $nid) {
            $record['title'] = (string) $records[$i]->title->value;
            $record['description'] = (string) $records[$i]->field_classroom_description->value;

            $record['description'] = preg_replace ("/<p>(\s*)/", "", $record['description']);
            $record['description'] = preg_replace ("/(\s*)<\/p>(\s*)/", "<br><br>", $record['description']);
            $record['description'] = preg_replace ("/<br><br>$/", "", $record['description']);
            $record['description'] = convertQuotes($record['description']);

            $record['films'] = $records[$i]->field_compilation_films;
        }
    }
    return $record;
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