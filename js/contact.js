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

    $(".contact_table_content_left").last().append("<div class='contact_table_inner_table'></div>")
    //$(".contact_table_content_left > .contact_table_inner_table").last().append("<div class='contact_table_inner_row_spacer'></div>")

    $(".contact_table_content_left").last().append("<div class='contact_table_inner_table'></div>")
    $(".contact_table_content_left > .contact_table_inner_table").last().append("<div class='contact_table_inner_row_title'></div>")
    $(".contact_table_inner_row_title").last().append("<div class='title'>Contact</div>")

    

    $(".contact_table_content_right").append("<div class='contact_table_inner_table'></div>")
    //$(".contact_table_content_right").find(".contact_table_inner_table").last().append("<div class='contact_table_inner_row_title_alt_spacer'></div>")
    $(".contact_table_content_right").find(".contact_table_inner_table").last().append("<div class='generic_table'></div>")
    $(".contact_table_content_right").find(".generic_table").last().append("<div class='contact_table_inner_row_spacer'></div>")
    $(".generic_table").last().append("<div class='contact_table_inner_row_title'></div>")
    $(".contact_table_inner_row_title").last().append("<div class='subtitle'>Staff</div>")
    $(".contact_table_inner_row_title").last().append("<div class='contact_table_inner_row_title_sm_spacer'></div>")


    getStaff()

    $(".contact_table_content_right > .contact_table_inner_table").last().append("<div class='contact_table_end_buffer'></div>")

    $(".contact_table_content_left").append("<div class='contact_table_inner_table'></div>")
    //$(".contact_table_content_left").find(".contact_table_inner_table").last().append("<div class='contact_table_inner_row_title_alt_spacer'></div>")
    $(".contact_table_content_left").find(".contact_table_inner_table").last().append("<div class='generic_table'></div>")

    $(".generic_table").last().append("<div class='contact_table_inner_row_title'></div>")
    
    $(".contact_table_content_left").find(".contact_table_inner_row_title").last().append("<div class='contact_table_inner_row_title_alt_spacer'></div>")

    $(".contact_table_content_left").find(".contact_table_inner_row_title").last().append("<div class='subtitle'>Find Us</div>")
    $(".contact_table_content_left").find(".contact_table_inner_row_title").last().append("<div class='contact_table_inner_row_title_sm_spacer'></div>")

    // Address

    // $(".contact_table_content_left").find(".generic_table").last().append("<div class='generic_row'><b>Address</b></div>")
    $(".contact_table_content_left").find(".generic_table").last().append("<div class='generic_row'><div class='mainaddress'>Canadian Filmmakers Distribution Centre<br>401 Richmond St West, Suite 245<br>Toronto, Ontario M5V 3A8 Canada</div></div>")

    $(".contact_table_content_left").find(".generic_table").last().append("<div class='contact_table_inner_row_title_sm_spacer'></div>")
    $(".contact_table_content_left").find(".generic_table").last().append("<div class='contact_table_inner_row_title_sm_sm_spacer'></div>")

    // Email

    $(".contact_table_content_left").find(".generic_table").last().append("<div class='generic_row'><b>Email</b></div>")
    $(".contact_table_content_left").find(".generic_table").last().append("<div class='generic_row'>Please send general inquiries to <a href='mailto:info@cfmdc.org'>info@cfmdc.org</a>.</div>")   

    $(".contact_table_content_left").find(".generic_table").last().append("<div class='contact_table_inner_row_title_sm_spacer'></div>")

    // Phone

    $(".contact_table_content_left").find(".generic_table").last().append("<div class='generic_row'><b>Phone</b></div>")
    $(".contact_table_content_left").find(".generic_table").last().append("<div class='generic_row'>416 588-0725</div>")   

    $(".contact_table_content_left").find(".generic_table").last().append("<div class='contact_table_inner_row_title_sm_spacer'></div>")

    // Hours 

    $(".contact_table_content_left").find(".generic_table").last().append("<div class='generic_row'><b>Days + Hours</b></div>")
    $(".contact_table_content_left").find(".generic_table").last().append("<div class='generic_row'>Monday to Thursday, 10am to 6pm</div>")
    $(".contact_table_content_left").find(".generic_table").last().append("<div class='generic_row'>Closed Friday, Saturday, and Sunday</div>")

    $(".contact_table_content_left").find(".generic_table").last().append("<div class='contact_table_inner_row_title_sm_spacer'></div>")

    // Locations

    $(".contact_table_content_left").find(".generic_table").last().append("<div class='generic_row'><b>Location</b></div>")
    $(".contact_table_content_left").find(".generic_table").last().append("<div class='generic_row'>CFMDC is located in the 401 Richmond Building just east of Spadina Avenue. The offices are on the 2nd floor and are wheelchair accessible.</div>")

    $(".contact_table_content_left").find(".generic_table").last().append("<div class='contact_table_inner_row_title_sm_spacer'></div>")

    $(".contact_table_content_left").find(".generic_table").last().append("<div class='contact_table_inner_row_title_sm_sm_spacer'></div>")

    $(".contact_table_content_left").find(".generic_table").last().append("<div id='map'></div>")

    $(".contact_table_content_left > .contact_table_inner_table").last().append("<div class='contact_table_end_buffer'></div>")
    
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

$(window).load(function() {
    $(".contact").addClass("contact_selected")
})

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