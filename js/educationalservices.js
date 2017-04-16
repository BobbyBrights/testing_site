$(document).ready(function() {
    document.title = "Educational Services | Canadian Filmmakers Distribution Centre"
    
    $("#educationalservices").addClass("educators_link_selected")
    $(".educators").css("color", "#FFC300")
    
    $(".contents").append("<div class='top_buffer'></div>")

    $(".contents").append("<div class='accessible'></div>")
    $(".accessible").last().append("<div class='page_table'></div>")
    $(".page_table").last().append("<div class='page_table_cell_container'></div>")
    
    $(".page_table_cell_container").last().append("<div class='page_table_cell_left_margin'></div>")
    $(".page_table_cell_container").last().append("<div class='page_table_contents'></div>")
    $(".page_table_cell_container").last().append("<div class='page_table_cell_right_margin'></div>")

    $(".page_table_contents").last().append("<div class='generic_table'></div>")
    $(".generic_table").last().append("<div class='generic_table_title'><div class='generic_title'>Educational Services</div></div>")
    $(".generic_table").last().append("<div class='generic_spacer'></div>")

    $(".contents").append("<div class='accessible_generic'></div>")
    $(".accessible_generic").last().append("<div class='page_table'></div>")
    $(".page_table").last().append("<div class='page_table_cell_container'></div>")
    
    $(".page_table_cell_container").last().append("<div class='page_table_cell_left_margin'></div>")
    $(".page_table_cell_container").last().append("<div class='page_table_contents'></div>")
    $(".page_table_cell_container").last().append("<div class='page_table_cell_right_margin'></div>")

    $(".page_table_contents").last().append("<div class='generic_table'></div>")    
    $(".generic_table").last().append("<div class='generic_info_table'></div>")

    $(".generic_info_table").last().append("<div class='generic_info'>" + page_obj['body'] + "</div>")

    $(".generic_info").last().append("<div class='page_table_end_buffer'></div>")

})