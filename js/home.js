old_random_number = -1
facebook_start = 0

String.prototype.trunc = 
      function(n){
          return this.substr(0,n-1)+(this.length>n?'&hellip;':'');
      };

$(document).ready(function() {
    $(".contents").append("<div class='top_buffer'></div>")
    $(".contents").append("<div class='landing_page_table'></div>")

    // feature_films
    $(".landing_page_table").append("<div class='featured_films_row'></div>")
    $(".featured_films_row").append("<a href=''><div class='featured_films_cell'></div></a>")
    $(".featured_films_cell").append("<div class='featured_films'></div>")
    $(".featured_films_cell").append("<div class='featured_films_text'></div>")
    $(".featured_films_text").append("<div class='featured_films_text_content'></div>")
    $(".featured_films_cell").append("<div class='featured_films_spacer'></div>")

    add_featured_film_image()

    interval_id = setInterval(changeFeaturedFilmsImg, 6000)
    $(window).focus(function() {
        if (!interval_id)
            interval_id = setInterval(changeFeaturedFilmsImg, 6000);
    });

    $(window).blur(function() {
        clearInterval(interval_id);
        interval_id = 0;
    });

    // recent_aquisitions
    $(".landing_page_table").append("<div class='recent_aquisitions_row'></div>")
    $(".recent_aquisitions_row").append("<div class='recent_aquisitions_cell'></div>")
    $(".recent_aquisitions_cell").append("<div class='title'>Featured Works</div>")

    $(".recent_aquisitions_cell").append("<div class='recent_aquisitions_container'></div>")
    $(".recent_aquisitions_container").append("<div class=\"recent_aquisitions_carousel\" data-flickity='{ \"autoPlay\": 8000, \"wrapAround\": true }'>")
    addRecentAquisitionCarousels()

    // whats_new
    $(".landing_page_table").append("<div class='whats_new_row'></div>")
    $(".whats_new_row").append("<div class='whats_new_cell'></div>")

    $(".whats_new_cell").append("<div class='title'>What's New</div>")
    $(".whats_new_cell").append("<div class='whats_new_container'></div>")
    //$(".whats_new_container").append("<div class=\"whats_new_carousel\" data-flickity='{\"wrapAround\": true }'>")
    $(".whats_new_container").append("<div class=\"whats_new_carousel\" data-flickity='{ \"autoPlay\": 10000, \"wrapAround\": true }'>")
    addNewsCarousels()

    // social_feed_cfmdc_tv
    $(".landing_page_table").append("<div class='social_feed_cfmdc_tv_row'></div>")
    $(".social_feed_cfmdc_tv_row").append("<div class='social_feed_cell'></div>")
    $(".social_feed_cfmdc_tv_row").append("<div class='spacer_cell'></div>")
    $(".social_feed_cfmdc_tv_row").append("<div class='cfmdc_tv_cell'></div>")

    $(".social_feed_cell").append("<div class='title'><a href='https://www.facebook.com/cfmdcmembers/' target='_blank'>Social Feed</a></div>")
    
    $(".social_feed_cell").append("<div class='scroll_container'><div class='scroll_container_container'></div></div>")

    $(".cfmdc_tv_cell").append("<div class='title'><a href='http://www.cfmdc.tv/' target='_blank'>CFMDC TV</a></div>")

    $(".cfmdc_tv_cell").append("<div class='vimeo_container'></div>")

    loadvimeochannels()

    $(".scroll_container").find(".scroll_container_container").append("<div class='facebook_event_container'><div class='event_container'></div></div>")
    getFacebookEvents(facebook_json, 10)
    $(".facebook_event_container").append("<div class='spacer'></div>")
    $(".facebook_event_container").append("<div class='facebook_text_container'>Want to see more? <a href='https://www.facebook.com/cfmdcmembers/' target='_blank'><b>Follow us on Facebook.</b></a></div>")


    // $(".featured_films").append("<img src='img/feature_films/Colburn-Martha.jpg'/>")
    $(".contents").append("<div class='end_buffer'></div>")

    if (message) {
                $(".message").find(".alert_text_table").html(message)
				$(".message").addClass("message_up")
    }
    else if (warning) {
        $(".warning").find(".alert_text_table").html(warning)
				$(".warning").addClass("warning_up")
    }

    $('.scroll_container').scroll(function() {
        if ($(this)[0].scrollHeight - $(this).scrollTop() == $(this).outerHeight()) {
            getFacebookEvents(facebook_json, 5)
        }
    });
})

