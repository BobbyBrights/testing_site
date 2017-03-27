var web_host = "http://s219085.gridserver.com/";

//String.fromCharCode(97 + n)

$(document).ready(function() {

    document.title = "Forgot Password | Canadian Filmmakers Distribution Centre"

    $(".contents").append("<div class='top_buffer'></div>")
    $(".contents").append("<div class='table'></div>")

    $(".table").append("<div class='table_cell_container'></div>")
    $(".table_cell_container").append("<div class='table_cell_left_margin'></div>")
    $(".table_cell_container").append("<div class='table_contents'></div>")
    $(".table_cell_container").append("<div class='table_cell_right_margin'></div>")

    $(".table_contents").append("<div class='table_title'><div class='title'></div></div>")
    $(".title").append("FORGOT PASSWORD")

    $(".table_contents").append("<div class='spacer'></div>")

    $(".table_contents").append("<div class='forgot_pass_table'></div>")

    // User Name
    $(".forgot_pass_table").last().append("<div class='forgot_pass_row'></div>")
    $(".forgot_pass_row").last().append("<div class='forgot_pass_label'></div>")
    $(".forgot_pass_label").last().append("<div class='forgot_pass_label_text'>Username</div>")
    $(".forgot_pass_row").last().append("<div class='forgot_pass_input'></div>")
    $(".forgot_pass_input").last().append("<div class='forgot_pass_input_large'></div>")
    $(".forgot_pass_input_large").last().append("<input type='text' id='username_forgot' name='username_forgot'>")
    $(".forgot_pass_input_large").last().append("<div class='border_line'></div>")

    // Email
    $(".forgot_pass_table").last().append("<div class='forgot_pass_row'></div>")
    $(".forgot_pass_row").last().append("<div class='forgot_pass_label'></div>")
    $(".forgot_pass_label").last().append("<div class='forgot_pass_label_text'>Email</div>")
    $(".forgot_pass_row").last().append("<div class='forgot_pass_input'></div>")
    $(".forgot_pass_input").last().append("<div class='forgot_pass_input_large'></div>")
    $(".forgot_pass_input_large").last().append("<input type='text' id='email_forgot' name='email_forgot'>")
    $(".forgot_pass_input_large").last().append("<div class='border_line'></div>")

    $(".table_contents").append("<div class='spacer'></div>")
    $(".table_contents").append("<div class='spacer'></div>")

    // Button
    $(".table_contents").append("<div class='forgot_pass_button'><span>Submit</span></div>")

    $(".contents").append("<div class='table_end_buffer'></div>")

    inForgotPass = false;

    $(".forgot_pass_button").on("click", function() {
        if (checkFields() && !inForgotPass) {
            inForgotPass = true;
            username = $("input[name='username_forgot']").val()
            email = $("input[name='email_forgot']").val()
            $(document.body).css({ 'cursor': 'wait' })
            $(".warning").removeClass("warning_up")
            $(".message").removeClass("warning_up")
            $.ajax({
                type: "POST",
                url: web_host + "src/forgot_password_submit.php",
                data: {"username":username, "email":email}
            }).done(function(data) {
                $(document.body).css({ 'cursor': 'default' })
                if (data == "1") {
                    window.location.replace(web_host)
                }
                if (data == "2") {
                    inForgotPass = false;
                    $(".warning").find(".alert_text_table").html('<div class="normal_text"> <div class="big">This username and email pair does not exist in our records.</div>\
                    If you have further issues please contact <a class="small" href="mailto:bookings@cfmdc.org">bookings@cfmdc.org</a></div>')
                    $(".warning").addClass("warning_up")
                }
                if (data =="3") {
                    inForgotPass = false;
                    $(".warning").find(".alert_text_table").html('<div class="normal_text"> <div class="big">There appears to be a error. Please try again later.</div>\
                    If you have further issues please contact <a class="small" href="mailto:bookings@cfmdc.org">bookings@cfmdc.org</a></div>')
                    $(".warning").addClass("warning_up")
                }
            })
        }
        else if (!inForgotPass){
            $(".warning").find(".alert_text_table").html('<div class="normal_text"> <div class="big">You\'ve left some required fields empty or invalid, please try again.</div></div>')
            $(".warning").addClass("warning_up")
        }
    })
    
})

function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
};

function checkFields() {
    username = $("input[name='username_forgot']").val()
    email = $("input[name='email_forgot']").val()

    if (username && email && isValidEmailAddress(email)) {
        return true;
    }
    else {
        return false;
    }
}