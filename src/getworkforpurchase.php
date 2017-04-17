<?php
//require "film_json.php";
getWorkForPurchaseJson(4153);

function getWorkForPurchaseJson($film_number) {
    $host = "http://s219085.gridserver.com/";

    $cms_work_for_purchase_url = $host . "cms/api/work_for_purchase/" . $film_number . "?_format=xml";

    $data_cms = simplexml_load_string(file_get_contents_retry($cms_work_for_purchase_url));

    //print_r($data_cms);

    if (!$data_cms) {
        return "";
    } else {
        $film_array = array();

        $film_description = (string) $data_cms->item->field_work_description->value; 
        $large_image_url = (string) $data_cms->item->field_large_image->url; 
        $large_image_width = (string) $data_cms->item->field_large_image->width; 
        $large_image_height = (string) $data_cms->item->field_large_image->height;

        $film_array['film_description'] = $film_description;
        $film_array['large_image_url'] = $large_image_url;
        $film_array['large_image_width'] = $large_image_width;
        $film_array['large_image_height'] = $large_image_height;

        //print_r ($film_array);

        $volume_references =  $data_cms->item->field_volume_references;
        $film_array['volumes'] = array();

        $films_id_str =  getVolumeFilmIdsStr($volume_references);

        echo $films_id_str;

        $fmp_film_id_link = str_replace("+", "%2B", $films_id_str);
        //echo $fmp_film_id_link;
        $fmp_link = "http://n462.fmphost.com/fmi/xml/fmresultset.xml?-db=cfmdc_full&-lay=web_film&-script=multi_search_film_id&-script.param=" . $fmp_film_id_link . "&-max=1000&-findall";
        $data_fmp = simplexml_load_string(file_get_contents_retry($fmp_link));

        //print_r($data_fmp);

        $cms_film_url = $host . "cms/api/film_stills/" . $films_id_str . "?_format=xml";
        $data_cms_stills = simplexml_load_string(file_get_contents_retry($cms_film_url));
        $still_data = getStillData($data_cms_stills);
        $combined_data = combine_data($data_fmp, $still_data);
        //print_r($combined_data);

        for ($i=0; $i < count($volume_references); $i++) {
            $nid = $volume_references[$i]->field_volume_reference->target_id;
            $film_array['volumes'][] = getVolume($nid, $combined_data);
        }

        //print_r($film_array);

        return utf8_decode(json_encode(utf8ize($film_array), JSON_UNESCAPED_UNICODE));
    }  
}

function getStillData($data) {
    $film_stills = array();
    for ($i=0; $i<count($data->item); $i++) {
        $film_id = (string) $data->item[$i]->field_filemaker_film_id->value;
        $film_stills[$film_id] = array();
        $old_still = (string) $data->item[$i]->field_old_web_still_optional_->url;
        $medium_still = (string) $data->item[$i]->field_medium_film_still_740_x_41->url;

        if ($medium_still && file_exists_($medium_still)) {
            $film_stills[$film_id]['still'] = $medium_still;
            $image_size = getimagesize($film_stills[$film_id]['still']);
            $film_stills[$film_id]['still_width'] = (string) $image_size[0];
            $film_stills[$film_id]['still_height'] = (string) $image_size[1];
        }

        else if ($old_still && file_exists_($old_still)) {
            $film_stills[$film_id]['still'] = $old_still;
            $image_size = getimagesize($film_stills[$film_id]['still']);
            $film_stills[$film_id]['still_width'] = (string) $image_size[0];
            $film_stills[$film_id]['still_height'] = (string) $image_size[1];
        }
    }
    return $film_stills;
}

