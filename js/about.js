$(document).ready(function() {
    document.title = "About | Canadian Filmmakers Distribution Centre"
    $(".contents").append("<div class='top_buffer'></div>")

    //about section
    $(".contents").append("<div class='accessible'></div>")
    $(".accessible").last().append("<div class='about_table'></div>")
    $(".about_table").last().append("<div class='about_table_cell_container'></div>")
    
    $(".about_table_cell_container").last().append("<div class='about_table_cell_left_margin'></div>")
    $(".about_table_cell_container").last().append("<div class='about_table_contents'></div>")
    $(".about_table_cell_container").last().append("<div class='about_table_cell_right_margin'></div>")

    $(".about_table_contents").last().append("<div class='generic_table'></div>")
    $(".generic_table").last().append("<div class='generic_table_title'><div class='generic_title'>About</div></div>")
    $(".generic_table").last().append("<div class='generic_spacer'></div>")
    
    $(".generic_table").last().append("<div class='generic_info_table'></div>")

    $(".generic_info_table").last().append("<div class='generic_info_about'>" + about_json['body'] + "</div>")
    $(".generic_info_table").last().append("<div class='generic_info_spacer'></div>")
    $(".generic_info_table").last().append("<div class='generic_info_image_about'></div>")
    $(".generic_info_image_about").last().append("<div class='img_container'></div>")
    $(".img_container").last().append("<img src='" + about_json['images'][0] + "' class='img_container_child'>")

    // $(".generic_info_about").last().append("<div class='generic_spacer'></div>")
    $(".generic_info_table").last().append("<div class='generic_spacer_about'></div>")

    //Mandate section
    $(".contents").append("<div class='accessible_generic'></div>")
    $(".accessible_generic").last().append("<div class='about_table'></div>")
    $(".about_table").last().append("<div class='about_table_cell_container'></div>")
    
    $(".about_table_cell_container").last().append("<div class='about_table_cell_left_margin'></div>")
    $(".about_table_cell_container").last().append("<div class='about_table_contents'></div>")
    $(".about_table_cell_container").last().append("<div class='about_table_cell_right_margin'></div>")

    $(".about_table_contents").last().append("<div class='generic_table'></div>")
    $(".generic_table").last().append("<div class='generic_table_title'><div class='generic_sub_title'>Mandate</div></div>")
    $(".generic_table").last().append("<div class='generic_spacer'></div>")
    
    $(".generic_table").last().append("<div class='generic_info_table'></div>")

    $(".generic_info_table").last().append("<div class='generic_info'>" + mandate_json['body'] + "</div>")
    $(".generic_info_table").last().append("<div class='generic_info_spacer'></div>")
    $(".generic_info_table").last().append("<div class='generic_info_image'></div>")
    $(".generic_info_image").last().append("<div class='img_container'></div>")
    $(".img_container").last().append("<img src='" + mandate_json['images'][0] + "' class='img_container_child'>")

    $(".generic_info").last().append("<div class='generic_spacer'></div>")

    //Vision section
    $(".contents").append("<div class='accessible_generic'></div>")
    $(".accessible_generic").last().append("<div class='about_table'></div>")
    $(".about_table").last().append("<div class='about_table_cell_container'></div>")
    
    $(".about_table_cell_container").last().append("<div class='about_table_cell_left_margin'></div>")
    $(".about_table_cell_container").last().append("<div class='about_table_contents'></div>")
    $(".about_table_cell_container").last().append("<div class='about_table_cell_right_margin'></div>")

    $(".about_table_contents").last().append("<div class='generic_table'></div>")
    $(".generic_table").last().append("<div class='generic_table_title'><div class='generic_sub_title'>Vision</div></div>")
    $(".generic_table").last().append("<div class='generic_spacer'></div>")
    
    $(".generic_table").last().append("<div class='generic_info_table'></div>")

    $(".generic_info_table").last().append("<div class='generic_info'>" + vision_json['body'] + "</div>")
    $(".generic_info_table").last().append("<div class='generic_info_spacer'></div>")
    $(".generic_info_table").last().append("<div class='generic_info_image'></div>")
    $(".generic_info_image").last().append("<div class='img_container'></div>")
    $(".img_container").last().append("<img src='" + vision_json['images'][0] + "' class='img_container_child'>")

    $(".generic_info").last().append("<div class='generic_spacer'></div>")

    //Values section
    $(".contents").append("<div class='accessible_generic'></div>")
    $(".accessible_generic").last().append("<div class='about_table'></div>")
    $(".about_table").last().append("<div class='about_table_cell_container'></div>")
    
    $(".about_table_cell_container").last().append("<div class='about_table_cell_left_margin'></div>")
    $(".about_table_cell_container").last().append("<div class='about_table_contents'></div>")
    $(".about_table_cell_container").last().append("<div class='about_table_cell_right_margin'></div>")

    $(".about_table_contents").last().append("<div class='generic_table'></div>")
    $(".generic_table").last().append("<div class='generic_table_title'><div class='generic_sub_title'>Values</div></div>")
    $(".generic_table").last().append("<div class='generic_spacer'></div>")
    
    $(".generic_table").last().append("<div class='generic_info_table'></div>")

    $(".generic_info_table").last().append("<div class='generic_info'>" + values_json['body'] + "</div>")
    $(".generic_info_table").last().append("<div class='generic_info_spacer'></div>")
    $(".generic_info_table").last().append("<div class='generic_info_image'></div>")
    $(".generic_info_image").last().append("<div class='img_container'></div>")
    $(".img_container").last().append("<img src='" + values_json['images'][0] + "' class='img_container_child'>")

    $(".generic_info").last().append("<div class='about_table_end_buffer'></div>")


})

$(window).load(function() {
    $(".about").addClass("about_selected")
})