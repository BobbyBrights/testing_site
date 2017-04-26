var web_host = "http://www.cfmdc.org/";

$(document).ready(function() {
    $(".contents").append("<div class='top_buffer'></div>")

    document.title = "Films For The Classroom" + " | Canadian Filmmakers Distribution Centre"

    $("#filmsfortheclassroom").addClass("educators_link_selected")
    $(".educators").css("color", "#FFC300")

    $(".contents").append("<div class='accessible'></div>")
    $(".accessible").append("<div class='table'></div>")
    $(".table").append("<div class='table_cell_container'></div>")
    $(".table_cell_container").append("<div class='table_cell_left_margin'></div>")
    $(".table_cell_container").append("<div class='table_content'></div>")
    $(".table_cell_container").append("<div class='table_cell_right_margin'></div>")
    $(".table_content").append("<div class='table_title'><div class='title'>Films For The Classroom</div></div>")
    $(".table_content").append("<div class='table_spacer'></div>")
    getCompilations()
    $(".accessible").append("<div class='filmmaker_table_end_buffer'></div>")
})

function getStill(container, film_object) {
    containerw = 253
    containerh = 188
    if (film_object['still_width'] < containerw || film_object['still_height'] < containerh) {
        $('.' + container).last().append("<img src='" + film_object['image'] + "' class='film_still_container_child'>")
    }
    else if (film_object['still_width'] == 740) {
        $('.' + container).last().append("<img src='" + film_object['image'] + "' class='film_still_container_child'>")
        $('.' + container + ' > img').last().width(containerw + 90)
    }
    else {
        $('.' + container).last().append("<img src='" + film_object['image'] + "' class='film_still_container_child'>")
        $('.' + container + ' > img').last().width(containerw)
    }

}

function getCompilations() {
    container_names = ["red_container", "yellow_container", "blue_container", "green_container", "orange_container"]

    for (i=0; i<comp_obj.length; i++) {
        container = getContainerClass(comp_obj[i]['colour'])

        if (i % 3 == 0) {
            if (i != 0) {
                $(".table_content").append("<div class='table_spacer'></div>")
            }
            $(".table_content").append("<div class='table_compilation_cell'></div>")
            $(".table_compilation_cell").append("<div class='table_compilation_row'></div>")
        }

        $(".table_compilation_row").last().append("<a href='" + web_host +  "filmsfortheclassroom/" + comp_obj[i]['nid'] + "'><div class='" + container + "'></div></a>")
        if (comp_obj[i]['still_width']) {
            getStill(container, comp_obj[i])
        }
        $("." + container ).last().append("<div class='table_compilation_container_center'><div class='text'>" + comp_obj[i]['title'] + "</div></div>")

        //alert(comp_obj[i]['nid'])

        if (i % 3 == 0 || i % 3 == 1) {
            $(".table_compilation_row").last().append("<div class='table_compilation_spacer'></div>")
        }
    }

    leftover = comp_obj.length % 3

    if (leftover != 0) {
        remainders = 3 - leftover
        for (i=leftover + 1; i <= 3; i++) {
            $(".table_compilation_row").last().append("<div class='table_compilation_container_empty'></div>")
            if (i != 3) {
                $(".table_compilation_row").last().append("<div class='table_compilation_spacer'></div>")
            }
        } 
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