function combine_data($data_fmp, $still_data) {
    $combined_data = array();
    for ($i=0; $i < count($data_fmp->resultset->record); $i++) {

        $film_title = (string) $data_fmp->resultset->record[$i]->field[0]->data;
        $client_id_number = (string) $data_fmp->resultset->record[$i]->field[1]->data;
        $filmmaker_name = (string) $data_fmp->resultset->record[$i]->field[2]->data;
        $secondary_filmmaker = (string) $data_fmp->resultset->record[$i]->field[3]->data;

        $film_synopsis = (string) $data_fmp->resultset->record[$i]->field[4]->data;
        $year = (string) $data_fmp->resultset->record[$i]->field[5]->data;
        $length = (string) $data_fmp->resultset->record[$i]->field[6]->data;
        $country = (string) $data_fmp->resultset->record[$i]->field[7]->data;

        $sound = (string) $data_fmp->resultset->record[$i]->field[8]->data;
        $language = (string) $data_fmp->resultset->record[$i]->field[9]->data;
        $colour = (string) $data_fmp->resultset->record[$i]->field[10]->data;
        $genre = strtolower((string) $data_fmp->resultset->record[$i]->field[11]->data);

        $film_id_number = (string) $data_fmp->resultset->record[$i]->field[12]->data;

        $combined_data[$film_id_number] = array();

        $film_title_regex = preg_replace("|/|", "\/", $film_title);
        
        $sanitized_synopsis = convertQuotes($film_synopsis);
        $regex_string_result = preg_replace('/(?i)([\'"\“\‘]'.$film_title_regex.'[\'"\”\’])/', "---*---*---",$sanitized_synopsis);
        $regex_string_result = preg_replace('/('.preg_quote("---*---*---").')/', "<b>$film_title</b>",$regex_string_result);
        $regex_string_result = preg_replace("/([\n\r]+$)/", '', $regex_string_result);
        $regex_string_result = preg_replace("/([\n\r])/", '<br/>', $regex_string_result);

        $combined_data[$film_id_number]["film_title"] = $film_title;
        $combined_data[$film_id_number]["client_id_number"] = $client_id_number;
        $combined_data[$film_id_number]["filmmaker_name"] = getMainFilmmakerName($filmmaker_name);
        if ($secondary_filmmaker) {
            $combined_data[$film_id_number]["secondary_filmmaker"] = getFilmmakerName($secondary_filmmaker);
        }
        $combined_data[$film_id_number]["film_synopsis"] = $regex_string_result;
        $combined_data[$film_id_number]["year"] = $year;

        if (strpos($length, ':') === false && !ctype_alpha($length)) {
            $combined_data[$film_id_number]["length"] = getTimeString($length);
        } 
        else {
            $combined_data[$film_id_number]["length"] = $length;
        } 
        
        $combined_data[$film_id_number]["country"] = $country;
        $combined_data[$film_id_number]["sound"] = $sound;
        $combined_data[$film_id_number]["language"] = $language;
        $combined_data[$film_id_number]["colour"] = $colour;

        if ($still_data[$film_id_number]) {
            $combined_data[$film_id_number]["still"] = $still_data[$film_id_number]["still"];
            $combined_data[$film_id_number]["still_width"] = $still_data[$film_id_number]["still_width"];
            $combined_data[$film_id_number]["still_height"] = $still_data[$film_id_number]["still_height"];
        }
    }

    return $combined_data;
}

function getVolumeFilmIdsStr($volume_references) {
    $host = "http://s219085.gridserver.com/";
    $film_ids = array();

    for ($i=0; $i < count($volume_references); $i++) {
        $nid = $volume_references[$i]->field_volume_reference->target_id;
        
        $cms_work_for_purchase_url = $host . "cms/api/work_for_purchase_volume/" . $nid . "?_format=xml";

        $data_cms = simplexml_load_string(file_get_contents_retry($cms_work_for_purchase_url));

        //print_r($data_cms);

        $volumes_contents = $data_cms->item->field_volume_contents;

        for ($j=0; $j < count($volumes_contents); $j++) {
            $film_id = (string) $volumes_contents[$j]->field_film_id_volume->value;
            if ($film_id) {
                $film_ids[] = $film_id;
            }
        }
    }

    //print_r($film_ids);

    $film_ids_str = "";

    for ($i=0; $i < count($film_ids); $i++) {
        if ($i != (count($film_ids) - 1)) {
            $film_ids_str .= $film_ids[$i] . "+";
        }
        else {
            $film_ids_str .= $film_ids[$i];
        }
    }

    return $film_ids_str;
}


