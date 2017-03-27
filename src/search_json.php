<?php

//echo getSearchJson("(%26)(%26)(%26)(%26)2016..2017(%26)(%26)", "1", 20);

function getSearchJson($query_str, $page_number, $increment) {

    $split_query = explode("(%26)" , $query_str);

    $categories_genre = getCategoriesGenre();

    // is this an incorrect query and/or non number page
    if ($categories_genre == '' || count($split_query) != 7 || !is_numeric($page_number) || query_empty($split_query)) {
        return "";
    }

    $query_text = str_from_query($split_query, $categories_genre);

    $fmpro_search_url = "http://n462.fmphost.com/fmi/xml/fmresultset.xml?-db=cfmdc_full&-lay=web_film&-script=full_search&-script.param=" . $query_str . "&-max=1000&-findall";

    $data_fmpro = simplexml_load_string(file_get_contents_retry($fmpro_search_url));

    //print_r ($data_fmpro);

    if (!$data_fmpro | $data_fmpro->resultset['count'] == 0) {

        $json_search = array();

        $json_search['query_str'] = $query_text;

        return json_encode($json_search);
    }
    else {
        $json_search = array();

        $json_search['record_count'] = (string) $data_fmpro->resultset['count'];

        $film_records = getRecords($data_fmpro->resultset->record);
        
        //print_r($film_records);

        $json_search['records'] = array_slice($film_records, (((int) $page_number) - 1) * $increment, $increment);

        //print_r($json_search['records']);

        $json_search['query_str'] = $query_text;

        //echo json_encode($json_search);

        return utf8_decode(json_encode(utf8ize($json_search), JSON_UNESCAPED_UNICODE));
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

function getMainFilmmakerName($filmmaker) {
    $init_exp = explode(",", $filmmaker);
    if (count($init_exp) > 1) {
        return "<b>" . trim($init_exp[1]) . " " . trim($init_exp[0]) . "</b>";
    }
    else {
        return "<b>" . $filmmaker . "</b>";
    }
}

function str_from_query($query_array, $categories_genre) {

    $str = "";

    for ($i=0; $i<count($query_array); $i++) {
        if ($query_array[$i]) {
            if ($i == 0) {
                $str .= "New Aquisitions" . ", "; 
            }
            else if (($i==1 || $i==2 || $i==3)) {
                $str .= stripslashes(urldecode ($query_array[$i])) . ", ";
            }
            else if ($i==4) {
                $split_year = explode("..", $query_array[$i]);
                if (count($split_year) == 2) {
                    if (is_numeric($split_year[0]) && is_numeric($split_year[1])) {
                        $str .= $split_year[0] . " to " . $split_year[1] . ", ";
                    }
                }
                else {
                    if (is_numeric($split_year[0])) {
                        $str .= $query_array[$i] . ", ";
                    }
                }
            } 
            else if ($i==5) {
                $split_genre = explode("(%7C)", $query_array[$i]);
                if (allNumbers_all_range($split_genre, $categories_genre['genre'])) {
                    $genre_str = "";
                    for ($j=0; $j<count($split_genre); $j++) {
                        $genre_str .= $categories_genre['genre'][((int) $split_genre[$j]) - 1][0];
                        if ($j != count($split_genre) - 1) {
                            $genre_str .= " and ";
                        }
                    }
                    $str .= "Genre (" . $genre_str . ")" . ", ";
                }
            }
            else if ($i==6) {
                $split_category = explode("(%7C)", $query_array[$i]);
                if (allNumbers_all_range($split_category, $categories_genre['category'])) {
                    $category_str = "";
                    for ($j=0; $j<count($split_category); $j++) {
                        $category_cur = $categories_genre['category'][((int) $split_category[$j]) - 1][0];
                        $last_char = substr($category_cur, -1);
                        if ($last_char == " ") {
                            $category_cur = substr($category_cur, 0, strlen($category_cur) - 1);
                        }
                        $category_str .= $category_cur;
                        if ($j != count($split_category) - 1) {
                            $category_str .= " or ";
                        }
                    }
                    $str .= "Keywords (" . $category_str . ")" . ", ";
                }
            }
        }
    }

    if ($str) {
        $str = substr($str, 0, strlen($str) - 2);
    }

    return $str;
}

function allNumbers_all_range($array_list, $comparison_list) {
    $count_comparison_list = count($comparison_list);
    for ($k=0; $k<count($array_list); $k++) {
        if (!is_numeric($array_list[$k]) || (int) $array_list[$k] > $count_comparison_list || (int) $array_list[$k] < 0) {
            return false;
        }
    }
    return true;
}

function getRecords($records) {
    $all_records = array();
    for ($i=0; $i<count($records); $i++) {

        $single_record = array();

        $film_title = (string) $records[$i]->field[0]->data;
        $client_id_number = (string) $records[$i]->field[1]->data;
        $filmmaker_name = (string) $records[$i]->field[2]->data;
        $secondary_filmmaker = (string) $records[$i]->field[3]->data;

        $film_synopsis = (string) $records[$i]->field[4]->data;
        $year = (string) $records[$i]->field[5]->data;
        $length = (string) $records[$i]->field[6]->data;
        $country = (string) $records[$i]->field[7]->data;

        $sound = (string) $records[$i]->field[8]->data;
        $language = (string) $records[$i]->field[9]->data;
        $colour = (string) $records[$i]->field[10]->data;
        $genre = strtolower((string) $records[$i]->field[11]->data);

        $film_id_number = (string) $records[$i]->field[12]->data;
        $old_preview_url_full = (string) $records[$i]->field[15]->data;

        $vimeo_preview_full_id = (string) $records[$i]->field[16]->data;
        $category = strtolower((string) $records[$i]->field[19]->data);

        
        $single_record["country"] = $country;
        $single_record["year"] = $year;
        $single_record["sound"] = $sound;
        $single_record["colour"] = $colour;
        $single_record["language"] = $language;

        if (strpos($length, ':') === false && !ctype_alpha($length)) {
            $single_record["length"] = getTimeString($length);
        } 
        else {
            $single_record["length"] = $length;
        } 

        $single_record["genre"] = explode("*", $genre);
        $single_record["category"] = explode("*", $category);
        $single_record["film_title"] = convertQuotes($film_title);
        $single_record["film_id_number"] = $film_id_number;
        $single_record["client_id_number"] = $client_id_number;
        $single_record["filmmaker_name"] = getMainFilmmakerName($filmmaker_name);
        if ($secondary_filmmaker) {
            $single_record["secondary_filmmaker"] = getFilmmakerName($secondary_filmmaker);
        }
        $single_record["synopsis"] = getSynopsis($film_synopsis, $film_title);
        $single_record["is_preview"] = $old_preview_url_full || $vimeo_preview_full_id;
        
        $all_records[] = $single_record;
    }
    return $all_records;
}

function getSynopsis($synosis, $film_title) {
    $film_title_regex = preg_replace("|/|", "\/", $film_title);
    $sanitized_synopsis = convertQuotes($synosis);
    $regex_string_result = preg_replace('/(?i)([\'"\“\‘]'.$film_title_regex.'[\'"\”\’])/', "---*---*---",$sanitized_synopsis);
    $regex_string_result = preg_replace('/('.preg_quote("---*---*---").')/', "$film_title</b>",$regex_string_result);
    $regex_string_result = preg_replace("/([\n\r]+$)/", '', $regex_string_result);
    $regex_string_result = preg_replace("/([\n\r])/", ' ', $regex_string_result);

    return $regex_string_result;
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

function query_empty($split_query) {
    for ($i=0; $i<count($split_query); $i++) {
        if ($split_query[$i]) {
            return false;
        }
    }
    return true;
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

function getCategoriesGenre() {
    $map_url = "http://n462.fmphost.com/fmi/xml/FMPXMLLAYOUT.xml?-db=cfmdc_full&-lay=web_toolbar_info&-view";

    $data = simplexml_load_string(file_get_contents($map_url));

    $json_results_categories_genre = "";

    if (!$data) {
        return "";
    } else {
        $genre = $data->VALUELISTS->VALUELIST[0];
        $category = $data->VALUELISTS->VALUELIST[1];
        
        $category_array = array();
        $genre_array = array();

        for ($i=0; $i<count($genre); $i++) {
            array_push($genre_array, array((string) $genre->VALUE[$i]));
        }

        for ($i=0; $i<count($category); $i++) {
            array_push($category_array, array(strtolower((string) $category->VALUE[$i])));
        }   

        $json_categories_genre = array("genre"=> $genre_array, "category"=> $category_array);
        return $json_categories_genre;
    }
}
?>
