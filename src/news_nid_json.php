<?php

//echo getSingleNews(2621);

//echo getAllNews();

function getSingleNews($nid) {
    $host = "http://www.cfmdc.org/";
    $cms_news_url = $host . "cms/api/single_news/" . $nid . "?_format=xml";
    $data_cms = simplexml_load_string(file_get_contents_retry($cms_news_url));

    //print_r($data_cms);

    if (!$data_cms) {
        return "";
    }
    else {
        $news_array = array();
        $news_array['news_title'] = (string) $data_cms->item->title->value;

        $news_array['news_text'] = (string) $data_cms->item->field_full_text->value;
        $news_array['news_text'] = preg_replace ("/<p>(\s*)/", "", $news_array['news_text']);
        $news_array['news_text'] = preg_replace ("/(\s*)<\/p>(\s*)/", "<br><br>", $news_array['news_text']);
        $news_array['news_text'] = preg_replace ("/<br><br>$/", "", $news_array['news_text']);
        $news_array['news_text'] = preg_replace ("/<strong>/", "<b>", $news_array['news_text']);
        $news_array['news_text'] = preg_replace ("/<\/strong>/", "</b>", $news_array['news_text']);
        $news_array['news_text'] = convertQuotes($news_array['news_text']);

        return utf8_decode(json_encode(utf8ize($news_array), JSON_UNESCAPED_UNICODE));
    }

}

function getAllNews() {
    $host = "http://www.cfmdc.org/";
    $cms_news_url = $host . "cms/api/news?_format=xml";
    $data_cms = simplexml_load_string(file_get_contents_retry($cms_news_url));  

    //print_r($data_cms);

    if (!$data_cms) {
        return "";
    }
    else {
        $news_array = array();

        for ($i=0; $i<count($data_cms->item); $i++) {
            
            $news = array();

            $news['news_title'] = (string) $data_cms->item[$i]->title->value;

            $news['news_blurb'] = (string) $data_cms->item[$i]->field_summary_blurb->value;
            $news['news_blurb'] = preg_replace ("/<p>(\s*)/", "", $news['news_blurb']);
            $news['news_blurb'] = preg_replace ("/(\s*)<\/p>(\s*)/", "<br><br>", $news['news_blurb']);
            $news['news_blurb'] = preg_replace ("/<br><br>$/", "", $news['news_blurb']);
            $news['news_blurb'] = preg_replace ("/<strong>/", "<b>", $news['news_blurb']);
            $news['news_blurb'] = preg_replace ("/<\/strong>/", "</b>", $news['news_blurb']);
            $news['news_blurb'] = convertQuotes($news['news_blurb']);

            $news['news_thumbnail'] = (string) $data_cms->item[$i]->field_thumbnail->url;

            $news['news_nid'] = (string) $data_cms->item[$i]->nid->value;
 
            $news_array[] = $news;
        }

        return utf8_decode(json_encode(utf8ize($news_array), JSON_UNESCAPED_UNICODE));
    }

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