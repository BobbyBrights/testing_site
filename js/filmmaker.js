$(document).ready(function() {
    $(".contents").append("<div class='top_buffer'></div>")

    if (!filmmaker_obj) {
        $(".contents").append("<div class='not_accessible'></div>")
        $(".not_accessible").append("<div class='sorry_text'>SORRY. THIS PAGE DOES NOT EXIST.</div>")
    }

    else {
        document.title = filmmaker_obj['filmmaker_name'] + " | Canadian Filmmakers Distribution Centre"
        $(".catalogue").css("color", "#E22134")
        $(".contents").append("<div class='accessible'></div>")
        $(".accessible").append("\
        <div class='filmmaker_table'>\
            <div class='filmmaker_table_cell_container'>\
                <div class='filmmaker_table_cell_left_margin'>\
                </div>\
                <div class='filmmaker_table_cell_centre'>\
                </div>\
                <div class='filmmaker_table_cell_right_margin'>\
                </div>\
            </div>\
        </div>\
        ")

        $('.filmmaker_table_cell_centre').append("<div class='filmmaker_table_filmmaker_info_row'></div>")
        $('.filmmaker_table_cell_centre').append("<div class='filmmaker_table_filmmaker_filmography'></div>")
        $('.filmmaker_table_filmmaker_info_row').append("<div class='filmmaker_table_filmmaker_title_cell'></div>")
        $('.filmmaker_table_filmmaker_title_cell').append("<div class='filmmaker'>" + filmmaker_obj['filmmaker_name'] + "</div>")


        // biography
        if (filmmaker_obj['biography'].trim()) {
            $('.filmmaker_table_filmmaker_info_row').append("<div class='filmmaker_table_spacer'></div>")
            $('.filmmaker_table_filmmaker_info_row').append("<div class='filmmaker_table_bio_heading_title_cell'><div class='bio_heading'>BIOGRAPHY</div></div>")
            $('.filmmaker_table_filmmaker_info_row').append("<div class='filmmaker_sub_head_bio_spacer'></div>")
            $('.filmmaker_table_filmmaker_info_row').append("<div class='filmmaker_table_biography_title_cell'><div class='biography'>" + filmmaker_obj['biography'] + "</div></div>")
        }

        // filmography
        if (filmmaker_obj['filmography'].length != 0) {

            $('.filmmaker_table_filmmaker_filmography').append("<div class='filmmaker_table_filmmaker_filmography_row'></div>")
            $('.filmmaker_table_filmmaker_filmography_row').append("<div class='filmmaker_table_spacer'></div>")
            $('.filmmaker_table_filmmaker_filmography_row').append("<div class='filmmaker_table_filmography_title_cell'><div class='filmography_heading'>FILMOGRAPHY</div></div>")
            $('.filmmaker_table_filmmaker_filmography').append("<div class='filmmaker_sub_head_filmmography_spacer'></div>")
            getFilmography(filmmaker_obj['filmography'])
        }
       
        $('.filmmaker_table_cell_centre').append("<div class='filmmaker_table_end_buffer'></div>")

    }
})

function getFilmography(filmography) {
    for(i=0; i<filmography.length; i++) {
        if (i % 3 == 0) {
            $('.filmmaker_table_filmmaker_filmography').append("<div class='filmmaker_table_filmmaker_filmography_row'></div>")
        }
        link = web_host + "film/" + filmography[i]['film_id']
        $('.filmmaker_table_filmmaker_filmography_row').last().append("<div class='filmmaker_table_filmography_film_cell'><a href='" + link + "'></a></div>")
        $('.filmmaker_table_filmography_film_cell > a').last().append("<div class='film_still_container'></div>")
        if (filmography[i]['still']) {
            getStill(filmography[i])
        }
        $('.filmmaker_table_filmography_film_cell > a').last().append("<div class='film_pre_spacer'></div>")
        $('.filmmaker_table_filmography_film_cell > a').last().append("<div class='film_details'></div>")
        $('.film_details').last().append( getFilmDetails(filmography[i]))
        $('.filmmaker_table_filmography_film_cell > a').last().append("<div class='film_post_spacer'></div>")
        if (i % 3 != 2) {
            $('.filmmaker_table_filmmaker_filmography_row').last().append("<div class='filmmaker_table_filmography_film_cell_spacer'></div>")
        }
     }

    remainder = filmography.length % 3;

    //alert(remainder)

    for(i=(3-remainder+1); i<3; i++) {
        $('.filmmaker_table_filmmaker_filmography_row').last().append("<div class='filmmaker_table_filmography_film_cell'></div>")
        if (i % 3 != 2) {
            $('.filmmaker_table_filmmaker_filmography_row').last().append("<div class='filmmaker_table_filmography_film_cell_spacer'></div>")
        }
    }

}

function getStill(film_object) {
    containerw = 253
    containerh = 188
    if (film_object['still_width'] < containerw || film_object['still_height'] < containerh) {
        $('.film_still_container').last().append("<img src='" + film_object['still'] + "' class='film_still_container_child'>")
    }
    else if (film_object['still_width'] == 740) {
        $('.film_still_container').last().append("<img src='" + film_object['still'] + "' class='film_still_container_child'>")
        $('.film_still_container > img').last().width(containerw + 90)
    }
    else {
        $('.film_still_container').last().append("<img src='" + film_object['still'] + "' class='film_still_container_child'>")
        $('.film_still_container > img').last().width(containerw)
    }

}

function getFilmDetails(film_detail) {
    detail = ""
    details = [film_detail['title'], film_detail['length'], film_detail['year']];
    found_first = false
    for (j=0; j<3; j++) {
        if (!found_first) {
            if (j == 0) {
                detail += "<b>" + details[j] + "</b>"
            }
            else {
                detail += details[j]
            }
            found_first = true
        }
        else {
            detail += " / " + details[j]
        }
    }
    return detail
}