<?php

 if(session_status()==1) {
    @session_start();
}

function getFilmJson($film_number) {

    if (isset($_SESSION['loggedin']) && $_SESSION['loggedin']) {
        $user_type = $_SESSION['user_type'];
    }
    else {
        $user_type = 0;
    }

    $host = "http://www.cfmdc.org/";

    $fmpro_film_url = "http://n462.fmphost.com/fmi/xml/fmresultset.xml?-db=cfmdc_full&-lay=web_film&FilmIDnumber=" . $film_number . "&-max=1&-find";
    $cms_film_url = $host . "cms/api/film_stills/" . $film_number . "?_format=xml";


    $data_fmpro = simplexml_load_string(file_get_contents_retry($fmpro_film_url));
    $data_cms = simplexml_load_string(file_get_contents_retry($cms_film_url));

    if (!$data_fmpro | $data_fmpro->resultset['count'] == 0) {
        return "";
    } else {

        $old_still = (string) $data_cms->item->field_old_web_still_optional_->url;
        $large_still = (string) $data_cms->item->field_large_film_still_1920_x_10->url;
        $medium_still = (string) $data_cms->item->field_medium_film_still_740_x_41->url;
        $small_still = (string) $data_cms->item->field_small_film_still_240_x_135->url;

        $film_title = (string) $data_fmpro->resultset->record->field[0]->data;
        $client_id_number = (string) $data_fmpro->resultset->record->field[1]->data;
        $filmmaker_name = (string) $data_fmpro->resultset->record->field[2]->data;
        $secondary_filmmaker = (string) $data_fmpro->resultset->record->field[3]->data;

        $film_synopsis = (string) $data_fmpro->resultset->record->field[4]->data;
        $year = (string) $data_fmpro->resultset->record->field[5]->data;
        $length = (string) $data_fmpro->resultset->record->field[6]->data;
        $country = (string) $data_fmpro->resultset->record->field[7]->data;

        $sound = (string) $data_fmpro->resultset->record->field[8]->data;
        $language = (string) $data_fmpro->resultset->record->field[9]->data;
        $colour = (string) $data_fmpro->resultset->record->field[10]->data;
        $genre = strtolower((string) $data_fmpro->resultset->record->field[11]->data);

        $film_id_number = (string) $data_fmpro->resultset->record->field[12]->data;
        $is_publishable = (string) $data_fmpro->resultset->record->field[13]->data;
        $vucavu_url = (string) $data_fmpro->resultset->record->field[14]->data;
        $old_preview_url_full = (string) $data_fmpro->resultset->record->field[15]->data;

        $vimeo_preview_full_id = (string) $data_fmpro->resultset->record->field[16]->data;
        $old_preview_url_clip = (string) $data_fmpro->resultset->record->field[17]->data;
        $vimeo_preview_clip_id = (string) $data_fmpro->resultset->record->field[18]->data;
        $category = strtolower((string) $data_fmpro->resultset->record->field[19]->data);

        $exhibition_format = strtolower((string) $data_fmpro->resultset->record->field[20]->data);

        // Provides Chicago style to synopsis
        $film_title_regex = preg_replace("|/|", "\/", $film_title);
        
        $sanitized_synopsis = convertQuotes($film_synopsis);
        $regex_string_result = preg_replace('/(?i)([\'"\“\‘]'.$film_title_regex.'[\'"\”\’])/', "---*---*---",$sanitized_synopsis);
        $regex_string_result = preg_replace('/('.preg_quote("---*---*---").')/', "<b>$film_title</b>",$regex_string_result);
        $regex_string_result = preg_replace("/([\n\r]+$)/", '', $regex_string_result);
        $regex_string_result = preg_replace("/([\n\r])/", '<br/>', $regex_string_result);

        $json_film = array();
        $json_film["film_title"] = $film_title;
        $json_film["client_id_number"] = $client_id_number;
        $json_film["raw_names"] = $filmmaker_name . " " . $secondary_filmmaker;
        $json_film["filmmaker_name"] = getMainFilmmakerName($filmmaker_name);
        if ($secondary_filmmaker) {
            $json_film["secondary_filmmaker"] = getFilmmakerName($secondary_filmmaker);
        }
        $json_film["film_synopsis"] = $regex_string_result;
        $json_film["year"] = $year;

        if (strpos($length, ':') === false && !ctype_alpha($length)) {
            $json_film["length"] = getTimeString($length);
        } 
        else {
            $json_film["length"] = $length;
        } 
        
        $json_film["country"] = $country;
        $json_film["sound"] = $sound;
        $json_film["language"] = $language;
        $json_film["colour"] = $colour;
        $json_film["genre"] = explode("*", $genre);
        $json_film["film_id_number"] = $film_id_number;
        $json_film["is_publishable"] = $is_publishable;
        $json_film["vucavu_url"] = $vucavu_url;
        $json_film["category"] = explode("*", $category);
        $json_film["exhibition_format"] = explode("*", $exhibition_format);

        if ($user_type > 0) {
            $json_film["old_preview_url_full"] = $old_preview_url_full;
            $json_film["vimeo_preview_full_id"] = $vimeo_preview_full_id;
        }

        $json_film["old_preview_url_clip"] = $old_preview_url_clip;
        $json_film["vimeo_preview_clip_id"] = $vimeo_preview_clip_id;

        if ($medium_still && file_exists_($medium_still)) {
            $json_film['still'] = $medium_still;
        }

        else if ($old_still && file_exists_($old_still)) {
            $json_film['still'] = $old_still;
        }

        $json_film["user_type"] = (string) $user_type;

        if (intval($is_publishable)) {
            return utf8_decode(json_encode(utf8ize($json_film), JSON_UNESCAPED_UNICODE));
        }
        else {
            return "";
        }
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

function getMainFilmmakerName($filmmaker) {
    $init_exp = explode(",", $filmmaker);
    if (count($init_exp) > 1) {
        return "<b>" . trim($init_exp[1]) . " " . trim($init_exp[0]) . "</b>";
    }
    else {
        return "<b>" . $filmmaker . "</b>";
    }
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

function convert_accent($string)
{
    echo($string);
    return htmlspecialchars_decode(htmlentities(utf8_decode($string)));
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

?>