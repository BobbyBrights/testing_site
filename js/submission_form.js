var web_host = "http://www.testing.cfmdc.org/";

recaptcha_checked = false;

$(document).ready(function() {

    document.title = "Submission Form | Canadian Filmmakers Distribution Centre"

    $(".contents").append("<div class='top_buffer'></div>")
    $(".contents").append("<div class='table'></div>")

    $(".table").append('<form action="' + web_host + 'src/request_account_submit.php" method="POST" id="account-request"></form>')
    $("form").append("<div class='table_cell_container'></div>")
    $(".table_cell_container").append("<div class='table_cell_left_margin'></div>")
    $(".table_cell_container").append("<div class='table_contents'></div>")
    $(".table_cell_container").append("<div class='table_cell_right_margin'></div>")

    $(".table_contents").append("<div class='table_title'><div class='title'></div></div>")
    $(".title").append("Film Submission Form")

    $(".table_contents").append("<div class='spacer'></div>")
    $(".table_contents").append("<div class='note_table'></div>")
    $(".note_table").last().append("<div class='note_left_spacer'></div>")
    $(".note_table").last().append("<div class='note_content'></div>")
    $(".note_content").last().append("<div class='note_content_table'></div>")
    $(".note_content_table").last().append("<div class='note_content_horz_spacer'></div>")
    $(".note_content_table").last().append("<div class='note_content_table_content'></div>")
    $(".note_content_table_content").last().append("If you do not have a Filmmaker or Client account with us, you will need to fill out the fields the section below. If you have an account, please log in now and continue to fill out the film(s) submission form.")
    $(".note_content_table").last().append("<div class='note_content_horz_spacer'></div>")
    $(".note_table").last().append("<div class='note_right_spacer'></div>")

    $(".table_contents").append("<div class='spacer'></div>")
    $(".table_contents").append("<div class='request_acct_table'></div>")

     $(".request_acct_table").last().append("<div class='request_acct_row_row'></div>")
     $(".request_acct_row_row").last().append("<div class='legend'>optional field <b>*</b></div>")

    // First Name 
    $(".request_acct_table").last().append("<div class='request_acct_row_row'></div>")
    $(".request_acct_row_row").last().append("<div class='request_acct_cell_left'></div>")
    $(".request_acct_cell_left").last().append("<div class='request_acct_label'></div>")
    $(".request_acct_label").last().append("<div class='request_acct_label_text'><b>First Name</b></div>")
    $(".request_acct_cell_left").last().append("<div class='request_acct_input'></div>")
    $(".request_acct_input").last().append("<div class='request_acct_input_large'></div>")
    $(".request_acct_input_large").last().append("<input tabindex=1 type='text' id='firstname' name='firstname'>")
    $(".request_acct_input_large").last().append("<div class='border_line'></div>")

    $(".request_acct_row_row").last().append("<div class='request_acct_cell_spacer'></div>")

    // Address
    $(".request_acct_row_row").last().append("<div class='request_acct_cell_right'></div>")
    $(".request_acct_cell_right").last().append("<div class='request_acct_label'></div>")
    $(".request_acct_label").last().append("<div class='request_acct_label_text'><b>Address</b></div>")
    $(".request_acct_cell_right").last().append("<div class='request_acct_input'></div>")
    $(".request_acct_input").last().append("<div class='request_acct_input_large'></div>")
    $(".request_acct_input_large").last().append("<input tabindex=6 type='text' id='address' name='address'>")
    $(".request_acct_input_large").last().append("<div class='border_line'></div>")

    // Last Name 
    $(".request_acct_table").last().append("<div class='request_acct_row_row'></div>")
    $(".request_acct_row_row").last().append("<div class='request_acct_cell_left'></div>")
    $(".request_acct_cell_left").last().append("<div class='request_acct_label'></div>")
    $(".request_acct_label").last().append("<div class='request_acct_label_text'><b>Last Name</b></div>")
    $(".request_acct_cell_left").last().append("<div class='request_acct_input'></div>")
    $(".request_acct_input").last().append("<div class='request_acct_input_large'></div>")
    $(".request_acct_input_large").last().append("<input tabindex=2 type='text' id='lastname' name='lastname'>")
    $(".request_acct_input_large").last().append("<div class='border_line'></div>")

    $(".request_acct_row_row").last().append("<div class='request_acct_cell_spacer'></div>")

    // City/Town
    $(".request_acct_row_row").last().append("<div class='request_acct_cell_right'></div>")
    $(".request_acct_cell_right").last().append("<div class='request_acct_label'></div>")
    $(".request_acct_label").last().append("<div class='request_acct_label_text'><b>City/Town</b></div>")
    $(".request_acct_cell_right").last().append("<div class='request_acct_input'></div>")
    $(".request_acct_input").last().append("<div class='request_acct_input_large'></div>")
    $(".request_acct_input_large").last().append("<input tabindex=7 type='text' id='city_town' name='city_town'>")
    $(".request_acct_input_large").last().append("<div class='border_line'></div>")

    // Spacer 
    $(".request_acct_table").last().append("<div class='request_acct_row_row'></div>")
    $(".request_acct_row_row").last().append("<div class='request_acct_cell_left'></div>")

    $(".request_acct_row_row").last().append("<div class='request_acct_cell_spacer'></div>")

    // Country
    $(".request_acct_row_row").last().append("<div class='request_acct_cell_right'></div>")
    $(".request_acct_cell_right").last().append("<div class='request_acct_label'></div>")
    $(".request_acct_label").last().append("<div class='request_acct_label_text'><b>Country</b></div>")
    $(".request_acct_cell_right").last().append("<div class='request_acct_input'></div>")
    $(".request_acct_input").last().append("<div class='request_acct_input_large'></div>")
    $(".request_acct_input_large").last().append("<input tabindex=8 type='text' id='country_' name='country_'>")
    $(".request_acct_input_large").last().append("<div class='border_line'></div>")

    // Organization 
    $(".request_acct_table").last().append("<div class='request_acct_row_row'></div>")
    $(".request_acct_row_row").last().append("<div class='request_acct_cell_left'></div>")
    $(".request_acct_cell_left").last().append("<div class='request_acct_label'></div>")
    $(".request_acct_label").last().append("<div class='request_acct_label_text'><b>Organization *</b></div>")
    $(".request_acct_cell_left").last().append("<div class='request_acct_input'></div>")
    $(".request_acct_input").last().append("<div class='request_acct_input_large'></div>")
    $(".request_acct_input_large").last().append("<input tabindex=3 type='text' id='organization' name='organization'>")
    $(".request_acct_input_large").last().append("<div class='border_line'></div>")

    $(".request_acct_row_row").last().append("<div class='request_acct_cell_spacer'></div>")

    // Spacer 
    $(".request_acct_table").last().append("<div class='request_acct_row_row'></div>")
    $(".request_acct_row_row").last().append("<div class='request_acct_cell_left'></div>")

    $(".request_acct_row_row").last().append("<div class='request_acct_cell_spacer'></div>")

    // Province/State
    $(".request_acct_row_row").last().append("<div class='request_acct_cell_right'></div>")
    $(".request_acct_cell_right").last().append("<div class='request_acct_label'></div>")
    $(".request_acct_label").last().append("<div class='request_acct_label_text'><b>Province/State</b></div>")
    $(".request_acct_cell_right").last().append("<div class='request_acct_input'></div>")
    $(".request_acct_input").last().append("<div class='request_acct_input_small'></div>")
    $(".request_acct_input_small").last().append("<input tabindex=9 type='text' id='province_state' name='province_state'>")
    $(".request_acct_input_small").last().append("<div class='border_line'></div>")

    // Phone 
    $(".request_acct_table").last().append("<div class='request_acct_row_row'></div>")
    $(".request_acct_row_row").last().append("<div class='request_acct_cell_left'></div>")
    $(".request_acct_cell_left").last().append("<div class='request_acct_label'></div>")
    $(".request_acct_label").last().append("<div class='request_acct_label_text'><b>Phone Number</b></div>")
    $(".request_acct_cell_left").last().append("<div class='request_acct_input'></div>")
    $(".request_acct_input").last().append("<div class='request_acct_input_large'></div>")
    $(".request_acct_input_large").last().append("<input tabindex=4 type='text' id='phone' name='phone'>")
    $(".request_acct_input_large").last().append("<div class='border_line'></div>")

    $(".request_acct_row_row").last().append("<div class='request_acct_cell_spacer'></div>")

    // Postal Code
    $(".request_acct_row_row").last().append("<div class='request_acct_cell_right'></div>")
    $(".request_acct_cell_right").last().append("<div class='request_acct_label'></div>")
    $(".request_acct_label").last().append("<div class='request_acct_label_text'><b>Postal/Zip Code</b></div>")
    $(".request_acct_cell_right").last().append("<div class='request_acct_input'></div>")
    $(".request_acct_input").last().append("<div class='request_acct_input_small'></div>")
    $(".request_acct_input_small").last().append("<input tabindex=11 type='text' id='postal_code' name='postal_code'>")
    $(".request_acct_input_small").last().append("<div class='border_line'></div>")

    // Spacer
    $(".request_acct_row_row").last().append("<div class='request_acct_cell_right'></div>")

    // Email 
    $(".request_acct_table").last().append("<div class='request_acct_row_row'></div>")
    $(".request_acct_row_row").last().append("<div class='request_acct_cell_left'></div>")
    $(".request_acct_cell_left").last().append("<div class='request_acct_label'></div>")
    $(".request_acct_label").last().append("<div class='request_acct_label_text'><b>Email</b></div>")
    $(".request_acct_cell_left").last().append("<div class='request_acct_input'></div>")
    $(".request_acct_input").last().append("<div class='request_acct_input_large'></div>")
    $(".request_acct_input_large").last().append("<input tabindex=5 type='text' id='email' name='email'>")
    $(".request_acct_input_large").last().append("<div class='border_line'></div>")

    $(".request_acct_row_row").last().append("<div class='request_acct_cell_spacer'></div>")

    // Spacer
    $(".request_acct_row_row").last().append("<div class='request_acct_cell_right'></div>")

    $(".table_contents").append("<div class='spacer_acct_type'></div>")

    $(".table_contents").append("<div class='request_acct_table'></div>")

    // Account type
    $(".request_acct_table").last().append("<div class='request_acct_row'></div>")
    $(".request_acct_row").last().append("<div class='request_acct_type_heading'><b>I will be using this account as</b></div>")
    $(".request_acct_row").last().append("<div class='request_acct_type_label'></div>")
    $(".request_acct_type_label").last().append("<div class='acct_type'></div>")
    $(".acct_type").last().append("<input type='radio' value='filmmaker' id='filmmaker_acct' name='acct_type'></input>")
    $(".acct_type").last().append("<label for='filmmaker_acct'></label><br>")
    $(".request_acct_row").last().append("<div class='request_acct_type_label_text'><b>a filmmaker</b></div>")

    $(".request_acct_table").last().append("<div class='request_acct_row'></div>")
    $(".request_acct_row").last().append("<div class='request_acct_type_heading'>&#8203;</div>")
    $(".request_acct_row").last().append("<div class='request_acct_type_label'></div>")
    $(".request_acct_type_label").last().append("<div class='acct_type'></div>")
    $(".acct_type").last().append("<input type='radio' value='client' id='client' name='acct_type'></input>")
    $(".acct_type").last().append("<label for='client'></label>")
    $(".request_acct_row").last().append("<div class='request_acct_type_label_text'><b>a client</b></div>")
    
    $(".request_acct_table").last().append("<div class='request_acct_row'></div>")
    $(".request_acct_row").last().append("<div class='request_acct_type_heading'>&#8203;</div>")
    $(".request_acct_row").last().append("<div class='request_acct_type_label'></div>")
    $(".request_acct_type_label").last().append("<div class='acct_type'></div>")
    $(".acct_type").last().append("<input type='radio' value='client_filmmaker' id='client_filmmaker' name='acct_type'></input>")
    $(".acct_type").last().append("<label for='client_filmmaker'></label>")
    $(".request_acct_row").last().append("<div class='request_acct_type_label_text'><b>both filmmaker and client</b></div>")

    $(".table_contents").append("<div class='spacer_with_bar'></div>")

    $(".table_contents").append("<div class='table_title'><div class='subtitle'></div></div>")
    $(".subtitle").last().append("Film Entry #1")

    $(".table_contents").append("<div class='spacer'></div>")

    $(".table_contents").append("<div class='film_form_table'></div>")

    $(".film_form_table").last().append("<div class='film_form_row_row'></div>")
    $(".film_form_row_row").last().append("<div class='legend'>optional field <b>*</b></div>")

    $(".table_contents").append("<div class='spacer_with_bar'></div>")

    $(".table_contents").append("<div class='spacer'></div>")

    $(".table_contents").append("<div class='note_table'></div>")
    $(".note_table").last().append("<div class='note_left_spacer'></div>")
    $(".note_table").last().append("<div class='note_content'></div>")
    $(".note_content").last().append("<div class='note_content_table'></div>")
    $(".note_content_table").last().append("<div class='note_content_horz_spacer'></div>")
    $(".note_content_table").last().append("<div class='note_content_table_content'></div>")
    $(".note_content_table_content").last().append("At this point they will submit film details here. Maybe some mention about copyrights etc.")
    $(".note_content_table").last().append("<div class='note_content_horz_spacer'></div>")
    $(".note_table").last().append("<div class='note_right_spacer'></div>")

    $(".table_contents").append("<div class='spacer'></div>")

    // recaptcha
    $(".table_contents").append("<div class='g-recaptcha-outer'><div class='g-recaptcha' data-callback='recaptchaCallback' data-sitekey='6LemsxcUAAAAACG6GzNABCispOz4O0qQFVCn4MT3'></div></div>")
    $(".table_contents").append("<div class='spacer'></div>")

    // Button
    $(".table_contents").append("<button type='submit' id='subutton'><span>Submit</span></button>")

    $(".contents").append("<div class='table_end_buffer'></div>")

    $('#account-request').submit(function(e) {
        e.preventDefault();
        if (checkFields()) {
            $(document.body).css({ 'cursor': 'wait' })
            $(".warning").removeClass("warning_up")
            $(".message").removeClass("message_up")
            $('#subutton').attr('disabled', true);
            $this = $(this);
            $.ajax({
                type: "POST",
                url: "http://" + $(location).attr('hostname') + "/src/nothing.php",
                //url: "src/request_account_submit.php",
                data: $this.serialize()
            }).done(function(data) {
                $(document.body).css({ 'cursor': 'default' })
                window.location.replace(web_host)
            })
        }
        else {
            $(".warning").find(".alert_text_table").html('<div class="normal_text"> <div class="big">You\'ve left some required fields empty or invalid, please try again.</div>')
            $(".warning").addClass("warning_up")
        }
    });

})

function recaptchaCallback() {
    recaptcha_checked = true;
}

function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
};

function checkFields() {
    firstname = $("input[name='firstname']").val()
    lastname = $("input[name='lastname']").val()
    phone = $("input[name='phone']").val()
    email = $("input[name='email']").val()
    address = $("input[name='address']").val()
    city_town = $("input[name='city_town']").val()
    province_state = $("input[name='province_state']").val()
    country = $("input[name='country_']").val()
    postal_code = $("input[name='postal_code']").val()
    acct_type = false

    if($("input:radio[name=acct_type]").is(":checked")){
        acct_type = true
    }

    if (firstname && lastname && phone && email && isValidEmailAddress(email) && address && city_town && province_state && country && postal_code && acct_type && recaptcha_checked) {
        return true;
    }
    else {
        return false;
    }
}