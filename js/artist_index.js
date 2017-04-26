var web_host = "http://www.cfmdc.org/";

$(document).ready(function() {
    $(".contents").append("<div class='top_buffer'></div>")

    if (!artist_index_obj) {
        $(".contents").append("<div class='not_accessible'></div>")
        $(".not_accessible").append("<div class='sorry_text'>SORRY. THIS PAGE DOES NOT EXIST.</div>")
    }
    else {

        document.title = "Artist Index | " + alpha.toUpperCase() + " | Canadian Filmmakers Distribution Centre"

        $("#artist_index").addClass("catalogue_link_selected")
        $(".catalogue").css("color", "#E22134")

        links = alpha_links()

        $(".contents").append("<div class='accessible'></div>")
        $(".accessible").append("<div class='artist_index_table'></div>")
        $(".artist_index_table").append("<div class='artist_index_table_cell_container'></div>")
        $(".artist_index_table_cell_container").append("<div class='artist_index_table_cell_left_margin'></div>")
        $(".artist_index_table_cell_container").append("<div class='artist_index_table_contents'></div>")
        $(".artist_index_table_contents").append("<div class='artist_index_table_title'></div>")
        $(".artist_index_table_title").append("<div class='artist_index_title'>Artist Index</div>")
        $(".artist_index_table_title").append("<div class='artist_index_title_spacer'></div>")
        $(".artist_index_table_title").append("<div class='artist_alpha'>" + alpha.toUpperCase() + "</div>")
        $(".artist_index_table_cell_container").append("<div class='artist_index_table_cell_right_margin'></div>")
        $(".artist_index_table_contents").append("<div class='artist_index_spacer'></div>")
        $(".artist_index_table_contents").append("<div class='alpha_bar'></div>")
        $(".alpha_bar").append(links)

        link_number = alpha.charCodeAt() - 97;

        $('.alpha_list_entry > span').each(function(i, obj) {
            if (i === link_number) {
                $(obj).addClass('activate')
            }
        })

        $(".artist_index_table_contents").append("<div class='artist_index_spacer_below'></div>")

        if (artist_index_obj['filmmakers'].length != 0) {
            $(".artist_index_table_contents").append("<div class='artist_index_table_filmmaker'></div>")
            $(".artist_index_table_filmmaker").append("<div class='filmmaker_cell_four'></div>");
            $(".filmmaker_cell_four").last().append(getColumn(1, artist_index_obj['filmmakers'],0))
            $(".artist_index_table_filmmaker").append("<div class='filmmaker_cell_spacer'></div>");
            $(".artist_index_table_filmmaker").append("<div class='filmmaker_cell_four'></div>");
            $(".filmmaker_cell_four").last().append(getColumn(2, artist_index_obj['filmmakers'],0))
            $(".artist_index_table_filmmaker").append("<div class='filmmaker_cell_spacer'></div>");
            $(".artist_index_table_filmmaker").append("<div class='filmmaker_cell_four'></div>");
            $(".filmmaker_cell_four").last().append(getColumn(3, artist_index_obj['filmmakers'], 0))
            $(".artist_index_table_filmmaker").append("<div class='filmmaker_cell_spacer'></div>");
            $(".artist_index_table_filmmaker").append("<div class='filmmaker_cell_four'></div>");
            $(".filmmaker_cell_four").last().append(getColumn(4, artist_index_obj['filmmakers'], 0))
            
            $(".artist_index_table_contents").append("<div class='table_end_buffer'></div>")
        }

        // if (artist_index_obj['filmmakers'].length != 0) {
        //     $(".artist_index_table_contents").append("<div class='artist_index_table_filmmaker'></div>")
        //     $(".artist_index_table_filmmaker").append("<div class='filmmaker_cell'></div>");
        //     $(".filmmaker_cell").last().append(getColumn(1, artist_index_obj['filmmakers'],0))
        //     $(".artist_index_table_filmmaker").append("<div class='filmmaker_cell_spacer'></div>");
        //     $(".artist_index_table_filmmaker").append("<div class='filmmaker_cell'></div>");
        //     $(".filmmaker_cell").last().append(getColumn(2, artist_index_obj['filmmakers'],0))
        //     $(".artist_index_table_filmmaker").append("<div class='filmmaker_cell_spacer'></div>");
        //     $(".artist_index_table_filmmaker").append("<div class='filmmaker_cell'></div>");
        //     $(".filmmaker_cell").last().append(getColumn(3, artist_index_obj['filmmakers'], 0))
            

        //     if (lastColumnLarger()) {
        //         $('.artist_index_table_filmmaker').html("")
        //         $(".artist_index_table_filmmaker").append("<div class='filmmaker_cell'></div>");
        //         $(".filmmaker_cell").last().append(getColumn(1, artist_index_obj['filmmakers'],1))
        //         $(".artist_index_table_filmmaker").append("<div class='filmmaker_cell_spacer'></div>");
        //         $(".artist_index_table_filmmaker").append("<div class='filmmaker_cell'></div>");
        //         $(".filmmaker_cell").last().append(getColumn(2, artist_index_obj['filmmakers'],1))
        //         $(".artist_index_table_filmmaker").append("<div class='filmmaker_cell_spacer'></div>");
        //         $(".artist_index_table_filmmaker").append("<div class='filmmaker_cell'></div>");
        //         $(".filmmaker_cell").last().append(getColumn(3, artist_index_obj['filmmakers'],1))
        //     }

        //     $(".artist_index_table_contents").append("<div class='table_end_buffer'></div>")
        // }

        else {
            $(".artist_index_table_contents").append("<div class='no_artist'>SORRY. NO ARTIST(S) FOUND.</div>")
        }
    }
})

function lastColumnLarger() {
    columnFirstHeight = checkColumn($('.filmmaker_cell').first().find('a'))
    columnLastHeight = checkColumn($('.filmmaker_cell').last().find('a'))
    return columnLastHeight > columnFirstHeight
}

function checkColumn(column) {
    height = 0;
    column.each(function(i, obj){
        height += $(obj).height();
    }) 
    return height
}

function getColumn(colid, records, incr) {
    records_count = records.length
    //number_per_col = Math.ceil(records_count/3) + incr
    number_per_col = Math.ceil(records_count/4) + incr
    filmmaker_str = ""
    for (i = (colid - 1) *number_per_col; i< colid * number_per_col && i < records_count; i++) {
        record = records[i]
        filmmaker_str += "<a href='" + web_host + "filmmaker/" + record['client_id_number'] + "'>" + record['filmmaker_name'] + "</a>"
        if (i != (colid * number_per_col) - 1 && i != records_count - 1) {
            filmmaker_str += "<br/>"
        }
    }
    return filmmaker_str
}

function alpha_links() {
    alpha_links_str = ""
    for (i=0; i<26; i++) {
        alpha_str = String.fromCharCode(97 + i)
        alpha_link = "<a href = '" + web_host + "artistindex/" + alpha_str + "'>"
        alpha_link += "<div class='alpha_list_entry'><span>"
        alpha_link += alpha_str
        alpha_link += "</span></div>"
        alpha_link += "</a>"
        alpha_links_str += alpha_link
    }
    return alpha_links_str
}