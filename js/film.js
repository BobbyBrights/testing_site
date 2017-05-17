$(document).ready(function() {
    $(".contents").append("<div class='top_buffer'></div>")
    if (!film_obj) {
        $(".contents").append("<div class='not_accessible'></div>")
        $(".not_accessible").append("<div class='sorry_text'>SORRY. THIS PAGE DOES NOT EXIST.</div>")
    }
    else {

        document.title = film_obj['film_title'] + " | Canadian Filmmakers Distribution Centre"
        $(".catalogue").css("color", "#E22134")
        $(".contents").append("<div class='accessible'></div>")
        $(".accessible").append("<div class='film_table'>\
                <div class='film_row_generic'>\
                <div class='film_table_left_right_margin'>\
                </div>\
                <div class='film_table_content_left'>\
                </div>\
                <div class='film_table_centre'>\
                </div>\
                <div class='film_table_content_right'>\
                </div>\
                <div class='film_table_left_right_margin'>\
                </div>\
                </div>\
        </div>")

        // left cell

        $('.film_table_content_left').append("<div class='film_table_inner_table'>\
            <div class='film_table_inner_row_title'><div class='title'>" + film_obj['film_title'] +
            "</div></div>\
        </div>")
        $('.film_table_content_left > .film_table_inner_table').append("<div class='film_table_inner_row_title_spacer'></div>")

        // film title
        filmmaker_text = "<a href='" + web_host + "filmmaker/" + film_obj['client_id_number'] + "'>" + film_obj['filmmaker_name'] + "</a>";
        if (film_obj['secondary_filmmaker']) {
            filmmaker_text += " & " + film_obj['secondary_filmmaker'];
        }

        // filmmaker
        $('.film_table_content_left > .film_table_inner_table').append("<div class='film_table_text'>" + "by " + filmmaker_text + "</div>")
        film_details_str = film_details(film_obj)
        if (film_details_str) {
            $('.film_table_content_left > .film_table_inner_table > .film_table_text').append("<br/>" + film_details_str)
        }

        // synopsis
        if (film_obj['film_synopsis']) {
            $('.film_table_content_left > .film_table_inner_table').append("<div class='film_table_inner_row_text_spacer'></div>")
            $('.film_table_content_left > .film_table_inner_table').append("<div class='film_table_text'>" + film_obj['film_synopsis'] + "</div>")
        }

        // genre + category listing
        genre_exists = film_obj['genre'] && film_obj['genre'].length > 0 && film_obj['genre'][0]
        category_exists = (film_obj['category'] && film_obj['category'].length > 0 && film_obj['category'][0])
        exhibition_format_exists = film_obj['exhibition_format'] && film_obj['exhibition_format'].length > 0 && film_obj['exhibition_format'][0]

        if (genre_exists ||  category_exists || exhibition_format_exists) {
            $('.film_table_content_left > .film_table_inner_table').append("<div class='film_table_inner_row_text_spacer'></div>")
            if (film_obj['genre'] && film_obj['genre'].length > 0 && film_obj['genre'][0]) {
                $('.film_table_content_left > .film_table_inner_table').append("<div class='film_table_text'><b>Genre</b></div>")
                genre_str = ""

                for (i=0; i<film_obj['genre'].length; i++) {
                    genre_str += "<div class='genre_category_list_entry'><span>" + film_obj['genre'][i] + "</span></div>"
                }

                $('.film_table_content_left > .film_table_inner_table').append("<div class='film_table_genre_row'>" + genre_str + "</div>")
            }

            if (genre_exists &&  category_exists) {
                $('.film_table_content_left > .film_table_inner_table').append("<div class='film_table_inner_row_list_spacer'></div>")
            }

            if (category_exists) {
                $('.film_table_content_left > .film_table_inner_table').append("<div class='film_table_text'><b>Keywords</b></div>")
                category_str = ""

                for (i=0; i<film_obj['category'].length; i++) {
                    category_str += "<div class='genre_category_list_entry'><span>" + film_obj['category'][i] + "</span></div>"
                }

                $('.film_table_content_left > .film_table_inner_table').append("<div class='film_table_category_row'>" + category_str + "</div>")
            }


            if (exhibition_format_exists) {
                if (genre_exists || category_exists) {
                    $('.film_table_content_left > .film_table_inner_table').append("<div class='film_table_inner_row_text_spacer'></div>")
                }
                $('.film_table_content_left > .film_table_inner_table').append("<div class='film_table_text'><b>Exhibition Format</b></div>")
                
                exhibition_format_str = ""

                for (i=0; i<film_obj['exhibition_format'].length; i++) {
                    if (film_obj['exhibition_format'][i]) {
                        exhibition_format_str += "<div class='exhibition_list_entry'><span>" + film_obj['exhibition_format'][i] + "</span></div>"
                    }
                }

                $('.film_table_content_left > .film_table_inner_table').append("<div class='film_table_genre_row'>" + exhibition_format_str + "</div>")
            }

            $('.film_table_content_left > .film_table_inner_table').append("<div class='film_table_inner_row_text_spacer'></div>")
        }

        else if (!genre_exists && !category_exists) {
            $('.film_table_content_left > .film_table_inner_table').append("<div class='film_table_inner_row_text_spacer'></div>")
        }

        $('.film_table_content_left > .film_table_inner_table').append("<div class='film_table_text'><a href='" + web_host + "feeschedule'><div class='inquire'><b>INQUIRE ABOUT FILM SALES + RENTALS</b></div></a></div>")

        $('.film_table_content_left > .film_table_inner_table').append("<div class='film_table_end_buffer'></div>")
        // right cell

        $('.film_table_content_right').append("<div class='film_table_inner_table'><div class='film_table_inner_row_top_image_spacer'>\
        </div></div>")

        // still
        // $('.film_table_content_right > .film_table_inner_table').append("<div class='film_table_inner_still'><div class='film_still_container'></div></div>")

        

        if (film_obj['still']) {
            $('.film_table_content_right > .film_table_inner_table').append("<div class='film_table_inner_still'><div class='film_still_container'></div></div>")
            $('.film_still_container').append('<img class="film_still_container_child" src="' + film_obj['still'] + '">')
            $('.film_still_container img').on('load', 
                function() {
                    if($('.film_still_container img').height() > $('.film_still_container').height()) {
                        $('.film_still_container img').height($('.film_still_container').height() + 30)
                    }
                });
        }

        // vucavu link 
        if (film_obj['user_type'] == "0" && film_obj['vucavu_url']) {
            $('.film_table_inner_table > .film_table_inner_row_top_image_spacer').append("\
            <a href='" + film_obj['vucavu_url'] +"' target='_blank'>\
                    <div class='link'> WATCH ON DEMAND </div>\
                    <div class='glyph_container'><i class='material-icons'>tv</i></div>\
            </a>")
        }

        // video clip
        if (film_obj['old_preview_url_full'] || film_obj['vimeo_preview_full_id'] || film_obj['old_preview_url_clip'] || film_obj['vimeo_preview_clip_id']) {
            if (film_obj['still']) {
                $('.film_table_content_right > .film_table_inner_table').append("<div class='film_table_inner_row_text_spacer'></div>")
            }
            
            $('.film_table_content_right > .film_table_inner_table').append("<div class='film_table_inner_video'></div>")

            // vimeo
            if (film_obj['vimeo_preview_full_id'] || film_obj['vimeo_preview_clip_id']) {
                $('.film_table_content_right > .film_table_inner_table').append('<div class="film_table_inner_video_placeholder"></div>')
                $('.film_table_content_right > .film_table_inner_table').append("<div class='video_links'></div>")
                if (film_obj['vimeo_preview_full_id']) {
                    $('.film_table_inner_video').append('<div class="film_table_inner_video_preview"></div>')
                    $('.film_table_inner_video_preview').append('<iframe src="https://player.vimeo.com/video/' + film_obj['vimeo_preview_full_id'] + '" width="380" height="265" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>')
                    $('.video_links').append("<div class='full_preview'><b>FULL PREVIEW</b></div>")
                    $(".full_preview").addClass("link_on")
                }
                if (film_obj['vimeo_preview_clip_id']) {
                    $('.film_table_inner_video').append('<div class="film_table_inner_video_clip"></div>')
                    $('.film_table_inner_video_clip').append('<iframe src="https://player.vimeo.com/video/' + film_obj['vimeo_preview_clip_id'] + '" width="380" height="265" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>')
                    $('.video_links').append("<div class='clip_link'><b>CLIP</b></div>")
                    //$(".full_preview").removeClass("link_on")
                    if (film_obj['user_type']=="0") {
                        $(".clip_link").addClass("link_on")
                    }            
                }

                if (film_obj['vimeo_preview_full_id'] && film_obj['vimeo_preview_clip_id']) {
                    $(".full_preview").click(function() {
                        $('.film_table_inner_video_clip').hide()
                        $('.film_table_inner_video_preview').show()
                        $(".clip_link").removeClass("link_on")
                        $(".full_preview").addClass("link_on")  
                    })
                    $(".clip_link").click(function() {
                        $('.film_table_inner_video_clip').show()
                        $('.film_table_inner_video_preview').hide()
                        $(".full_preview").removeClass("link_on")
                        $(".clip_link").addClass("link_on")  
                    })
                }
                
            }

            // jwplayer
            else if (film_obj['old_preview_url_full'] || film_obj['old_preview_url_clip']) {
                $('.film_table_content_right > .film_table_inner_table').append('<div class="film_table_inner_video_placeholder"></div>')
                $('.film_table_content_right > .film_table_inner_table').append("<div class='video_links'></div>")

                if (film_obj['old_preview_url_clip']) {
                    $('.film_table_inner_video').append('<div id="film_table_inner_video_clip"></div>')
                    $('#film_table_inner_video_preview').hide()
                    getJWPlayerStr(film_obj['old_preview_url_clip'], film_obj, jwplayer("film_table_inner_video_clip"))
                    $('.video_links').append("<div class='clip_link'><b>CLIP</b></div>")
                    if (film_obj['user_type']=="0") {
                        $(".clip_link").addClass("link_on")
                    }   
                }
                

                if (film_obj['old_preview_url_full']) {
                    $('.film_table_inner_video').append('<div id="film_table_inner_video_preview"></div>')
                    getJWPlayerStr(film_obj['old_preview_url_full'], film_obj, jwplayer("film_table_inner_video_preview"))
                    $('.video_links').append("<div class='full_preview'><b>FULL PREVIEW</b></div>")
                    $(".full_preview").addClass("link_on")
                }
                

                if (film_obj['old_preview_url_full'] && film_obj['old_preview_url_clip']) {
                    $(".full_preview").click(function() {
                        $(".clip_link").removeClass("link_on")
                        $(".full_preview").addClass("link_on") 
                        $('#film_table_inner_video_clip').hide()
                        $('#film_table_inner_video_preview').show()
                    })
                    $(".clip_link").click(function() {
                        $(".full_preview").removeClass("link_on")
                        $(".clip_link").addClass("link_on") 
                        $('#film_table_inner_video_clip').show()
                        $('#film_table_inner_video_preview').hide()
                    })
                }
            }

        }

        $('.film_table_content_right > .film_table_inner_table').append("<div class='film_table_end_buffer'></div>")
    }
})

