<?php

 echo getClientJson("1026");

function getClientJson($client_number) {
    $host = "http://www.cfmdc.org/";

    $fmpro_film_url = "http://n462.fmphost.com/fmi/xml/fmresultset.xml?-db=cfmdc_full&-lay=web_client&ClientIDnumber=" . $client_number . "&-max=1&-find";

    $data_fmpro = simplexml_load_string(file_get_contents_retry($fmpro_film_url));

    if ($data_fmpro && $data_fmpro->resultset->record->field[1]->data != false && $data_fmpro->resultset->record->field[1]->data != "client") {
        //print_r($data_fmpro->resultset->record->relatedset->record);
        // echo count($data_fmpro->resultset->record->relatedset->record);
        //print_r($data_fmpro->resultset->record->relatedset->record[0]->field[4]);
 
        $json_client = array();
        $json_client['filmmaker_name'] = getFilmmakerName((string) $data_fmpro->resultset->record->field[0]->data);
        $json_client['biography'] = convertQuotes((string) $data_fmpro->resultset->record->field[2]->data);

        $json_client['biography'] = preg_replace("/([\n\r]+$)/", '', $json_client['biography']);
        $json_client['biography']= preg_replace("/([\n\r])/", '<br/>', $json_client['biography']);

        $film_records = $data_fmpro->resultset->record->relatedset->record;
        $cms_films_str = getFilmIdStr($film_records);
        $cms_film_url = $host . "cms/api/film_stills/" . $cms_films_str . "?_format=xml";

        $data_cms = simplexml_load_string(file_get_contents_retry($cms_film_url));

        //echo $data_cms->item[0]->field_old_web_still_optional_->url;
        //echo $data_cms->item[0]->field_filemaker_film_id->value;
        //  echo $json_client['filmmaker_name'];
        //  echo $json_client['biography'];

        $allrecords = getFilmRecords($film_records, $data_cms->item);

        $json_client['filmography'] = $allrecords;
        return json_encode($json_client);

    }
    else{
        return "";
    }
    //$cms_film_url = $host . "cms/api/film_stills/" . $film_number . "?_format=xml";
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

    for ($i = 0; $i < count($records); $i++) {
        $record['year'] = (string) $filmrecord->field[0]->data;
        $record['film_id'] = (string) $filmrecord->field[1]->data;
        $record['title'] = (string) $filmrecord->field[2]->data;
        $record['length'] = getTimeString((string) $filmrecord->field[3]->data);
        if ((string) $records[$i]->field_filemaker_film_id->value == $record['film_id']) {
            $old_still = (string) $records[$i]->field_old_web_still_optional_->url;
            $medium_still = (string) $records[$i]->field_medium_film_still_740_x_41->url;
            $record['still'] = ($medium_still ? $medium_still : $old_still);
            $image_size = getimagesize($record['still']);
            $record['still_width'] = (string) $image_size[0];
            $record['still_height'] = (string) $image_size[1];
        }
    }
    return $record ;
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

function getFilmmakerName($filmmaker) {
    $filmmaker = preg_replace("/\([^)]+\)/","", $filmmaker);

    $name_exp_semi_colon = explode(";", $filmmaker);
    $name_exp_ampersand = explode("&", $filmmaker);
	$name_exp_and = explode(" and", $filmmaker);

    $init_exp = (count($name_exp_semi_colon) > count($name_exp_ampersand) ? $name_exp_semi_colon : $name_exp_ampersand);
	$init_exp = (count($init_exp) > count($name_exp_and) ? $init_exp : $name_exp_and);

    if (strpos($filmmaker, ';') === false && strpos($filmmaker, '&') === false && strpos($filmmaker, ' and') === false) {
        $name_exp_comma = explode(",", $filmmaker);
        $count_first_words = count(explode(" ",$name_exp_comma[0]));
        if($count_first_words > 1) {
            $init_exp = explode(",", $filmmaker);
        }
    }

    $final_str = "";

    for ($i=0; $i<count($init_exp); $i++) {
        $name_exp = explode(",", $init_exp[$i]);

        if (count($name_exp) < 2) {
            $final_str .= ($i > 0 ? trim($name_exp[0]) : trim($name_exp[0]) );
        }
        else {
            $final_str .= ($i > 0 ? trim($name_exp[1]) . " " . trim($name_exp[0]): trim($name_exp[1]) . " " . trim($name_exp[0]));
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
        $seconds_str = "0" . $seconds;
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