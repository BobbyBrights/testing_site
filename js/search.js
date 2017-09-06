String.prototype.trunc = 
      function(n){
          return this.substr(0,n-1)+(this.length>n?'&hellip;':'');
      };

var web_host = "http://www.testing.cfmdc.org/";

$(document).ready(function() {
    $(".contents").append("<div class='top_buffer'></div>")

    if (!search_obj) {
        $(".contents").append("<div class='not_accessible'></div>")
        $(".not_accessible").append("<div class='sorry_text'>SORRY. THIS PAGE DOES NOT EXIST.</div>")
    }

    else {

        document.title = "Search" + " | Canadian Filmmakers Distribution Centre"

        $(".contents").append("<div class='accessible'></div>")
        $(".accessible").append("<div class='search_table'></div>")
        $(".search_table").append("<div class='search_table_cell_container'></div>")
        $(".search_table_cell_container").append("<div class='search_table_cell_left_margin'></div>")
        $(".search_table_cell_container").append("<div class='search_table_title'></div>")
        $(".search_table_cell_container").append("<div class='search_table_content'></div>")
        $(".search_table_cell_container").append("<div class='search_table_cell_right_margin'></div>")

        // title
        $(".search_table_title").append("<div class='search_title'>SEARCH</div>")

        // content
        $(".search_table_content").append("<div class='query_str'><div class='query_str_container'>" + search_obj['query_str'] + "</div></div>")
        $(".search_table_content").append("<div class='search_spacer'></div>")

        if (!search_obj['record_count'] || search_obj['record_count'] == "0" ||  search_obj['records'].length == 0) {
            $(".search_table_content").append("<div class='noresults'>No search results were found.</div>");
        }
        else {

            number_pages = Math.ceil(search_obj['record_count']/increment)

            $(".search_table_content").append("<div class='info_bar'></div>");
            
            // if (user_type > 0) {
                // $(".info_bar").append("<div class='preview_element_container'></div>")
                // $(".preview_element_container").append("<div class='preview_text'>preview available</div>")
                // $(".preview_element_container").append("<div class='preview_spacer'></div>")
                // $(".preview_element_container").append("<div class='preview_marker'></div>")
            // }

            if (page != 1 || number_pages != 1) {
                $(".info_bar").append("<div class='page_mover'></div>")
                if (page != "1") {
                    $(".page_mover").append("<div class='left_arrow'><a href='" + web_host + "search/" + query + "/" + (page - 1) + "'><</a></div>")
                }
                $(".page_mover").append("<div class='spacer'></div>")
                $(".page_mover").append("<div class='text'>" + page + " of " + number_pages + "</div>")
                
                if (page != number_pages) {
                    $(".page_mover").append("<div class='spacer'></div>")
                    $(".page_mover").append("<div class='right_arrow'><a href='" + web_host + "search/" + query + "/" + (page + 1) + "'>></a></div>")
                }
            }

            writeRecords(search_obj['records'])

            $(".genre_cat_table").hide();

            $(".genre_menu_link > .glyphicon").click(function() {
                obj_table = $(this).parent().parent().parent().find(".genre_cat_table");

                if (obj_table.is(':visible')) {
                    obj_table.hide();
                }
                else {
                    obj_table.show();
                }
            })

            $(".search_table_content").append("<div class='search_spacer'></div>")

			$(".search_table_content").append("<div class='info_bar'></div>");
            $(".info_bar").last().append("<div class='preview_element_container'></div>")
            $(".preview_element_container").append("<div class='preview_text'>preview available</div>")
            $(".preview_element_container").append("<div class='preview_spacer'></div>")
            $(".preview_element_container").append("<div class='preview_marker'></div>")

            if (!$(".search_spacer").last().visible()) {
                if (page != 1 || number_pages != 1) {
                    //$(".search_table_content").append("<div class='info_bar'></div>");
                    $(".info_bar").append("<div class='page_mover'></div>")
                    if (page != "1") {
                        $(".page_mover").last().append("<div class='left_arrow'><a href='" + web_host + "search/" + query + "/" + (page - 1) + "'><</a></div>")
                    }
                    $(".page_mover").last().append("<div class='spacer'></div>")
                    $(".page_mover").last().append("<div class='text'>" + page + " of " + number_pages + "</div>")
                    
                    if (page != number_pages) {
                        $(".page_mover").last().append("<div class='spacer'></div>")
                        $(".page_mover").last().append("<div class='right_arrow'><a href='" + web_host + "search/" + query + "/" + (page + 1) + "'>></a></div>")
                    }
                }

            }

            $(".search_table_content").append("<div class='end_buffer'></div>"); 
        }
    }
})

