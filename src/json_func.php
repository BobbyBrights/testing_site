<?php
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