function getFilmIdsStr($film_records) {
    $film_number_str = "";
    for ($i=0; $i<count($film_records); $i++) {
        $film_number_str .= (string) $film_records[$i]->field_film_id->value . "+";
    }
    if (!empty($film_number_str)) {
        $film_number_str = substr(trim($film_number_str), 0, -1);
    }
    return $film_number_str;
}


function getVolume($nid, $combined_data) {
    $host = "http://s219085.gridserver.com/";

    $cms_work_for_purchase_url = $host . "cms/api/work_for_purchase_volume/" . $nid . "?_format=xml";

    $data_cms = simplexml_load_string(file_get_contents_retry($cms_work_for_purchase_url));

    $volume_array = array();

    $volume_array['additional_text'] = (string) $data_cms->item->field_additional_text->value; 
    $volume_array['volume_title'] = (string) $data_cms->item->field_volume_title->value; 
    $volume_array['link_colour'] = (string) $data_cms->item->field_list_colour->value; 

    // get study guides
    $study_guides = $data_cms->item->field_study_guides;
    $study_guides_array = array();

    for ($j=0; $j < count($study_guides); $j++) {
        $study_guide_array = array();
        $study_guide_array['link'] = (string) $study_guides->field_link_text->value;
        $study_guide_array['url'] = (string) $study_guides->field_study_guide_file->url;
        $study_guides_array[] = $study_guide_array;
    }

    $volume_array['study_guides'] = $study_guides_array;

    $volumes_contents = $data_cms->item->field_volume_contents;
    $volumes_contents_array = array();

    for ($j=0; $j < count($volumes_contents); $j++) {
        $volume_contents_array = array();
        $film_id = (string) $volumes_contents[$j]->field_film_id_volume->value;
        $country = (string) $volumes_contents[$j]->field_country->value;
        $description = (string) $volumes_contents[$j]->field_film_description_volume->value;
        $filmmakers = (string) $volumes_contents[$j]->field_filmmaker_s_->value;
        $title = (string) $volumes_contents[$j]->field_film_title->value;
        $length = (string) $volumes_contents[$j]->field_length->value;
        $year = (string) $volumes_contents[$j]->field_year->value;
        $image_url = (string) $volumes_contents[$j]->field_thumbnail->url;
        $image_width = (string) $volumes_contents[$j]->field_thumbnail->width;
        $image_height = (string) $volumes_contents[$j]->field_thumbnail->height;
        $sound = (string) $volumes_contents[$j]->field_sound->url;

        if ($film_id && $combined_data[$film_id]) {

            $film_obj = $combined_data[$film_id];

            if (!$country) {
                $country = $film_obj['country'];
            }

            if (!$description) {
                $description = $film_obj['film_synopsis'];
            }

            if (!$title) {
                $title = $film_obj['film_title'];
            }

            if (!$length) {
                $length = $film_obj['length'];
            }

            if (!$year) {
                $year = $film_obj['year'];
            }

            if (!$image_url) {
                $image_url = $film_obj['still'];
                $image_height = $film_obj['still_height'];
                $image_width = $film_obj['still_width'];
            }

            if (!$sound) {
                $sound = $film_obj['sound'];
            }
        }

        $volume_contents_array['country'] = $country;
        $volume_contents_array['description'] = $description;
        $volume_contents_array['filmmakers'] = $filmmakers;
        $volume_contents_array['title'] = $title;
        $volume_contents_array['length'] = $length;
        $volume_contents_array['image_url'] = $image_url;
        $volume_contents_array['still_width'] = $image_width;
        $volume_contents_array['still_height'] = $image_height;
        $volume_contents_array['sound'] = $sound;

        $volumes_contents_array[] = $volume_contents_array;
    }

    $volume_array['volumes_contents'] = $volumes_contents_array;

    return $volume_array;
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
        return "<b>" . trim($init_exp[1]) . " " . trim($init_exp[0]) . "</b>";
    }
    else {
        return "<b>" . $filmmaker . "</b>";
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
?>