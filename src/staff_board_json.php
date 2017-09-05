<?php

$host = "http://testing.cfmdc.org/";

function getBoardJson() {
    global $host; 

    $cms_board_url = $host . "cms/api/board?_format=xml";

    $data_cms = simplexml_load_string(file_get_contents_retry($cms_board_url));

    if (!$data_cms) {
            return "";
    }

    return utf8_decode(json_encode(utf8ize(getAllBoard($data_cms)), JSON_UNESCAPED_UNICODE));  
}

function getAllBoard($obj) {
    $allBoard = array();
    for ($i = 0; $i < count($obj->item); $i++) {
        $allBoard[] = getBoard($obj->item[$i]);
    }
    return $allBoard;
}

function getBoard($obj) {
    $board = array();
    $last_name = (string) $obj->title->value;
    $first_name = (string) $obj->field_first_name->value;
    $board['full_name'] = $first_name . " " . $last_name;
    $board['biography'] = (string) $obj->field_biography_board->value;

    $board['biography'] = preg_replace ("/<p>(\s*)/", "", $board['biography']);
    $board['biography'] = preg_replace ("/(\s*)<\/p>(\s*)/", "<br><br>", $board['biography']);
    $board['biography'] = preg_replace ("/<br><br>$/", "", $board['biography']);
    $board['biography'] = preg_replace ("/<br><br>&nbsp;<br><br>/", "<br><br><br>", $board['biography']);
    $board['biography'] = preg_replace ("/<strong>/", "<b>", $board['biography']);
    $board['biography'] = preg_replace ("/<\/strong>/", "</b>", $board['biography']);

    $board['portrait'] = (string) $obj->field_portrait_board->url;
    $board['width'] = (string) $obj->field_portrait->width;
    $board['height'] = (string) $obj->field_portrait->height;

    return $board;
}

function getStaffJson() {
    global $host; 

    $cms_staff_url = $host . "cms/api/staff?_format=xml";

    $data_cms = simplexml_load_string(file_get_contents_retry($cms_staff_url));

    if (!$data_cms) {
            return "";
    }

    return utf8_decode(json_encode(utf8ize(getAllStaff($data_cms)), JSON_UNESCAPED_UNICODE));
}

function getAllStaff($obj) {
    $allStaff = array();
    for ($i = 0; $i < count($obj->item); $i++) {
        $allStaff[] = getStaff($obj->item[$i]);
    }
    return $allStaff;
}

function getStaff($obj) {
    $staff = array();
    $last_name = (string) $obj->title->value;
    $first_name = (string) $obj->field_last_name->value;
    $staff['full_name'] = $first_name . " " . $last_name;
    $staff['portrait'] = (string) $obj->field_portrait->url;

    $staff['width'] = (string) $obj->field_portrait->width;
    $staff['height'] = (string) $obj->field_portrait->height;

    $staff['biography'] = (string) $obj->field_biography->value;

    $staff['biography'] = preg_replace ("/<p>(\s*)/", "", $staff['biography']);
    $staff['biography'] = preg_replace ("/(\s*)<\/p>(\s*)/", "<br><br>", $staff['biography']);
    $staff['biography'] = preg_replace ("/<br><br>$/", "", $staff['biography']);
    $staff['biography'] = preg_replace ("/<br><br>&nbsp;<br><br>/", "<br><br><br>", $staff['biography']);
    $staff['biography'] = preg_replace ("/<strong>/", "<b>", $staff['biography']);
    $staff['biography'] = preg_replace ("/<\/strong>/", "</b>", $staff['biography']);

    $staff['positions'] = array();
    for ($i = 0; $i < count($obj->field_position); $i++) {
        $staff['positions'][] = (string) $obj->field_position[$i]->field_position->value;
    }
    $staff['emails'] = array();
    for ($i = 0; $i < count($obj->field_contact_s_); $i++) {
        $staff['emails'][] = (string) $obj->field_contact_s_[$i]->field_email->value;
    }
    return $staff;
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