function addRecentAquisitionCarousels() {
    for (i=0; i < recent_aquisitions_json.length; i++) {
        $(".recent_aquisitions_carousel").append("<div class='carousel-cell'></div>")
        $(".carousel-cell").last().append("<div class='recent_aquisitions_contents_table'></div>")
        $(".recent_aquisitions_contents_table").last().append("<a href = '"  + web_host + "film/" + recent_aquisitions_json[i]['film_id'] + "'></a>")
        $("a").last().append("<div class='recent_aquisitions_img'><div class='recent_aquisitions_img_container'></div></div>")

        if (recent_aquisitions_json[i]['still']) {
            getStill(recent_aquisitions_json[i])
        }

        $("a").last().append("<div class='spacer'></div>")
        

        $("a").last().append("<div class='recent_aquisitions_details'></div>")

        filmmaker = recent_aquisitions_json[i]['secondary_filmmaker'] ? recent_aquisitions_json[i]['filmmaker_name'] + " & " + recent_aquisitions_json[i]['secondary_filmmaker'] : recent_aquisitions_json[i]['filmmaker_name']

        details = film_details(recent_aquisitions_json[i])

        if (parseInt(recent_aquisitions_json[i]['client_id']) == 1) {
            filmmaker = recent_aquisitions_json[i]['filmmaker_name']
            $(".recent_aquisitions_details").last().append("<b>" + recent_aquisitions_json[i]['title'] + "</b> / " + filmmaker)
        }
        else {
            $(".recent_aquisitions_details").last().append("<b>" + recent_aquisitions_json[i]['title'] + "</b> / " + filmmaker + " / " + details)
        }
        

    }
}

function film_details(film_obj) {
    film_details_arr = [film_obj['length'], film_obj['year']]
    film_detail_str = "";
    film_detail_first_string_found = false;
    for (j = 0; j < film_details_arr.length; j++) { 
        if (film_details_arr[j]) {
            if (j == 0 || !film_detail_first_string_found) {
                film_detail_first_string_found = true
                film_detail_str += film_details_arr[j]
            }
            else {
                film_detail_str += " / " + film_details_arr[j]
            }
        }
    }
    return film_detail_str
}

function getStill(film_object) {
    containerw = 313
    containerh = 235
    if (film_object['still_width'] < containerw || film_object['still_height'] < containerh) {
        $('.recent_aquisitions_img_container').last().append("<img src='" + film_object['still'] + "' class='recent_aquisitions_img_container_child'>")
    }
    else if (film_object['still_width'] == 740) {
        $('.recent_aquisitions_img_container').last().append("<img src='" + film_object['still'] + "' class='recent_aquisitions_img_container_child'>")
        $('.recent_aquisitions_img_container > img').last().width(containerw + 130)
    }
    else {
        $('.recent_aquisitions_img_container').last().append("<img src='" + film_object['still'] + "' class='recent_aquisitions_img_container_child'>")
        $('.recent_aquisitions_img_container > img').last().width(containerw)
    }

}

