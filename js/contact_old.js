map = null;

$(document).ready(function() {

    document.title = "Contact | Canadian Filmmakers Distribution Centre"
    $(".contents").append("<div class='top_buffer'></div>")
    $(".contents").append("<div class='accessible'></div>")
    $(".accessible").append("<div class='contact_table'></div>")
    $(".contact_table").append("<div class='contact_row_generic'></div>")

    $(".contact_row_generic").last().append("<div class='contact_table_left_right_margin'></div>")
    $(".contact_row_generic").last().append("<div class='contact_table_content_left'></div>")
    $(".contact_row_generic").last().append("<div class='contact_table_centre'></div>")
    $(".contact_row_generic").last().append("<div class='contact_table_content_right'></div>")
    $(".contact_row_generic").last().append("<div class='contact_table_left_right_margin'></div>")

    $(".contact_table_content_right").last().append("<div class='contact_table_inner_table'></div>")
    $(".contact_table_content_right > .contact_table_inner_table").last().append("<div class='contact_table_inner_row_spacer'></div>")
    $(".contact_table_content_right > .contact_table_inner_table").last().append("<div id='map'></div>")

    //initMap()

    $(".contact_table_content_left").last().append("<div class='contact_table_inner_table'></div>")
    $(".contact_table_content_left > .contact_table_inner_table").last().append("<div class='contact_table_inner_row_title'></div>")
    $(".contact_table_inner_row_title").last().append("<div class='title'>Contact</div>")
    $(".contact_table_content_left > .contact_table_inner_table").last().append("<div class='contact_table_inner_row_title_spacer'></div>")

    $(".contact_table_content_left > .contact_table_inner_table").last().append("<div class='contact_input_table'></div>")

    // Name
    $(".contact_input_table").last().append("<div class='contact_input_row'></div>")
    $(".contact_input_row").last().append("<div class='contact_input_label'></div>")
    $(".contact_input_label").last().append("<div class='contact_input_label_text'>Name</div>")
    $(".contact_input_row").last().append("<div class='contact_input_input'></div>")
    $(".contact_input_input").last().append("<div class='contact_input_input_large'></div>")
    $(".contact_input_input_large").last().append("<input type='text' id='name' name='name'>")
    $(".contact_input_input_large").last().append("<div class='border_line'></div>")

    // Email
    $(".contact_input_table").last().append("<div class='contact_input_row'></div>")
    $(".contact_input_row").last().append("<div class='contact_input_label'></div>")
    $(".contact_input_label").last().append("<div class='contact_input_label_text'>Email</div>")
    $(".contact_input_row").last().append("<div class='contact_input_input'></div>")
    $(".contact_input_input").last().append("<div class='contact_input_input_large'></div>")
    $(".contact_input_input_large").last().append("<input type='text' id='email' name='email'>")
    $(".contact_input_input_large").last().append("<div class='border_line'></div>")

    // Spacer
    $(".contact_input_table").last().append("<div class='contact_textarea_spacer'></div>")

    // Message
    $(".contact_input_table").last().append("<div class='contact_input_row'></div>")
    $(".contact_input_row").last().append("<div class='contact_textarea_label'></div>")
    $(".contact_textarea_label").last().append("<div class='contact_textarea_label_text'>Message</div>")
    $(".contact_input_row").last().append("<div class='contact_input_input'></div>")
    $(".contact_input_input").last().append("<div class='contact_input_input_large'></div>")
    $(".contact_input_input_large").last().append("<textarea name='message'></textarea>")

    // Spacer
    $(".contact_input_table").last().append("<div class='contact_button_spacer'></div>")

    // Button
    $(".contact_input_table").last().append("<div class='contact_input_button'><span>Submit</span></div>")
    // $(".contact_table_content_right").last().append("<div class='contact_table_inner_table'></div>")
    // $(".contact_table_inner_table").last().append("<div class='contact_table_inner_row_spacer'></div>")
    // $(".contact_table_inner_table").last().append("<div id='map'></div>")

    $(".contact_table_content_left").append("<div class='contact_table_inner_table'></div>")
    $(".contact_table_content_left").find(".contact_table_inner_table").last().append("<div class='contact_table_inner_row_title_alt_spacer'></div>")
    $(".contact_table_content_left").find(".contact_table_inner_table").last().append("<div class='generic_table'></div>")
    $(".generic_table").last().append("<div class='contact_table_inner_row_title'></div>")
    $(".contact_table_inner_row_title").last().append("<div class='subtitle'>Staff</div>")
    $(".contact_table_inner_row_title").last().append("<div class='contact_table_inner_row_title_sm_spacer'></div>")

    getStaff()

    $(".contact_table_content_left > .contact_table_inner_table").last().append("<div class='contact_table_end_buffer'></div>")

    $(".contact_table_content_right").append("<div class='contact_table_inner_table'></div>")
    $(".contact_table_content_right").find(".contact_table_inner_table").last().append("<div class='contact_table_inner_row_title_alt_spacer'></div>")
    $(".contact_table_content_right").find(".contact_table_inner_table").last().append("<div class='generic_table'></div>")
    $(".generic_table").last().append("<div class='contact_table_inner_row_title'></div>")
    $(".contact_table_inner_row_title").last().append("<div class='subtitle'>Find Us</div>")
    $(".contact_table_inner_row_title").last().append("<div class='contact_table_inner_row_title_sm_spacer'></div>")

    // Address

    $(".generic_table").last().append("<div class='generic_row'><b>Address</b></div>")
    $(".generic_table").last().append("<div class='generic_row'>Canadian Filmmakers Distribution Centre</div>")
    $(".generic_table").last().append("<div class='generic_row'>245-401 Richmond St West</div>")
    $(".generic_table").last().append("<div class='generic_row'>Toronto ON Canada M5V 3A8</div>")

    $(".generic_table").last().append("<div class='contact_table_inner_row_title_sm_spacer'></div>")

    // Phone

    $(".generic_table").last().append("<div class='generic_row'><b>Phone</b></div>")
    $(".generic_table").last().append("<div class='generic_row'>416 588-0725</div>")   

    $(".generic_table").last().append("<div class='contact_table_inner_row_title_sm_spacer'></div>")

    // Hours 

    $(".generic_table").last().append("<div class='generic_row'><b>Hours</b></div>")
    $(".generic_table").last().append("<div class='generic_row'>Monday to Thursday, 10am to 6pm</div>")   
})

function getStaff() {
    for (i=0; i<staff_json.length; i++) {
        $(".generic_table").last().append("<div class='generic_row'><b>" + staff_json[i]['full_name'] + "</b></div>")

        for (j=0; j<staff_json[i]['positions'].length; j++) {
           $(".generic_table").last().append("<div class='generic_row'>" + staff_json[i]['positions'][j] + "</div>") 
        }

        for (j=0; j<staff_json[i]['emails'].length; j++) {
           $(".generic_table").last().append("<div class='email'><a href='mailto:" + staff_json[i]['emails'][j] + "'>" + staff_json[i]['emails'][j] + "</a></div>") 
        }

        if (i != staff_json.length - 1) {
            $(".generic_table").last().append("<div class='contact_table_inner_row_title_sm_spacer'></div>")
        }
    }
}


    google.maps.event.trigger(map, 'resize');

function initMap() {
    $(window).load(function() {
        var uluru = {lat: 43.647832, lng: -79.3943792};
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 16,
            center: uluru
        });
        var marker = new google.maps.Marker({
            position: uluru,
            map: map,
            title: "Canadian Filmmakers Distribution Centre"
        });
    })
    
}