var web_host = "http://www.testing.cfmdc.org/";

recaptcha_checked = false;

$(document).ready(function() {

    var _URL = window.URL || window.webkitURL;

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

    // Film Title
    $(".film_form_table").last().append("<div class='request_acct_row_row'></div>")
    $(".request_acct_row_row").last().append("<div class='request_acct_cell_left'></div>")
    $(".request_acct_cell_left").last().append("<div class='request_acct_label'></div>")
    $(".request_acct_label").last().append("<div class='request_acct_label_text'><b>Film Title</b></div>")
    $(".request_acct_cell_left").last().append("<div class='request_acct_input'></div>")
    $(".request_acct_input").last().append("<div class='request_acct_input_large'></div>")
    $(".request_acct_input_large").last().append("<input tabindex=1 type='text' id='film_title' name='film_title'>")
    $(".request_acct_input_large").last().append("<div class='border_line'></div>")

    $(".request_acct_row_row").last().append("<div class='request_acct_cell_spacer'></div>")

    // Length
    $(".film_form_table").last().append("<div class='request_acct_row_row'></div>")
    $(".request_acct_row_row").last().append("<div class='request_acct_cell_left'></div>")
    $(".request_acct_cell_left").last().append("<div class='request_acct_label'></div>")
    $(".request_acct_label").last().append("<div class='request_acct_label_text'><b>Length <br/>(min.sec)</b></div>")
    $(".request_acct_cell_left").last().append("<div class='request_acct_input'></div>")
    $(".request_acct_input").last().append("<div class='request_acct_input_large'></div>")
    $(".request_acct_input_large").last().append("<input tabindex=1 type='text' id='film_length' name='film_length'>")
    $(".request_acct_input_large").last().append("<div class='border_line'></div>")

    $(".request_acct_row_row").last().append("<div class='request_acct_cell_spacer'></div>")

    // Year
    $(".request_acct_row_row").last().append("<div class='request_acct_cell_right'></div>")
    $(".request_acct_cell_right").last().append("<div class='request_acct_label'></div>")
    $(".request_acct_label").last().append("<div class='request_acct_label_text'><b>Year</b></div>")
    $(".request_acct_cell_right").last().append("<div class='request_acct_input'></div>")
    $(".request_acct_input").last().append("<div class='request_acct_input_large'></div>")
    $(".request_acct_input_large").last().append("<input tabindex=6 type='text' id='film_year' name='film_year'>")
    $(".request_acct_input_large").last().append("<div class='border_line'></div>")

    // Country
    $(".film_form_table").last().append("<div class='request_acct_row_row'></div>")
    $(".request_acct_row_row").last().append("<div class='request_acct_cell_left'></div>")
    $(".request_acct_cell_left").last().append("<div class='request_acct_label'></div>")
    $(".request_acct_label").last().append("<div class='request_acct_label_text'><b>Country</b></div>")
    $(".request_acct_cell_left").last().append("<div class='request_acct_input'></div>")
    $(".request_acct_input").last().append("<div class='request_acct_input_large'></div>")
    $(".request_acct_input_large").last().append("<input tabindex=1 type='text' id='film_country' name='film_country'>")
    $(".request_acct_input_large").last().append("<div class='border_line'></div>")

    $(".request_acct_row_row").last().append("<div class='request_acct_cell_spacer'></div>")

    // Language
    $(".request_acct_row_row").last().append("<div class='request_acct_cell_right'></div>")
    $(".request_acct_cell_right").last().append("<div class='request_acct_label'></div>")
    $(".request_acct_label").last().append("<div class='request_acct_label_text'><b>Language <br/>(Dialogue and/or Titles)</b> *</div>")
    $(".request_acct_cell_right").last().append("<div class='request_acct_input'></div>")
    $(".request_acct_input").last().append("<div class='request_acct_input_large'></div>")
    $(".request_acct_input_large").last().append("<input tabindex=6 type='text' id='film_language' name='film_language'>")
    $(".request_acct_input_large").last().append("<div class='border_line'></div>")

    $(".film_form_table").last().append("<div class='request_acct_row_row_spacer'></div>")

    // Colour
    $(".film_form_table").last().append("<div class='request_acct_film_row'></div>")
    $(".request_acct_film_row").last().append("<div class='request_acct_type_heading_film'><b>Colour</b> *</div>")
    $(".request_acct_film_row").last().append("<div class='request_acct_type_label'></div>")
    $(".request_acct_type_label").last().append("<div class='acct_type'></div>")
    $(".acct_type").last().append("<input type='radio' value='colour' id='colour' name='colour'></input>")
    $(".acct_type").last().append("<label for='colour'></label><br>")
    $(".request_acct_film_row").last().append("<div class='request_acct_type_label_text'><b>colour</b></div>")

    $(".film_form_table").last().append("<div class='request_acct_film_row'></div>")
    $(".request_acct_film_row").last().append("<div class='request_acct_type_heading_film'>&#8203;</div>")
    $(".request_acct_film_row").last().append("<div class='request_acct_type_label'></div>")
    $(".request_acct_type_label").last().append("<div class='acct_type'></div>")
    $(".acct_type").last().append("<input type='radio' value='b/w' id='b/w' name='colour'></input>")
    $(".acct_type").last().append("<label for='b/w'></label>")
    $(".request_acct_film_row").last().append("<div class='request_acct_type_label_text'><b>b/w</b></div>")
    
    $(".film_form_table").last().append("<div class='request_acct_film_row'></div>")
    $(".request_acct_film_row").last().append("<div class='request_acct_type_heading_film'>&#8203;</div>")
    $(".request_acct_film_row").last().append("<div class='request_acct_type_label'></div>")
    $(".request_acct_type_label").last().append("<div class='acct_type'></div>")
    $(".acct_type").last().append("<input type='radio' value='colour and b/w' id='colour_and_b/w' name='colour'></input>")
    $(".acct_type").last().append("<label for='colour_and_b/w'></label>")
    $(".request_acct_film_row").last().append("<div class='request_acct_type_label_text'><b>colour and b/w</b></div>")

    $(".film_form_table").last().append("<div class='request_acct_row_row_spacer'></div>")

    // Sound
    $(".film_form_table").last().append("<div class='request_acct_film_row'></div>")
    $(".request_acct_film_row").last().append("<div class='request_acct_type_heading_film'><b>Sound</b> *</div>")
    $(".request_acct_film_row").last().append("<div class='request_acct_type_label'></div>")
    $(".request_acct_type_label").last().append("<div class='acct_type'></div>")
    $(".acct_type").last().append("<input type='radio' value='sound' id='sound' name='sound'></input>")
    $(".acct_type").last().append("<label for='sound'></label><br>")
    $(".request_acct_film_row").last().append("<div class='request_acct_type_label_text'><b>sound</b></div>")

    $(".film_form_table").last().append("<div class='request_acct_film_row'></div>")
    $(".request_acct_film_row").last().append("<div class='request_acct_type_heading_film'>&#8203;</div>")
    $(".request_acct_film_row").last().append("<div class='request_acct_type_label'></div>")
    $(".request_acct_type_label").last().append("<div class='acct_type'></div>")
    $(".acct_type").last().append("<input type='radio' value='silent' id='silent' name='sound'></input>")
    $(".acct_type").last().append("<label for='silent'></label>")
    $(".request_acct_film_row").last().append("<div class='request_acct_type_label_text'><b>silent</b></div>")

    // Film Synopsis
    $(".film_form_table").last().append("<div class='request_acct_row_row'></div>")
    $(".request_acct_row_row").last().append("<div class='request_acct_cell_left'></div>")
    $(".request_acct_cell_left").last().append("<div class='selection_acct_label'></div>")
    $(".selection_acct_label").last().append("<div class='request_acct_label_text'><b>Synopsis</b></div>")
    $(".request_acct_cell_left").last().append("<div class='request_acct_input'></div>")
    $(".request_acct_input").last().append("<div class='request_acct_input_box'></div>")
    $(".request_acct_input_box").last().append("<input type='textarea' id='synopsis' name='synopsis'>")
    $(".request_acct_input_box").last().append("<div class='border_line'></div>")

    $(".film_form_table").last().append("<div class='request_acct_row_row_spacer'></div>")

    // First Name 
    $(".film_form_table").last().append("<div class='request_acct_row_row'></div>")
    $(".request_acct_row_row").last().append("<div class='request_acct_cell_left'></div>")
    $(".request_acct_cell_left").last().append("<div class='request_acct_label'></div>")
    $(".request_acct_label").last().append("<div class='request_acct_label_text'><b>Filmmaker's <br/>First Name</b></div>")
    $(".request_acct_cell_left").last().append("<div class='request_acct_input'></div>")
    $(".request_acct_input").last().append("<div class='request_acct_input_large'></div>")
    $(".request_acct_input_large").last().append("<input tabindex=1 type='text' id='filmmakers_firstname' name='filmmakers_firstname'>")
    $(".request_acct_input_large").last().append("<div class='border_line'></div>")

    $(".request_acct_row_row").last().append("<div class='request_acct_cell_spacer'></div>")

    // Last Name
    $(".request_acct_row_row").last().append("<div class='request_acct_cell_right'></div>")
    $(".request_acct_cell_right").last().append("<div class='request_acct_label'></div>")
    $(".request_acct_label").last().append("<div class='request_acct_label_text'><b>Filmmaker's <br/>Last Name</b></div>")
    $(".request_acct_cell_right").last().append("<div class='request_acct_input'></div>")
    $(".request_acct_input").last().append("<div class='request_acct_input_large'></div>")
    $(".request_acct_input_large").last().append("<input tabindex=6 type='text' id='filmmakers_lastname' name='filmmakers_lastname'>")
    $(".request_acct_input_large").last().append("<div class='border_line'></div>")

    $(".film_form_table").last().append("<div class='request_acct_row_row_sm_spacer'></div>")

    // Email
    $(".film_form_table").last().append("<div class='request_acct_row_row'></div>")
    $(".request_acct_row_row").last().append("<div class='request_acct_cell_left'></div>")
    $(".request_acct_cell_left").last().append("<div class='request_acct_label'></div>")
    $(".request_acct_label").last().append("<div class='request_acct_label_text'><b>Filmmaker's Email</b></div>")
    $(".request_acct_cell_left").last().append("<div class='request_acct_input'></div>")
    $(".request_acct_input").last().append("<div class='request_acct_input_large'></div>")
    $(".request_acct_input_large").last().append("<input tabindex=2 type='text' id='filmmakers_email' name='filmmakers_email'>")
    $(".request_acct_input_large").last().append("<div class='border_line'></div>")

    $(".film_form_table").last().append("<div class='request_acct_row_row_spacer'></div>")

    // Filmmaker's Bio
    $(".film_form_table").last().append("<div class='request_acct_row_row'></div>")
    $(".request_acct_row_row").last().append("<div class='request_acct_cell_left'></div>")
    $(".request_acct_cell_left").last().append("<div class='selection_acct_label'></div>")
    $(".selection_acct_label").last().append("<div class='request_acct_label_text'><b>Filmmaker's <br/>Bio</b></div>")
    $(".request_acct_cell_left").last().append("<div class='request_acct_input'></div>")
    $(".request_acct_input").last().append("<div class='request_acct_input_box'></div>")
    $(".request_acct_input_box").last().append("<input type='textarea' id='filmmakers_bio' name='filmmakers_bio'>")
    $(".request_acct_input_box").last().append("<div class='border_line'></div>")

    $(".film_form_table").last().append("<div class='request_acct_row_row_spacer'></div>")

    // Secondary Filmmaker Name(s) 
    $(".film_form_table").last().append("<div class='request_acct_row_row'></div>")
    $(".request_acct_row_row").last().append("<div class='request_acct_cell_left'></div>")
    $(".request_acct_cell_left").last().append("<div class='request_acct_label'></div>")
    $(".request_acct_label").last().append("<div class='request_acct_label_text'><b>Secondary <br/>Filmmaker Name(s)</b> *</div>")
    $(".request_acct_cell_left").last().append("<div class='request_acct_input'></div>")
    $(".request_acct_input").last().append("<div class='request_acct_input_large'></div>")
    $(".request_acct_input_large").last().append("<input tabindex=1 type='text' id='sec_filmmakers_name' name='sec_filmmakers_name'>")
    $(".request_acct_input_large").last().append("<div class='border_line'></div>")

    $(".request_acct_row_row").last().append("<div class='request_acct_cell_spacer'></div>")

    $(".film_form_table").last().append("<div class='request_acct_row_row_spacer'></div>")

    //Screening history
    $(".film_form_table").last().append("<div class='film_form_row_row'></div>")
    $(".film_form_row_row").last().append("<div class='selection_acct_label'></div>")
    $(".selection_acct_label").last().append("<div class='request_acct_label_text'></div>")
    $(".request_acct_label_text").last().append("<b>Screening History</b> *")
    $(".film_form_row_row").last().append("<div class='request_acct_input'></div>")

    $(".request_acct_input").last().append("<div class='request_acct_input_row'><div class='request_acct_table_row_label'></div></div>")

    $(".request_acct_table_row_label").last().append('<label class="custom-file-upload"><input type="file" id="film-screening-history-file" />Upload PDF</label><div class="file-text" id="screening-history-text">no file currently selected</div>')

    $(".request_acct_input").last().append("<div class='request_acct_upload_info_row'><div class='request_acct_table_row_label'></div></div>")

    $(".request_acct_table_row_label").last().html("PDF only, max size 2MB")

    check_screening_history_upload();

    //Stills Upload
    $(".film_form_table").last().append("<div class='film_form_row_row'></div>")
    $(".film_form_row_row").last().append("<div class='selection_acct_label'></div>")
    $(".selection_acct_label").last().append("<div class='request_acct_label_text'></div>")
    $(".request_acct_label_text").last().append("<b>Web Still</b>")
    $(".film_form_row_row").last().append("<div class='request_acct_input'></div>")

    $(".request_acct_input").last().append("<div class='request_acct_input_row'><div class='request_acct_table_row_label'></div></div>")

    $(".request_acct_table_row_label").last().append('<label class="custom-file-upload"><input type="file" id="film-still-file" />Upload Web Still</label><div class="file-text" id="web-still-text">no file currently selected</div>')

    $(".request_acct_input").last().append("<div class='request_acct_upload_info_row'><div class='request_acct_table_row_label'></div></div>")

    $(".request_acct_table_row_label").last().html("JPEG/JPG only, min width 380px, min height 265px, max size 1MB")

    check_still_upload();

    $(".film_form_table").last().append("<div class='request_acct_row_row_spacer'></div>")

    // Preview Format
    $(".film_form_table").last().append("<div class='request_acct_film_row'></div>")
    $(".request_acct_film_row").last().append("<div class='request_acct_type_heading_film'><b>Preview Format</b></div>")
    $(".request_acct_film_row").last().append("<div class='request_acct_type_label'></div>")
    $(".request_acct_type_label").last().append("<div class='acct_type'></div>")
    $(".acct_type").last().append("<input type='radio' value='blu_ray' id='blu_ray' name='preview_format'></input>")
    $(".acct_type").last().append("<label for='blu_ray'></label><br>")
    $(".request_acct_film_row").last().append("<div class='request_acct_type_label_text'><b>blu ray</b></div>")

    $(".film_form_table").last().append("<div class='request_acct_film_row'></div>")
    $(".request_acct_film_row").last().append("<div class='request_acct_type_heading_film'>&#8203;</div>")
    $(".request_acct_film_row").last().append("<div class='request_acct_type_label'></div>")
    $(".request_acct_type_label").last().append("<div class='acct_type'></div>")
    $(".acct_type").last().append("<input type='radio' value='dvd' id='dvd' name='preview_format'></input>")
    $(".acct_type").last().append("<label for='dvd'></label>")
    $(".request_acct_film_row").last().append("<div class='request_acct_type_label_text'><b>dvd</b></div>")
    
    $(".film_form_table").last().append("<div class='request_acct_film_row'></div>")
    $(".request_acct_film_row").last().append("<div class='request_acct_type_heading_film'>&#8203;</div>")
    $(".request_acct_film_row").last().append("<div class='request_acct_type_label'></div>")
    $(".request_acct_type_label").last().append("<div class='acct_type'></div>")
    $(".acct_type").last().append("<input type='radio' value='digital_file' id='digital_file' name='preview_format'></input>")
    $(".acct_type").last().append("<label for='digital_file'></label>")
    $(".request_acct_film_row").last().append("<div class='request_acct_type_label_text'><b>digital file</b></div>")

    $(".film_form_table").last().append("<div class='request_acct_film_row'></div>")
    $(".request_acct_film_row").last().append("<div class='request_acct_type_heading_film'>&#8203;</div>")
    $(".request_acct_film_row").last().append("<div class='request_acct_type_label'></div>")
    $(".request_acct_type_label").last().append("<div class='acct_type'></div>")
    $(".acct_type").last().append("<input type='radio' value='drive_to_be_mailed' id='drive_to_be_mailed' name='preview_format'></input>")
    $(".acct_type").last().append("<label for='drive_to_be_mailed'></label>")
    $(".request_acct_film_row").last().append("<div class='request_acct_type_label_text'><b>drive to be mailed</b></div>")

    $(".film_form_table").last().append("<div class='request_acct_film_row'></div>")
    $(".request_acct_film_row").last().append("<div class='request_acct_type_heading_film'>&#8203;</div>")
    $(".request_acct_film_row").last().append("<div class='request_acct_type_label'></div>")
    $(".request_acct_type_label").last().append("<div class='acct_type'></div>")
    $(".acct_type").last().append("<input type='radio' value='vimeo_link' id='vimeo_link' name='preview_format'></input>")
    $(".acct_type").last().append("<label for='vimeo_link'></label>")
    $(".request_acct_film_row").last().append("<div class='request_acct_type_label_text'><b>vimeo link</b></div>")

    $(".film_form_table").last().append("<div class='request_acct_row_row_spacer'></div>")

    $(".film_form_table").last().append("<div class='note_table'></div>")
    $(".note_table").last().append("<div class='note_left_spacer'></div>")
    $(".note_table").last().append("<div class='note_content'></div>")
    $(".note_content").last().append("<div class='note_content_table'></div>")
    $(".note_content_table").last().append("<div class='note_content_horz_spacer'></div>")
    $(".note_content_table").last().append("<div class='note_content_table_content'></div>")
    $(".note_content_table_content").last().append("<b>If you are submitting your preview format as dvd/blu ray/external drive, please send it to:</b></br></br>")
    $(".note_content_table_content").last().append("Membership & Aquisitions</br>")
    $(".note_content_table_content").last().append("401 Richmond St. W., Suite 245</br>")
    $(".note_content_table_content").last().append("Toronto, Ontario, Canada, M5V 3A8</br></br>")
    $(".note_content_table_content").last().append("Please Note: Preview dvds and blu rays will not be returned.</br></br>")
    $(".note_content_table_content").last().append("<b>You can expect a response in 4-8 weeks</b></br>")
    $(".note_content_table").last().append("<div class='note_content_horz_spacer'></div>")
    $(".note_table").last().append("<div class='note_right_spacer'></div>")

    $(".film_form_table").last().append("<div class='request_acct_row_row_spacer'></div>")

    // Original Format
    $(".film_form_table").last().append("<div class='film_form_row_row'></div>")
    $(".film_form_row_row").last().append("<div class='selection_acct_label'></div>")
    $(".selection_acct_label").last().append("<div class='request_acct_label_text'></div>")
    $(".request_acct_label_text").last().append("<b>Original <br/>Format</b>")
    $(".film_form_row_row").last().append("<div class='request_acct_input'></div>")

    $(".request_acct_input").last().append("<div class='genre_selection_container'></div>")
    $(".genre_selection_container").last().append("<div class='genre_input_table'></div>")

    $(".genre_input_table").last().append("<div class='genre_input_row'></div>")
    $(".genre_input_row").last().append('<ul class="search_list" id="org_format_form_ul"></ul>')

    $("#org_format_form_ul").append(build_org_format_list_form(categories_genre_obj['format'], 1))

    // Exhibition Format
    $(".film_form_table").last().append("<div class='film_form_row_row'></div>")
    $(".film_form_row_row").last().append("<div class='selection_acct_label'></div>")
    $(".selection_acct_label").last().append("<div class='request_acct_label_text'></div>")
    $(".request_acct_label_text").last().append("<b>Exhibition <br/>Format</b>")
    $(".film_form_row_row").last().append("<div class='request_acct_input'></div>")

    $(".request_acct_input").last().append("<div class='genre_selection_container'></div>")
    $(".genre_selection_container").last().append("<div class='genre_input_table'></div>")

    $(".genre_input_table").last().append("<div class='genre_input_row'></div>")
    $(".genre_input_row").last().append('<ul class="search_list" id="ex_format_form_ul"></ul>')

    $("#ex_format_form_ul").append(build_ex_format_list_form(categories_genre_obj['format'], 1))

    // Genre
    $(".film_form_table").last().append("<div class='film_form_row_row'></div>")
    $(".film_form_row_row").last().append("<div class='selection_acct_label'></div>")
    $(".selection_acct_label").last().append("<div class='request_acct_label_text'></div>")
    $(".request_acct_label_text").last().append("<b>Genre</b>")
    $(".film_form_row_row").last().append("<div class='request_acct_input'></div>")

    $(".request_acct_input").last().append("<div class='genre_selection_container'></div>")
    $(".genre_selection_container").last().append("<div class='genre_input_table'></div>")

    $(".genre_input_table").last().append("<div class='genre_input_row'></div>")
    $(".genre_input_row").last().append('<ul class="search_list" id="genre_form_ul"></ul>')

    $("#genre_form_ul").append(build_genre_list_form(categories_genre_obj['genre'], 1))

    //Keywords
    $(".film_form_table").last().append("<div class='film_form_row_row'></div>")
    $(".film_form_row_row").last().append("<div class='selection_acct_label'></div>")
    $(".selection_acct_label").last().append("<div class='request_acct_label_text'></div>")
    $(".request_acct_label_text").last().append("<b>Keywords</b>")

    $(".film_form_row_row").last().append("<div class='request_acct_input'></div>")

    $(".request_acct_input").last().append("<div class='categories_selection_container'></div>")
    $(".categories_selection_container").last().append("<div class='categories_input_table'></div>")

    $(".categories_input_table").last().append("<div class='categories_input_row'></div>")
    $(".categories_input_row").last().append('<ul class="search_list" id="categories_form_ul"></ul>')

    $("#categories_form_ul").append(build_category_list_form(categories_genre_obj['category'], 1))

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

function check_screening_history_upload() {

    $("#film-screening-history-file").change(function(e) {
        var file;

        filepath = $(this).val();

        var fileExt = filepath.split('.').pop(); 

        filename = filepath.split('\\').pop(); 

        if (fileExt.toLowerCase() !== "pdf") {
            $(".warning").find(".alert_text_table").html('<div class="normal_text"> <div class="big">The file you\'re attempting to upload is not a PDF. Please try again.</div>')
            $(".warning").addClass("warning_up")
            $(this).val("");
            $("#screening-history-text").html("no file currently selected");
        }
        else{
            if ((file = this.files[0])) {

                if (file.size > 1048576 * 2) {
                    $(".warning").find(".alert_text_table").html('<div class="normal_text"> <div class="big">The image you\'re attempting to upload is larger than 2MB. Please try again.</div>')
                    $(".warning").addClass("warning_up")
                    $(this).val("");
                    $("#screening-history-text").html("no file currently selected");
                }
                else {
                    $("#screening-history-text").html(filename);
                }
            }
        }
    })
}

function check_still_upload() {

    var _URL = window.URL || window.webkitURL;

    $("#film-still-file").change(function(e) {
        var image, file;

        filepath = $(this).val();

        var fileExt = filepath.split('.').pop(); 

        filename = filepath.split('\\').pop(); 

        if (fileExt.toLowerCase() !== "jpg" && fileExt.toLowerCase() !== "jpeg") {
            $(".warning").find(".alert_text_table").html('<div class="normal_text"> <div class="big">The image you\'re attempting to upload is not a JPEG/JPG. Please try again.</div>')
            $(".warning").addClass("warning_up")
            $(this).val("");
            $("#web-still-text").html("no file currently selected");
        }
        else{
            if ((file = this.files[0])) {

                if (file.size > 1048576) {
                    $(".warning").find(".alert_text_table").html('<div class="normal_text"> <div class="big">The image you\'re attempting to upload is larger than 1MB. Please try again.</div>')
                    $(".warning").addClass("warning_up")
                    $(this).val("");
                    $("#web-still-text").html("no file currently selected");
                }
                else {
               
                    image = new Image();

                    image.src = _URL.createObjectURL(file);
                    
                    image.onload = function() {
                        if (this.width < 380 || this.height < 265) {
                            $(".warning").find(".alert_text_table").html('<div class="normal_text"> <div class="big">The image you\'re attempting to upload has a width smaller than 380px or a height smaller than 265px. Please try again.</div>')
                            $(".warning").addClass("warning_up")
                            $(this).val("");
                            $("#web-still-text").html("no file currently selected");
                        }
                        else {
                            $("#web-still-text").html(filename);
                        }
                    };
                    
                }
            }
        }
    })
}

function build_org_format_list_form(formats, count) {
    ul_str = ""

    for($i=0; $i<formats.length; $i++) {
        li_str = '<li class="search_list_entry_genre">\
                    <input type="checkbox" value="' + ($i+1) + '" name="search-org-format-' + count + '[]" id="search-org-format-' + count + '-' + ($i+1) + '"/>\
                    <label for="search-org-format-' + count + '-' + ($i+1) + '">' + formats[$i][0] +'</label>\
                </li>'
        ul_str += li_str
    }

    return ul_str
}

function build_ex_format_list_form(formats, count) {
    ul_str = ""

    for($i=0; $i<formats.length; $i++) {
        li_str = '<li class="search_list_entry_genre">\
                    <input type="checkbox" value="' + ($i+1) + '" name="search-ex-format-' + count + '[]" id="search-ex-format-' + count + '-' + ($i+1) + '"/>\
                    <label for="search-ex-format-' + count + '-' + ($i+1) + '">' + formats[$i][0] +'</label>\
                </li>'
        ul_str += li_str
    }

    return ul_str
}

function build_genre_list_form(genres, count) {
    ul_str = ""

    for($i=0; $i<genres.length; $i++) {
        li_str = '<li class="search_list_entry_genre">\
                    <input type="checkbox" value="' + ($i+1) + '" name="search-genre-' + count + '[]" id="search-genre-' + count + '-' + ($i+1) + '"/>\
                    <label for="search-genre-' + count + '-' + ($i+1) + '">' + genres[$i][0] +'</label>\
                </li>'
        ul_str += li_str
    }

    return ul_str
}

function build_category_list_form(categories, count) {
    ul_str = ""

    for($i=0; $i<categories.length; $i++) {
        li_str = '<li class="search_list_entry_category">\
                    <input type="checkbox" value="' + ($i+1) + '" name="search-category-' + count + '[]" id="search-category-' + count + '-' + ($i+1) + '"/>\
                    <label for="search-category-' + count + '-' + ($i+1) + '">' + categories[$i][0] +'</label>\
                </li>'
        ul_str += li_str
    }

    return ul_str
}

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