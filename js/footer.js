$(document).ready(function() {
    $('.contents').append("<div class='footer_buffer'></div>")
    $('.contents').append("<div class='footer_container' id='footer'></div>")
    
    $('.footer_container').append("<div class='footer_left_portion'></div>")
    //$('.footer_left_portion').append('<img class="logo" src="'+web_host+'img/footer/cfmdc_logo.jpg"></img>')
    $('.footer_left_portion').append('<div class="text_container"></div>')
    $('.text_container').append('<div class="text"><b>Canadian Filmmakers Distribution Centre</b></div>')
    $('.text_container').append('<div class="text">245-401 Richmond St West</div>')
    $('.text_container').append('<div class="text">Toronto ON Canada M5V 3A8</div>')
    $('.text_container').append('<div class="text">&nbsp;</div>')
    $('.text_container').append('<div class="text">Monday - Thursday 10am - 6pm</div>')
    $('.text_container').append('<div class="text">416 588-0725</div>')

    $('.footer_container').append("<div class='footer_right_portion'></div>")
    $('.footer_right_portion').append("<div class='links'><div class='links_'><a href='" + web_host + "links/'>Links</a></div></div>")
    $('.footer_right_portion').append("<div class='spacer'></div>")
    $('.footer_right_portion').append("<div class='links'><div class='about'><a href='" + web_host + "about/'>About</a></div></div>")
    $('.footer_right_portion').append("<div class='spacer'></div>")
    $('.footer_right_portion').append("<div class='links'><div class='staffboard'><a href='" + web_host + "staffboard/'>Staff + Board</a></div></div>")
    $('.footer_right_portion').append("<div class='spacer'></div>")
    $('.footer_right_portion').append("<div class='links'><div class='contact'><a href='" + web_host + "contact/'>Contact</a></div></div>")

    $('.footer_container').append("<div class='supporters_container'></div>")
    $('.supporters_container').append("<a href='http://canadacouncil.ca/' target='_blank'><img class='left_logo' src='" + web_host + "img/footer/CCFA_BW_black_96_e.jpg'></a>")
    $('.supporters_container').append("<a href='http://www.arts.on.ca/' target='_blank'><img class='centre_logo' src='" + web_host + "img/footer/2014-OAC-Logo-BK-EPS_sm.jpg'></a>")
    $('.supporters_container').append("<a href='http://www.torontoartscouncil.org/' target='_blank'><img class='right_logo' src='" + web_host + "img/footer/TAC.jpg'></a>")

    $(".glyphicon-menu-hamburger").on("click", hamburger)
    hamburger_on = true;

    if ($('#footer').visible()) {
        if (hamburger_on) {
            $('.glyphicon-menu-hamburger').off("click", hamburger)
            hamburger_on = false
            turnOffHamburger()
        }
    }
    // $(".accessible").html("")
    checkFooter()
})

$(window).resize(function() {
    checkFooter();
    if ($('.footer_buffer').visible()) {
        if (hamburger_on) {
            $('.glyphicon-menu-hamburger').off("click", hamburger)
            hamburger_on = false
            turnOffHamburger()
            hide_hamburger();
        }
    }
    else {
        if (!hamburger_on) {
            $('.glyphicon-menu-hamburger').on("click", hamburger)
            hamburger_on = true
            turnOnHamburger()
        }
    }
})

$(window).scroll(function() {
    if ($('.footer_buffer').visible()) {
        if (hamburger_on) {
            $('.glyphicon-menu-hamburger').off("click", hamburger)
            hamburger_on = false
            turnOffHamburger()
            hide_hamburger();
        }
    }
    else {
        if (!hamburger_on) {
            $('.glyphicon-menu-hamburger').on("click", hamburger)
            hamburger_on = true
            turnOnHamburger()
        }
    }
})

function checkFooter() {
    content_h = $('.contents').height()
    content_without_footer_h = content_h - $('.footer_container').height() - $('.footer_buffer').height()

    window_height = $(window).height()

    remain_h = content_without_footer_h - window_height

    if ((remain_h) < 0) {
        $('.footer_buffer').height(Math.abs(remain_h) - $('.footer_container').height())
    }
}

function turnOffHamburger() {
    $('.glyphicon-menu-hamburger').css("color", "#EFEFEF")
    $('.glyphicon-menu-hamburger').hover(function(){$(this).css('color', '#EFEFEF')}, function(){ $(this).css('color', '#EFEFEF') });
}

function turnOnHamburger() {
    $('.glyphicon-menu-hamburger').css("color", "#000")
    $('.glyphicon-menu-hamburger').hover(function(){$(this).css('color', '#F56F02')}, function(){ $(this).css('color', '#000') });
}

function hamburger() {
            if ($(".hidden_portion").hasClass("portion_down")){
                $(".hidden_portion").removeClass("portion_down");
            }
            else {
                $(".hidden_portion").addClass("portion_down");
                toolbarCollapsed = false;
            }
            hide_search();
            hide_signin();
}   