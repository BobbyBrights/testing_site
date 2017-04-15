$(document).ready(function() {
    document.title = "Staff + Board | Canadian Filmmakers Distribution Centre"
    $(".contents").append("<div class='top_buffer'></div>")
    $(".contents").append("<div class='accessible'><div class='staffboard_table'></div></div>")
    $(".staffboard_table").append("<div class='staffboard_table_cell_container'></div>")
    $(".staffboard_table_cell_container").append("<div class='staffboard_table_cell_left_margin'></div>")
    $(".staffboard_table_cell_container").append("<div class='staffboard_table_contents'></div>")
    $(".staffboard_table_cell_container").append("<div class='staffboard_table_cell_right_margin'></div>")
    $(".staffboard_table_contents").append("<div class='generic_table'></div>")
    $(".generic_table").last().append("<div class='generic_table_title'></div>")
    $(".generic_table_title").last().append("<div class='generic_title'>Staff</div>")

    getStaff(staff_json)

    $(".staffboard_table_contents").append("<div class='contents_spacer'></div>")
    $(".staffboard_table_contents").append("<div class='contents_spacer'></div>")

    $(".contents").append("<div class='accessible_board'><div class='staffboard_table'></div></div>")
    $(".staffboard_table").last().append("<div class='staffboard_table_cell_container'></div>")
    $(".staffboard_table_cell_container").last().append("<div class='staffboard_table_cell_left_margin'></div>")
    $(".staffboard_table_cell_container").last().append("<div class='staffboard_table_contents'></div>")
    $(".staffboard_table_cell_container").last().append("<div class='staffboard_table_cell_right_margin'></div>")

    $(".staffboard_table_contents").last().append("<div class='generic_table'></div>")
    $(".generic_table").last().append("<div class='generic_table_title'></div>")
    $(".generic_table_title").last().append("<div class='generic_title'>Board</div>")

    getBoard(board_json)

    $(".staffboard_table_contents").last().append("<div class='contents_end_buffer'></div>")
})

$(window).load(function() {
    $(".staffboard").addClass("staffboard_selected")
})

function getStaff(obj) {
    for (i=0; i<obj.length; i++) {
        $(".generic_table").last().append("<div class='generic_spacer'></div>")
        $(".generic_table").last().append("<div class='generic_info_table'></div>")
        $(".generic_info_table").last().append("<div class='generic_info_image'></div>")

        if (obj[i]['portrait']) {
            if (parseInt(obj[i]['width']) < parseInt(obj[i]['height'])) {
                $(".generic_info_image").last().append("<div class='portrait_container'></div>")
                $(".portrait_container").last().append("<img src='" + obj[i]['portrait'] + "' class='portrait_container_child'>")
            }
            else {
                $(".generic_info_image").last().append("<div class='portrait_container'></div>")
                $(".portrait_container").last().append("<img src='" + obj[i]['portrait'] + "' class='portrait_container_child'>")
            }
        }

        $(".generic_info_table").last().append("<div class='generic_info_spacer'></div>")
        $(".generic_info_table").last().append("<div class='generic_info'></div>")

        $(".generic_info").last().append("<div class='name'>" + obj[i]['full_name'] + "</div>")

        $(".generic_info").last().append("<div class='spacer'></div>")

        for (j=0; j<obj[i]['positions'].length; j++) {
            $(".generic_info").last().append("<div class='text'>" + obj[i]['positions'][j] + "</div>")
        }

        for (j=0; j<obj[i]['emails'].length; j++) {
            $(".generic_info").last().append("<div class='email'><a href='mailto:" + obj[i]['emails'][j] + "'>" + obj[i]['emails'][j] + "</a></div>")
        }

        $(".generic_info").last().append("<div class='spacer'></div>")

        $(".generic_info").last().append("<div class='text'>" + obj[i]['biography'] + "</div>")
    }
}

function getBoard(obj) {
    for (i=0; i<obj.length; i++) {
        $(".generic_table").last().append("<div class='generic_spacer'></div>")
        $(".generic_table").last().append("<div class='generic_info_table'></div>")
        $(".generic_info_table").last().append("<div class='generic_info_image'></div>")

        if (obj[i]['portrait']) {
            if (parseInt(obj[i]['width']) < parseInt(obj[i]['height'])) {
                $(".generic_info_image").last().append("<div class='portrait_container'></div>")
                $(".portrait_container").last().append("<img src='" + obj[i]['portrait'] + "' class='portrait_container_child'>")
            }
            else {
                $(".generic_info_image").last().append("<div class='portrait_container'></div>")
                $(".portrait_container").last().append("<img src='" + obj[i]['portrait'] + "' class='portrait_container_child'>")
            }
        }

        $(".generic_info_table").last().append("<div class='generic_info_spacer'></div>")
        $(".generic_info_table").last().append("<div class='generic_info'></div>")

        $(".generic_info").last().append("<div class='name'>" + obj[i]['full_name'] + "</div>")

        $(".generic_info").last().append("<div class='spacer'></div>")

        $(".generic_info").last().append("<div class='text'>" + obj[i]['biography'] + "</div>")
    }
}