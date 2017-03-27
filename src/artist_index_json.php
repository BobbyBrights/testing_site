<?php

//echo getArtistList("z");

function getArtistList($alpha) {
    $alpha = trim($alpha);

    if (strlen($alpha) > 1) {
        return "";
    }

    if (preg_match('/[a-zA-Z]/', $alpha)) {
        $fmpro_search_url = "http://n462.fmphost.com/fmi/xml/fmresultset.xml?-db=cfmdc_full&-lay=web_client_info&-script=artist_index&-script.param=" . $alpha . "&-findall";
        
        $data_fmpro = simplexml_load_string(file_get_contents_retry($fmpro_search_url));

        if ($data_fmpro) {
            $index_alpha_result = array();
            $index_alpha_result['filmmakers'] = getFilmmakers($data_fmpro->resultset->record);

            return utf8_decode(json_encode(utf8ize($index_alpha_result), JSON_UNESCAPED_UNICODE));

        }
        else {
            return "[]";
        }
        
    }
    else {
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

function getFilmmakers($records) {
    $return_records = array();
    for ($i=0; $i<count($records); $i++) {
        $return_record = array();
        //print_r($records[$i]);
        $return_record['filmmaker_name'] = getMainFilmmakerName((string) $records[$i]->field[0]->data);
        $return_record['client_id_number'] = (string) $records[$i]->field[2]->data;
        $return_records[] = $return_record;
    }
    return $return_records;
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

?>