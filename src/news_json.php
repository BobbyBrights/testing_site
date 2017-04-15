<?php

function getAllNews() {
    $host = "http://s219085.gridserver.com/";
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

            $news['news_blurb'] = (string) $data_cms->item[$i]->field_test->value;
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

?>