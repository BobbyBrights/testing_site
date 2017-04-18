$(document).ready(function() {
    $(".contents").append("<div class='top_buffer'></div>")
    document.title = film_obj['film_title'] + " | Canadian Filmmakers Distribution Centre"
    $(".catalogue").css("color", "#E22134")
    $(".contents").append("<div class='accessible'></div>")
    $(".accessible").last().append("<div class='purchase_table'></div>")
    $(".purchase_table").last().append("<div class='purchase_table_cell_container'></div>")
    
    $(".purchase_table_cell_container").last().append("<div class='purchase_table_cell_left_margin'></div>")
    $(".purchase_table_cell_container").last().append("<div class='purchase_table_contents'></div>")
    $(".purchase_table_cell_container").last().append("<div class='purchase_table_cell_right_margin'></div>")

    $(".purchase_table_contents").last().append("<div class='generic_table'></div>")
    $(".generic_table").last().append("<div class='generic_table_title'><div class='generic_title'>"+ film_obj['film_title'] + "</div></div>")
    $(".generic_table").last().append("<div class='generic_spacer'></div>")

    $(".generic_table").last().append("<div class='generic_info_table'></div>")
    $(".generic_info_table").last().append("<div class='generic_text'>by <b><a href='" + web_host + "filmmaker/1'> CFMDC Special Edition</a></b></div>")
    $(".generic_info_table").last().append("<div class='generic_text_spacer'></div>")

    if (parseInt(film_purchase_obj['large_image_height']) > parseInt(film_purchase_obj['large_image_width'])) {

        $(".generic_table").last().append("<div class='generic_info_table'></div>")

        $(".generic_info_table").last().append("<div class='generic_info_purchase'>" + film_purchase_obj['film_description'] + "</div>")
        $(".generic_info_table").last().append("<div class='generic_info_spacer'></div>")
        $(".generic_info_table").last().append("<div class='generic_info_image_purchase'></div>")
        $(".generic_info_image_purchase").last().append("<img src='" + film_purchase_obj['large_image_url'] + "' class='img_container_child_portrait'>")
    }
    else {
        $(".generic_table").last().append("<div class='generic_info_table'></div>")
        $(".generic_info_table").last().append("<div class='generic_info_image_landscape_purchase'></div>")
        $(".generic_info_image_landscape_purchase").last().append("<img src='" + film_purchase_obj['large_image_url'] + "' class='img_container_child_landscape'>")
        $(".generic_info_table").last().append("<div class='generic_info_landscape_purchase'><div class='generic_text_spacer_lg'></div>" + film_purchase_obj['film_description'] + "</div>")
    }

    $(".generic_table").last().append("<div class='generic_spacer'></div>")

    getVolume(film_purchase_obj['volumes'])
})

function getVolume(volumes) {

    for (i=0; i<volumes.length; i++) {
        $(".generic_table").last().append("<div class='volume_container'></div>")
        $(".volume_container").last().append("<div class='volume_title_container'></div>")
        $(".volume_title_container").last().append("<div class='volume_title'><div class='" + getContainerClass(volumes[i]['link_colour']) + "'</div>" + volumes[i]['volume_title'] + "</div>")

        if (getContainerClass(volumes[i]['additional_text'])) {
            $(".volume_container").last().append("<div class='generic_spacer_sm'></div>")
            $(".volume_container").last().append("<div class='volume_additional_text_container'><div class='" + getContainerClass(volumes[i]['link_colour']) + "_text'</div>" + volumes[i]['additional_text'] + "</div>")
        }

        $(".volume_container").last().append("<div class='films_container'></div>")

        for (j=0; j<volumes[i]['volumes_contents'].length; j++) {
            $(".films_container").last().append("<div class='film_container'></div>")
            if (volumes[i]['volumes_contents'][j]['film_id']) {
                $(".film_container").last().append("<a href='" + web_host + "film/" + volumes[i]['volumes_contents'][j]['film_id'] + "' class='" + getContainerClass(volumes[i]['link_colour']) + "_a'></a>")
                $("a").last().append("<div class='" + getContainerClass(volumes[i]['link_colour']) + "_img'></div>")
            }
            else {
                $(".film_container").last().append("<div class='" + getContainerClass(volumes[i]['link_colour']) + "_img'></div>")
            }
            if (volumes[i]['volumes_contents'][j]['image_url']) {
                getStill(volumes[i]['volumes_contents'][j], getContainerClass(volumes[i]['link_colour']) + "_img")
            }


            $(".film_container").last().append("<div class='film_text_container'></div>")
            $(".film_text_container").last().append("<div class='" + getContainerClass(volumes[i]['link_colour']) + "_text'></div>")
            if (volumes[i]['volumes_contents'][j]['film_id']) {
                $("." + getContainerClass(volumes[i]['link_colour']) + "_text").last().append("<a href='" + web_host + "film/" + volumes[i]['volumes_contents'][j]['film_id'] + "' class='" + getContainerClass(volumes[i]['link_colour']) + "_a'></a>")
                $("a").last().append(volumes[i]['volumes_contents'][j]['title'])
            }
            else {
                $("." + getContainerClass(volumes[i]['link_colour']) + "_text").last().append("<b>" + volumes[i]['volumes_contents'][j]['title'] + "</b>")
            }
            
        }
        $(".generic_table").last().append("<div class='generic_spacer'></div>")
    }
}

function getStill(film_object, img_container) {
    containerw = 253
    containerh = 188

    if (film_object['still_width'] < containerw) {
        $('.' + img_container).last().append("<img src='" + film_object['image_url'] + "' class='film_still_container_child'>")
        $('.' + img_container).last().width(film_object['still_width'])
        $('.' + img_container).last().height(film_object['still_height'])
        $('.' + img_container).last().css('margin-left', (253 - parseInt(film_object['still_width']))/2.0 + "px")
                
    }
    else if (film_object['still_width'] == 740) {
        $('.' + img_container).last().append("<img src='" + film_object['image_url'] + "' class='film_still_container_child'>")
        $('.' + img_container + " > img").last().width(containerw + 90)
    }
    else {
        $('.' + img_container).last().append("<img src='" + film_object['image_url'] + "' class='film_still_container_child'>")
        $('.' + img_container + " > img").last().width(containerw)
        $('.' + img_container).css("background-color", "#fff")
    }

}

function getContainerClass(colour) {
    if (colour == "Blue") {
        return "blue_container"
    }
    else if (colour == "Grey") {
        return "grey_container"
    }
    else if (colour == "Orange") {
        return "orange_container"
    }
    else if (colour == "Yellow") {
        return "yellow_container"
    }
    else if (colour == "Green") {
        return "green_container"
    }
    else if (colour == "Purple") {
        return "purple_container"
    }
    else if (colour == "Red") {
        return "red_container"
    }
    else {
        return "black_container"
    }
}