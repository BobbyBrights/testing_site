$(document).ready(function() {
    document.title = "Links | Canadian Filmmakers Distribution Centre"
    $(".contents").append("<div class='top_buffer'></div>")
    $(".contents").append("<div class='accessible'><div class='links_table'></div></div>")
    $(".links_table").append("<div class='links_table_cell_container'></div>")
    $(".links_table_cell_container").append("<div class='links_table_cell_left_margin'></div><div class='links_table_contents'></div><div class='links_table_cell_right_margin'></div>")
    $(".links_table_contents").append("<div class='links_table_title'></div>")
    $(".links_table_title").append("<div class='links_title'>Links</div>")
    $(".links_table_contents").append("<div class='links_spacer'></div>")

    $(".links_table_contents").append("<div class='links_links_row_container'></div>")
    $(".links_links_row_container").append("<div class='links_links_table_left'></div>")
    $(".links_links_row_container").append("<div class='links_links_table_centre'></div>")
    $(".links_links_row_container").append("<div class='links_links_table_right'></div>")

    // split text into two columns split on <break>
    links_cols = pages_json['body'].split("<break>")

    $(".links_links_table_left").append(links_cols[0])
    $(".links_links_table_right").append(links_cols[1])

    $(".links_table_contents a").attr("target", "_blank")

    $(".links_table").append("<div class='links_table_end_buffer'></div>")
    $(".links_").css("color", "#FFC300")
})

$(window).load(function() {
    $(".links_").addClass("links_selected")
})