function addNewsCarousels() {

    for (i=0; i < news_json.length; i++) {
        $(".whats_new_carousel").append("<div class='carousel-cell'></div>")
        $(".carousel-cell").last().append("<div class='whats_new_contents_table'></div>")
        $(".whats_new_contents_table").last().append("<a href = '"  + web_host + "news/" + news_json[i]['news_nid'] + "'></a>")
        $("a").last().append("<div class='whats_new_heading'>" + news_json[i]['news_title'] + "</div>")
        if (news_json[i]['news_thumbnail']) {
            $("a").last().append("<div class='spacer'></div>")
            $("a").last().append("<div class='whats_new_img'></div>")
            $(".whats_new_img").last().append("<div class='whats_new_img_container'><img class='whats_new_img_container_child' src='" + news_json[i]['news_thumbnail'] + "'></div>")
            if (news_json[i]['news_thumbnail_width'] > 378) {
                $(".whats_new_img_container_child").find("img").last().height(378 * (news_json[i]['news_thumbnail_width']/news_json[i]['news_thumbnail_height']))
            }
            else {
                $(".whats_new_img_container_child").find("img").last().height(news_json[i]['news_thumbnail_height'])
            }
        }
        if (news_json[i]['news_blurb']) {
            $(".whats_new_contents_table").last().append("<div class='spacer'></div>")
            $(".whats_new_contents_table").last().append("<div class='spacer'></div>")
            $(".whats_new_contents_table").last().append("<div class='whats_new_blurb'>" + news_json[i]['news_blurb'] + "</div>")
            $(".whats_new_blurb").last().find('a').attr("target", "_blank")
        }
    }

    //$(window).load( function() {
        $(".whats_new_img_container").find("img").each(function () {
            $(this).load(function() {
                img_h = $(this).height()
                whats_new_img_container = $(this).parent()
                carousel_cur = $(this).parent().parent().parent().parent()
                total_occupied = carousel_cur.find(".whats_new_heading").height()
                console.log("title height:" + carousel_cur.find(".whats_new_heading").height())
                total_occupied += 8
                if (carousel_cur.find(".whats_new_blurb").length == 1) {
                    total_occupied += 16
                    total_occupied += carousel_cur.find(".whats_new_blurb").height()
                    console.log("blurb height:" + carousel_cur.find(".whats_new_blurb").height())
                }
                remaining_space = 340 - total_occupied
                console.log("total height:" + total_occupied)
                if (img_h > remaining_space) {
                    whats_new_img_container.height(remaining_space)
                }
                else {
                    whats_new_img_container.height(img_h)
                }
            })
        })
    //})
}

$(window).load( function() {
    console.log("here1")
    $(".whats_new_img_container").find("img").each(function () {
            img_h = $(this).height()
            console.log("here")
            whats_new_img_container = $(this).parent()
            carousel_cur = $(this).parent().parent().parent().parent()
            total_occupied = carousel_cur.find(".whats_new_heading").height()
            console.log("title height:" + carousel_cur.find(".whats_new_heading").height())
            total_occupied += 8
            if (carousel_cur.find(".whats_new_blurb").length == 1) {
                total_occupied += 16
                total_occupied += carousel_cur.find(".whats_new_blurb").height()
                console.log("blurb height:" + carousel_cur.find(".whats_new_blurb").height())
            }
            remaining_space = 340 - total_occupied
            console.log("total height:" + total_occupied)
            if (img_h > remaining_space) {
                whats_new_img_container.height(remaining_space)
            }
            else {
                whats_new_img_container.height(img_h)
            }
    })
})

function loadvimeochannels() {
        var url = "http://vimeo.com/api/v2/user21477037/channels.json";
        var channels_array = new Array();
        var channels_title_array = new Array();
        $.getJSON(url, function(data) {
            $.each(data, function(i, item) {
                        channels_array[i] = "http://vimeo.com/api/v2/channel/" + item.id + "/videos.json?callback=?";
                        channels_title_array[i] = item.name;
            });
            var rand_num = Math.floor(Math.random()*(channels_array.length));
            loadvimeoimages(channels_array[rand_num], channels_title_array[rand_num]);
        });
}

