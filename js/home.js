$(document).ready(function() {
    $(".contents").append("<div class='top_buffer'></div>")
    $(".contents").append("<div class='featured_films'></div>")
    $(".featured_films").append("<img src='img/feature_films/Colburn-Martha.jpg'/>")

    if (message) {
                $(".message").find(".alert_text_table").html(message)
				$(".message").addClass("message_up")
    }
    else if (warning) {
        $(".warning").find(".alert_text_table").html(warning)
				$(".warning").addClass("warning_up")
    }
})