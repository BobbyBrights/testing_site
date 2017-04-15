$(document).ready(function() {
    $(".contents").append("<div class='top_buffer'></div>")
    if (!news_obj) {
        $(".contents").append("<div class='not_accessible'></div>")
        $(".not_accessible").append("<div class='sorry_text'>SORRY. THIS PAGE DOES NOT EXIST.</div>")
    }
    else {
        document.title = "What's New | Canadian Filmmakers Distribution Centre"
        $(".contents").append("<div class='accessible'></div>")
        $(".accessible").append("<div class='news_table'></div>")
        $(".news_table").append("<div class='news_table_cell_container'></div>")
        $(".news_table_cell_container").append("<div class='news_table_cell_left_margin'></div>")
        $(".news_table_cell_container").append("<div class='news_table_cell_centre'></div>")
        $(".news_table_cell_container").append("<div class='news_table_cell_right_margin'></div>")

        $(".news_table_cell_centre").append("<div class='news_table_news_info_row'></div>")
        $(".news_table_news_info_row").append("<div class='news_table_news_title_cell'></div>")
        $(".news_table_news_title_cell").append("<div class='news_title'>" + news_obj['news_title'] + "</div>")

        $(".news_table_cell_centre").append("<div class='news_table_spacer'></div>")

        $(".news_table_cell_centre").append("<div class='news_table_news_details_row'></div>")
        $(".news_table_news_details_row").append("<div class='news_table_news_text_cell'></div>")
        $(".news_table_news_text_cell").append("<div class='news_text'>" + news_obj['news_text'] + "</div>")

        $(".news_table_cell_centre").append("<div class='news_table_end_buffer'></div>")

        $(".news_text").find("a").each(function() {
            $(this).attr("target", "_blank")
        })

        $(".news_text").find("img").each(function() {
            $(this).load( function() {
                curw = $(this).width()
                curh = $(this).height()
                ratio = curh/curw

                //landscape
                if (curw > curh) {
                    if (curw > 537) {

                        $(this).width(537)
                        $(this).height(537 * ratio)

                    }
                }

                //portrait
                else {
                    if (curw > 380) {

                        $(this).width(380)
                        $(this).height(380 * ratio)

                    }
                }
            })
        })
    }
})