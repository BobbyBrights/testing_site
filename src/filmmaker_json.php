<?php

function getFilmmakerJson($client_number) {
    $host = "http://testing.cfmdc.org/";

    $fmpro_film_url = "http://n462.fmphost.com/fmi/xml/fmresultset.xml?-db=cfmdc_full&-lay=web_client&ClientIDnumber=" . $client_number . "&-max=1&-find";

    $data_fmpro = simplexml_load_string(file_get_contents_retry($fmpro_film_url));

    if ($data_fmpro && $data_fmpro->resultset->record->field[1]->data != false && $data_fmpro->resultset->record->field[1]->data != "client") {
        $json_client = array();
        $json_client['filmmaker_name'] = getMainFilmmakerName((string) $data_fmpro->resultset->record->field[0]->data);
        $json_client['biography'] = convertQuotes((string) $data_fmpro->resultset->record->field[2]->data);

        $json_client['biography'] = preg_replace("/([\n\r]+$)/", '', $json_client['biography']);
        $json_client['biography']= preg_replace("/([\n\r])/", '<br/>', $json_client['biography']);

        $film_records = $data_fmpro->resultset->record->relatedset->record;
        $cms_films_str = getFilmIdStr($film_records);
        $cms_film_url = $host . "cms/api/film_stills/" . $cms_films_str . "?_format=xml";

        $data_cms = simplexml_load_string(file_get_contents_retry($cms_film_url));

        $allrecords = getFilmRecords($film_records, $data_cms->item);

        $json_client['filmography'] = $allrecords;
        return json_encode($json_client);
    }
    else{
        return "";
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

function convertQuotes($str) {
    $str = str_replace("‘", "'", $str);
    $str = str_replace("’", "'", $str);
    $str = str_replace("“", '"', $str);
    $str = str_replace("”", '"', $str);
    return $str;
}

function getFilmRecords($filmrecords, $cmsrecords) {
    $allrecords = array();

    for ($i=0; $i<count($filmrecords); $i++) {
        $isPublishable = intval((string) $filmrecords[$i]->field[4]->data);
        if ($isPublishable) {
            $record = getCMSrecord($filmrecords[$i], $cmsrecords);
            $allrecords[] = $record;
        }
    }

    return $allrecords;
}

function getCMSrecord($filmrecord, $records) {
    $record = array();

    $record['year'] = (string) $filmrecord->field[0]->data;
    $record['film_id'] = (string) $filmrecord->field[1]->data;
    $record['title'] = (string) $filmrecord->field[2]->data;
    //$record['length'] = getTimeString((string) $filmrecord->field[3]->data);

    if (strpos((string) $filmrecord->field[3]->data, ':') === false && !ctype_alpha((string) $filmrecord->field[3]->data)) {
        $record["length"] = getTimeString((string) $filmrecord->field[3]->data);
    } 
    else {
        $record["length"] = (string) $filmrecord->field[3]->data;
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


function getFilmIdStr($filmRecords) {
    $film_id_str = "";
    for ($i=0; $i<count($filmRecords); $i++) {
        $film_id = (string) $filmRecords[$i]->field[1]->data;
        if ($film_id) {
            $film_id_str .= $film_id;
            if ($i != (count($filmRecords) - 1)) {
                $film_id_str .= ',';
            }
        }
    }
    return $film_id_str;
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
            $final_str .= ($i > 0 ? " & <b>" . trim($name_exp[0]) . '</b>': "<b>" . trim($name_exp[0]) . '</b>');
        }
        else {
            $final_str .= ($i > 0 ? " & <b>" . trim($name_exp[1]) . " " . trim($name_exp[0]) . '</b>': "<b>" . trim($name_exp[1]) . " " . trim($name_exp[0]) . '</b>');
        }
    }
	
    return $final_str;
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

// function getTimeString($length) {
//     $time_explode = explode(".", $length);
    
//     if (count($time_explode) == 1) {
//         $mins = $time_explode[0];
//         $seconds = "0";
//     }
//     else {
//         $mins = $time_explode[0];
//         $seconds = $time_explode[1];
//     }

//     $mins_int = intval($mins);
//     $hours_int = floor($mins_int/60);

//     //echo $hours_int;

//     if (intval($seconds) < 10) {
//         $seconds_str = "0" . intval($seconds);
//     }
//     else {
//         $seconds_str = $seconds;
//     }

//     if ($hours_int == 0) {
//         return $mins . ":" . $seconds_str;
//     }
//     else {
//         $mins_int = $mins_int - ($hours_int * 60);
//          if (intval($mins_int) < 10) {
//             $mins_str = "0" . $mins_int;
//         }
//         else {
//             $mins_str = $mins_int;
//     }
//         return $hours_int . ":" . $mins_str . ":" . $seconds_str;
//     }
// }
?>