$(window).load(checkTitle)

function checkTitle() {
    normalTitleHeight = 42;
    curTitleHeight = $(".film_table_inner_row_title > .title").height();
    remainder = curTitleHeight - normalTitleHeight

    if (remainder > 0) {
        imageSpacerHeight = $(".film_table_inner_row_top_image_spacer").height()
        $(".film_table_inner_row_top_image_spacer").height(remainder + imageSpacerHeight)
    }
}

function getJWPlayerStr(video_link, film_obj, playerInstance) {
    if (film_obj['still']) {
        playerInstance.setup({
            playlist: [{
            file: video_link,
            //image: film_obj['still'],
        }],
            'height': 265,
            'width': 380
        });
    }
    else {
        playerInstance.setup({
            file: video_link,
            'height': 265,
            'width': 380,
        });
    }

    jwplayer().once('displayClick',function(){
        document.getElementsByClassName('jw-icon-rewind')[0].style.display='none';
        document.getElementsByClassName('jw-icon-prev')[0].style.display='none';
    })
}

function film_details(film_obj) {
    film_details = [film_obj['country'], film_obj['length'], film_obj['year'], film_obj['sound'], film_obj['colour'], film_obj['language']]
    film_detail_str = "";
    film_detail_first_string_found = false;
    for (i = 0; i < film_details.length; i++) { 
        if (film_details[i]) {
            if (i == 0 || !film_detail_first_string_found) {
                film_detail_first_string_found = true
                film_detail_str += film_details[i]
            }
            else {
                film_detail_str += " / " + film_details[i]
            }
        }
    }
    return film_detail_str
}