function loadvimeoimages(channel_url, channel_title) {
    $.getJSON(channel_url, function(data) {
        var img_array = new Array();
        var video_title_array = new Array();
        $.each(data, function(j, video) {
                img_array[j] = video.thumbnail_large;
                video_title_array[j] = "<b>"+video.title+"</b> from <b>"+channel_title+"</b>"; 
        });
        var rand_num = Math.floor(Math.random()*(img_array.length));

        $(".vimeo_container").append('<a href="http://www.cfmdc.tv" target="_blank"></a>')
        $(".vimeo_container").find("a").append("<div class='vimeo_still_container'><img src='" + img_array[rand_num] + "' class='vimeo_still_container_child'></div>")
        $(".vimeo_container").find("a").find("img").load(function() {
            if ($(this).height() < 300) {
                curwidth = $(this).width()
                curheight = $(this).height()
                ratio = curwidth/curheight.toFixed(2)
                $(this).height(300)
                $(this).width(300 * ratio)
            }
        })

        $(".vimeo_container").find("a").append("<div class='spacer'></div>")

        $(".vimeo_container").find("a").append("<div class='vimeo_text_container'>" + video_title_array[rand_num]  + "</div>")
    });
}

function add_featured_film_image() {
    randomInt = Math.floor(Math.random() * featured_film_json.length)
    oldRandomNumber = randomInt
    film = featured_film_json[randomInt]
    $(".featured_films_row").find("a").attr("href", film['film_id'])
    $(".featured_films").html("<img src='" + film['image_url'] + "' />")
    $(".featured_films_text_content").html("<b>" + film['title'] + "</b> / " + film['filmmaker'])
}

function changeFeaturedFilmsImg() {
    randomInt = Math.floor(Math.random() * featured_film_json.length)
    while (randomInt == oldRandomNumber) {
        randomInt = Math.floor(Math.random() * featured_film_json.length)
    }
    oldRandomNumber = randomInt
    film = featured_film_json[randomInt]
    $(".featured_films_cell").addClass("featured_films_cell_fade_out");
    $(".featured_films_cell_fade_out").on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', 
        function() {
            $(".featured_films_row").find("a").attr("href", film['film_id'])
            $(".featured_films").html("<img src='" + film['image_url'] + "' />")
            $(".featured_films_text_content").html("<b>" + film['title'] + "</b> / " + film['filmmaker'])
            $(".featured_films").find("img").load(function() {
                $(".featured_films_cell").removeClass("featured_films_cell_fade_out");
            }) 
        }
    );
    
}

function getFacebookEvents(facebookObj, length) {
    posts_count = facebookObj['posts']['data'].length
    first_post = true
    
    for (i = facebook_start; i < (facebook_start + length) && i < posts_count; i++) {
        
        post = facebookObj['posts']['data'][i]

        if (!post['name'] ) {
            continue
        }

        id_split = post['id'].split("_")
        link = "https://www.facebook.com/cfmdcmembers/posts/" + id_split[1]

        $(".event_container").append("<a href='" + link + "' target='_blank'></a>")

        if (first_post) {
            $(".event_container").find('a').last().append("<div class='start_spacer'></div>")
            first_post = false
        }

        if (post['name'] != "Timeline Photos") {
            $(".event_container").find('a').last().append("<div class='title_container'><b>" + post['name'] + "</b></div>")
            $(".event_container").find('a').last().append("<div class='spacer'></div>")
        }

        if (post['full_picture']) {
            $(".event_container").find('a').last().append("<div class='image_container'><img src='" + post['full_picture'] + "'></div>")
            $(".event_container").find('a').last().append("<div class='spacer'></div>")
        }

        if (post['message']) {
            $(".event_container").find('a').last().append("<div class='facebook_text_container'>" + post['message'].trunc(150) + "</div>")
            $(".event_container").find('a').last().append("<div class='spacer'></div>")
        }

        $(".event_container").append("<div class='spacer'></div>")
        $(".event_container").append("<div class='spacer'></div>")
        $(".event_container").append("<div class='spacer'></div>")

    }

    facebook_start = facebook_start + length

}