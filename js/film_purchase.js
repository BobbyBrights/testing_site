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

    $(".generic_info_table").last().append("<div class='generic_info_about'>" + film_purchase_obj['film_description'] + "</div>")
    $(".generic_info_table").last().append("<div class='generic_info_spacer'></div>")
    $(".generic_info_table").last().append("<div class='generic_info_image_about'></div>")
    $(".generic_info_image_about").last().append("<div class='img_container'></div>")
    $(".img_container").last().append("<img src='" + film_purchase_obj['large_image_url'] + "' class='img_container_child'>")
})