function writeRecords(records) {
    for (i=0; i<records.length; i++) {

        // title
        film_title = records[i]['film_title']
        film_id = records[i]['film_id_number']
        // if (i != 0 || user_type > 0) {
        if (i != 0) {
            $(".search_table_content").append("<div class='search_spacer'></div>")
        }
        $(".search_table_content").append("<div class='film_title'></div>")
        $(".film_title").last().append("<div class='title'></div>")
        $(".title").last().append("<a href='" + web_host + "film/" + film_id + "'>" + film_title + "</a>")
        // if (records[i]['is_preview'] && user_type > 0) {
        if (records[i]['is_preview']) {
            $(".film_title").last().append("<div class='preview_spacer'></div>")
            $(".film_title").last().append("<div class='preview_marker'></div>")
        }

        $(".search_table_content").append("<div class='generic_spacer'></div>")

        // filmmaker
        $(".search_table_content").append("<div class='filmmaker'></div>")
        filmmaker = records[i]['filmmaker_name']
        filmmaker_id = records[i]['client_id_number']
        $(".filmmaker").last().append("<a href='" + web_host + "filmmaker/" + filmmaker_id + "'>" + filmmaker + "</a>")
        if (records[i]['secondary_filmmaker']) {
            secondary_filmmaker = records[i]['secondary_filmmaker']
            $(".filmmaker").last().append(" & " + secondary_filmmaker)
        }

        $(".search_table_content").append("<div class='generic_spacer'></div>")

        // film details
        $(".search_table_content").append("<div class='filmdetails'></div>")
        $(".filmdetails").last().append(film_detail(records[i]))

        if (records[i]['synopsis'].trim()) {
            $(".search_table_content").append("<div class='generic_spacer'></div>")

            // film description
            $(".search_table_content").append("<div class='filmdescription'></div>")
            $(".filmdescription").last().append(records[i]['synopsis'].trunc(200))
        }

        genre_exists = records[i]['genre'] && records[i]['genre'].length > 0 && records[i]['genre'][0]
        category_exists = (records[i]['category'] && records[i]['category'].length > 0 && records[i]['category'][0])
        exhibition_exists = (records[i]['exhibition_format'] && records[i]['exhibition_format'].length > 0 && records[i]['exhibition_format'][0])

        // genre
        if (genre_exists) {
            $(".search_table_content").append("<div class='generic_spacer'></div>")
            $(".search_table_content").append("<div class='genre_obj'><div class='genre_cat_heading'>Genre <div class='genre_menu_link'><span class='glyphicon glyphicon-plus'></span></div></div></div>")
            $(".genre_obj").last().append("<div class='genre_cat_table'></div>")
            $(".genre_cat_table").last().append(getGenreCategories(records[i]['genre']))
        }

        // category
        if (category_exists) {
            if (genre_exists) {
                $(".search_table_content").append("<div class='generic_spacer_genre_cat'></div>")
            }
            else {
                $(".search_table_content").append("<div class='generic_spacer'></div>")
            }
            $(".search_table_content").append("<div class='genre_obj'><div class='genre_cat_heading'>Keywords <div class='genre_menu_link'><span class='glyphicon glyphicon-plus'></span></div></div></div>")
            $(".genre_obj").last().append("<div class='genre_cat_table'></div>")
            $(".genre_cat_table").last().append(getGenreCategories(records[i]['category']))
        }

        // category
        if (exhibition_exists) {
            if (genre_exists) {
                $(".search_table_content").append("<div class='generic_spacer_genre_cat'></div>")
            }
            else {
                $(".search_table_content").append("<div class='generic_spacer'></div>")
            }
            $(".search_table_content").append("<div class='genre_obj'><div class='genre_cat_heading'>Exhibition Format <div class='genre_menu_link'><span class='glyphicon glyphicon-plus'></span></div></div></div>")
            $(".genre_obj").last().append("<div class='genre_cat_table'></div>")
            $(".genre_cat_table").last().append(getExhibition(records[i]['exhibition_format']))
        }
    }
}

function getGenreCategories(obj) {
    str = ""
    for (k=0; k<obj.length; k++) {
        str += "<div class='genre_category_list_entry'><span>" + obj[k] + "</span></div>"
    }
    return str
}

function getExhibition(obj) {
    str = ""
    for (k=0; k<obj.length; k++) {
        if (obj[k]) {
            str += "<div class='exhibition_list_entry'><span>" + obj[k] + "</span></div>"
        }
    }
    return str
}

function film_detail(film_obj) {
    film_details = [film_obj['country'], film_obj['length'], film_obj['year'], film_obj['sound'], film_obj['colour'], film_obj['language']]
    film_detail_str = "";
    film_detail_first_string_found = false;
    for (k = 0; k < film_details.length; k++) { 
        if (film_details[k]) {
            if (k == 0 || !film_detail_first_string_found) {
                film_detail_first_string_found = true
                film_detail_str += film_details[k]
            }
            else {
                film_detail_str += " / " + film_details[k]
            }
        }
    }
    return film_detail_str
}