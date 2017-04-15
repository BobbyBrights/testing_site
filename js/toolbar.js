 /**
 * Convert a string to HTML entities
 */
String.prototype.toHtmlEntities = function() {
    return this.replace(/./gm, function(s) {
        return "&#" + s.charCodeAt(0) + ";";
    });
};

/**
 * Create string from HTML entities
 */
String.fromHtmlEntities = function(string) {
    return (string+"").replace(/&#\d+;/gm,function(s) {
        return String.fromCharCode(s.match(/\d+/gm)[0]);
    })
};

var web_host = "http://s219085.gridserver.com/";

//var logo_ims = ["CFMDC_logo_50th_blk.jpg", "CFMDC_logo_50th_blk_gld.jpg", "CFMDC_logo_50th_blu.jpg"]

//var randomnumber=Math.floor(Math.random()*3)

var logo_ims = ["CFMDC_logo_50th_blk_gld_all_sm_sm.jpg"]

var randomnumber=Math.floor(Math.random()*1)

var toolbar_contents = '\
<div class="message">\
	<div class="alert_table">\
		<div class="alert_table_cell_container">\
			<div class="alert_table_cell_left_margin">\
			</div>\
			<div class="alert_table_contents">\
				<div class="alert_remove">\
					<span class="glyphicon glyphicon-remove"></span>\
				</div>\
				<div class="alert_spacer"></div>\
				<div class="alert_text_table">\
					<span> <b class="big">Incorrect username or password, please try again.</b> \
					<br> If you have further issues please contact <a class="small" href="mailto:members@cfmdc.org">members@cfmdc.org</a></span>\
				</div>\
			</div>\
			<div class="alert_table_cell_right_margin">\
			</div>\
		</div>\
	</div>\
</div>\
<div class="warning">\
	<div class="alert_table">\
		<div class="alert_table_cell_container">\
			<div class="alert_table_cell_left_margin">\
			</div>\
			<div class="alert_table_contents">\
				<div class="alert_remove">\
					<span class="glyphicon glyphicon-remove"></span>\
				</div>\
				<div class="alert_spacer"></div>\
				<div class="alert_text_table">\
				</div>\
			</div>\
			<div class="alert_table_cell_right_margin">\
			</div>\
		</div>\
	</div>\
</div>\
<div class="bar">\
	<div class="hiddenbar">\
		<div class="left_links">\
			<div class="signin_form">\
				<div class="input_space">\
					<input type="text" id="username" name="username" placeholder="Username"/>\
					<div class="border_line"></div>\
				</div>\
				<div class="spacer"></div>\
				<div class="input_space">\
					<input type="password" id="password" name="password" placeholder="Password"/>\
					<div class="border_line"></div>\
				</div>\
				<div class="spacer"></div>\
				<div class="button">\
					<span>Sign In</span>\
				</div>\
			</div>\
		</div>\
		<div class="right_links">\
			<div class="remove">\
				<span class="glyphicon glyphicon-remove"></span>\
			</div>\
			<div class="spacer"></div>\
			<div class="links">\
				<span><a href="'+web_host+'requestaccount">Request Account</a></span>\
			<div class="spacer"></div>\
				<span><a href="'+web_host+'forgotpassword">Forgot Password</a></span>\
			</div>\
		</div>\
		<div class="border_line"></div>\
	</div>\
	<div class="toolbar">\
		<div class="upper_portion">\
			<a href="' + web_host + '">\
			<img class="logo" src="' + web_host + 'img/toolbar/' + logo_ims[randomnumber] + '">\
			</a>\
			<div class="right_links">\
							<div class="facebook_logo">\
				<a href="https://www.facebook.com/cfmdcmembers/" target="_blank" title="Facebook"><i class="fa fa-facebook-official" aria-hidden="true"></i></a>\
			</div>\
			<div class="spacer"></div>'
			//<img class="logo" src="'+web_host+'img/toolbar/CFMDC_logo_50th_blk.jpg"></img>\
				// <div class="hamburger">\
				// 	<span class="glyphicon glyphicon-menu-hamburger"></span>\
				// </div>\
				// <div class="spacer"></div>\ 

if (logged_in == 1) {
	toolbar_contents += '<div id="toolbar_signout" class="signin">\
					<span>Sign Out</span>\
				</div>'
}
else {
	toolbar_contents += '<div id="toolbar_signin" class="signin">\
					<span>Sign In</span>\
				</div>'
}
toolbar_contents += '			</div>\
		</div> \
		<div class="lower_portion">\
			<a href="' + web_host + '">\
			<img class="mini_logo" src="' + web_host + 'img/toolbar/cfmdc_logo_gld_sm_brt.jpg">\
			</a>\
			<div class="search">\
				<span class="glyphicon glyphicon-search"></span>\
			</div>\
			<div class="spacer_special"></div>\
			<div id="catalogue" class="links">\
				<div class="catalogue">\
					<span>Catalogue</span>\
				</div>\
			</div>\
			<div class="spacer"></div>\
			<div id="submit_film" class="links">\
				<div class="submit_film">\
					<span>Submit Film</span>\
				</div>\
			</div>\
			<div class="spacer"></div>\
			<div id="sales_rentals" class="links">\
				<div class="sales_rentals">\
					<span>Sales + Rentals</span>\
				</div>\
			</div>\
			<div class="spacer"></div>\
			<div id="educators" class="links">\
				<div class="educators">\
					<span>Educators</span>\
				</div>\
			</div>\
		</div>\
		<div class="hidden_container">\
			<div id="educators_sub_links" class="educators_sub_links">\
				<div class="sub_links_header">\
				</div>\
				<div class="sub_links_container">\
					<div class="sub_link_container">\
						<div class="educators_link">\
							<a href="">Films For The Classroom</a>\
						</div>\
					</div>\
					<div class="sub_link_spacer">\
					</div>\
					<div class="sub_link_container">\
						<div class="educators_link">\
							<a href="">Educational Services</a>\
						</div>\
					</div>\
					<div class="sub_link_spacer">\
					</div>\
					<div class="sub_link_container">\
						<div class="educators_link">\
							<a href="https://cfmdcresidentscholar.wordpress.com/2015/12/02/welcome-to-cfmdc-scholar-in-residence/" target="_blank">Scholar In Residence</a>\
						</div>\
					</div>\
					<div class="sub_link_spacer">\
					</div>\
					<div class="sub_link_container">\
						<div class="educators_link">\
							<a href="">Study Guides</a>\
						</div>\
					</div>\
				</div>\
				<div class="sub_links_footer">\
				</div>\
			</div>\
			<div id="sales_rentals_sub_links" class="sales_rentals_sub_links">\
				<div class="sub_links_header">\
				</div>\
				<div class="sub_links_container">\
					<div class="sub_link_container">\
						<div id="previews" class="sales_rentals_link">\
							<a href="'+web_host+'previews">Previews</a>\
						</div>\
					</div>\
					<div class="sub_link_spacer">\
					</div>\
					<div class="sub_link_container">\
						<div id="feeschedule" class="sales_rentals_link">\
							<a href="'+web_host+'feeschedule">Fee Schedule</a>\
						</div>\
					</div>\
					<div class="sub_link_spacer">\
					</div>\
					<div class="sub_link_container">\
						<div class="sales_rentals_link">\
							<a href="">Rent a Film</a>\
						</div>\
					</div>\
					<div class="sub_link_spacer">\
					</div>\
					<div class="sub_link_container">\
						<div class="sales_rentals_link">\
							<a href="">Rentals Shipping/Returns</a>\
						</div>\
					</div>\
					<div class="sub_link_spacer">\
					</div>\
					<div class="sub_link_container">\
						<div class="sales_rentals_link">\
							<a href="">Buy a Film</a>\
						</div>\
					</div>\
				</div>\
				<div class="sub_links_footer">\
				</div>\
			</div>\
			<div id="submit_film_sub_links" class="submit_film_sub_links">\
				<div class="sub_links_header">\
				</div>\
				<div class="sub_links_container">\
					<div class="sub_link_container">\
						<div id="faq" class="submit_film_link">\
							<a href="'+web_host+'faq">F.A.Q.</a>\
						</div>\
					</div>\
					<div class="sub_link_spacer">\
					</div>\
					<div class="sub_link_container">\
						<div id="submitnow" class="submit_film_link">\
							<a href="'+web_host+'submitnow">Submit Now</a>\
						</div>\
					</div>\
				</div>\
				<div class="sub_links_footer">\
				</div>\
			</div>\
			<div id="catalogue_sub_links" class="catalogue_sub_links">\
				<div class="sub_links_header">\
				</div>\
				<div class="sub_links_container">\
					<div class="sub_link_container">\
						<div id="artist_index" class="catalogue_link">\
							<a href="'+web_host+'artistindex">Artist Index</a>\
						</div>\
					</div>\
					<div class="sub_link_spacer">\
					</div>\
					<div class="sub_link_container">\
						<div id="compilations" class="catalogue_link">\
							<a href="'+web_host+'compilations">Compilations</a>\
						</div>\
					</div>\
				</div>\
				<div class="sub_links_footer">\
				</div>\
			</div>\
			<div class="search_portion">\
				<div class="upper_search_container">\
					<div class="right_search">\
						<div class="selection_container">\
							<div class="input_table">\
								<div class="input_row_heading">\
								Genre\
								</div>\
								<div class="input_row_spacer">\
								</div>\
								<div class="input_row">\
									<ul class="search_list" id="genre_search_ul">\
									</ul>\
								</div>\
								<div class="input_row_heading">\
								Keywords\
								</div>\
								<div class="input_row_spacer">\
								</div>\
								<div class="input_row">\
									<ul class="search_list" id="category_search_ul">\
									</ul>\
								</div>\
							</div>\
						</div>\
					</div>\
					<div class="spacer">\
					</div>\
					<div class="left_search">\
						<div class="generic_table">\
							<div class="new_aquisition_checkbox">\
								<input type="checkbox" value="1" id="new_aquisition_checkbox_input" name="new_aquisition_checkbox_input" />\
								<label for="new_aquisition_checkbox_input"></label>\
							</div>\
							<div class="new_aquisition_text"><b>New Aquisitions</b></div>\
							<div class="new_aquisition_parens">(acquired within the last year)</div>\
						</div>\
						<div class="generic_table">\
							<div class="celluloid_only_checkbox">\
								<input type="checkbox" value="1" id="celluloid_only_checkbox_input" name="celluloid_only_checkbox_input" />\
								<label for="celluloid_only_checkbox_input"></label>\
							</div>\
							<div class="celluloid_only_text"><b>Celluloid Only</b></div>\
							<div class="celluloid_only_parens">(restricted to Super 8, 16mm, and 32mm)</div>\
						</div>\
						<div class="input_table">\
							<div class="input_row">\
								<div class="input_label">\
									<div class="input_label_text">Artist</div>\
								</div>\
								<div class="input_input">\
									<div class="input_input_large">\
										<input type="text" id="artist" name="artist"/>\
										<div class="border_line">\
										</div>\
									</div>\
								</div>\
							</div>\
							<div class="input_row">\
								<div class="input_label">\
									<div class="input_label_text">Title</div>\
								</div>\
								<div class="input_input">\
									<div class="input_input_large">\
										<input type="text" id="title" name="title"/>\
										<div class="border_line">\
										</div>\
									</div>\
								</div>\
							</div>\
							<div class="input_row">\
								<div class="input_label">\
									<div class="input_label_text">Country</div>\
								</div>\
								<div class="input_input">\
									<div class="input_input_large">\
										<input type="text" id="country" name="country"/>\
										<div class="border_line">\
										</div>\
									</div>\
								</div>\
							</div>\
							<div class="input_row">\
								<div class="input_label">\
									<div class="input_label_text">Year</div>\
								</div>\
								<div class="input_sub_table">\
									<div class="input_input_field_small">\
										<div class="input_input_small">\
											<input type="number" onKeyPress="if(this.value.length==4) return false;" id="year_begin" name="year_begin"/>\
											<div class="border_line">\
											</div>\
										</div>\
									</div>\
									<div class="input_input_spacer"></div>\
									<div class="input_input_text">to</div>\
									<div class="input_input_spacer"></div>\
									<div class="input_input_field_small">\
										<div class="input_input_small">\
											<input type="number" onKeyPress="if(this.value.length==4) return false;" id="year_end" name="year_end"/>\
											<div class="border_line">\
											</div>\
										</div>\
									</div>\
									<div class="input_input_ender"></div>\
								</div>\
							</div>' +
							// <div class="input_row">\
							// 	<div class="input_label">\
							// 		<div class="input_label_text">Length</div>\
							// 	</div>\
							// 	<div class="input_input">\
							// 		<div class="input_sub_table">\
							// 			<div class="input_input_field_small">\
							// 				<div class="input_input_small">\
							// 					<input type="number" id="length_begin" name="length_begin"/>\
							// 					<div class="border_line">\
							// 					</div>\
							// 				</div>\
							// 			</div>\
							// 			<div class="input_input_spacer"></div>\
							// 			<div class="input_input_text"> mins to </div>\
							// 			<div class="input_input_spacer"></div>\
							// 			<div class="input_input_field_small">\
							// 				<div class="input_input_small">\
							// 					<input type="number" id="length_end" name="length_end"/>\
							// 					<div class="border_line">\
							// 					</div>\
							// 				</div>\
							// 			</div>\
							// 			<div class="input_input_spacer"></div>\
							// 			<div class="input_input_text"> mins </div>\
							// 			<div class="input_input_ender"></div>\
							// 		</div>\
							// 	</div>\
							// </div>\
						'</div>\
					</div>\
				</div>\
				<div class="search_button_container">\
					<div class="search_button">\
						<b>SEARCH</b>\
					</div>\
				</div>\
			</div>\
			<div class="hidden_portion">\
				<div class="glyph_gap">\
				</div>\
				<div class="spacer"></div>\
				<div class="links">\
					<div class="links_">\
						<span>Links</span>\
					</div>\
				</div>\
				<div class="spacer"></div>\
				<div class="links">\
					<div class="supporters">\
						<span>Supporters</span>\
					</div>\
				</div>\
				<div class="spacer"></div>\
				<div class="links">\
					<div class="about">\
						<span>About</span>\
					</div>\
				</div>\
				<div class="spacer"></div>\
				<div class="links">\
					<div class="contact">\
						<span>Contact</span>\
					</div>\
				</div>\
			</div>\
		</div>\
	</div>\
</div>\
'
startingCalcPos = 0;
isScrollUp = false;
oldScrollbarPos = null;
newScrollbarPos = null; 
current_dist_scroll = 0;
toolbarCollapsed = false;

$( document ).ready(function() {
	if (logged_in == 0) {
		$(".bar").hide();
	}

	$('body').append("<div class='toolbar_container'></div>")
    $('.toolbar_container').append(toolbar_contents)
	oldScrollbarPos = newScrollbarPos = $(window).scrollTop()
	$(".mini_logo").hide()

	// $(".glyphicon-menu-hamburger").click(function() {
	// 	if ($(".hidden_portion").hasClass("portion_down")){
	// 		$(".hidden_portion").removeClass("portion_down");
	// 	}
	// 	else {
	// 		$(".hidden_portion").addClass("portion_down");
	// 		toolbarCollapsed = false;
	// 	}
	// 	hide_search();
	// 	hide_signin();
	// });

	$("#toolbar_signin").click(function() {
		if ($(".bar").hasClass("bar_down")){
			$(".bar").removeClass("bar_down");
		}
		else {
			$(".bar").addClass("bar_down");
			toolbarCollapsed = false;
		}
		hide_hamburger();
		hide_search();
	});

	$("#toolbar_signout").click(function() {
		$.ajax({
				url: web_host + "src/logout.php",
			}).done(function(data) {
				if (data == 1) {
					location.reload();
				}
			});
	});

	$(".remove > .glyphicon-remove").click(function() {
		if ($(".bar").hasClass("bar_down")){
			$(".bar").removeClass("bar_down");
		}
		else {
			$(".bar").addClass("bar_down");
		}
	});

	$(".glyphicon-search").click(function() {
		if ($(".search_portion").hasClass("search_down")){
			$(".search_portion").removeClass("search_down");
			$(".search").removeClass("search_on")
		}
		else {
			$(".search_portion").addClass("search_down");
			$(".search").addClass("search_on")
			toolbarCollapsed = false;
		}
		hide_hamburger();
		hide_signin();
	});

	$(".warning").find(".glyphicon-remove").click(function() {
		$(".warning").removeClass("warning_up")
	})

	$(".message").find(".glyphicon-remove").click(function() {
		$(".message").removeClass("message_up")
	})

	checkNumerics($("#year_begin"));
	checkNumerics($("#year_end"));
	checkNumerics($("#length_begin"));
	checkNumerics($("#length_end"));


	$("#genre_search_ul").append(build_genre_list(categories_genre_obj['genre']))

	$("#category_search_ul").append(build_category_list(categories_genre_obj['category']) )

	$(".selection_container").mouseover(function() {
		$("body").addClass("scrollDisabled");
	})

	$(".selection_container").mouseout(function() {
		$("body").removeClass("scrollDisabled");
	})

    $("body").append("<div class='contents'></div>")

	$(".search_button").click(function() {
		if (!isSearchEmpty()) {
			search_str = getSearchData()
			window.location.replace(web_host + "search/" + search_str + "/1")
			window.location.href = web_host + "search/" + search_str + "/1"
			return false;
		}
	})

	$(".signin_form > .button").click(function() {
		initiateLogin();
	})

	generalSubDrop("educators")	
	generalSubDrop("sales_rentals")	
	generalSubDrop("submit_film")	
	generalSubDrop("catalogue")	

// setTimeout(alert("Hello "), 2000);

})

function generalSubDrop(id) {
	$("#" + id + "_sub_links").mouseenter(function() {
		$("#" + id + "_sub_links").addClass("sub_down")
		$("#" + id + "_sub_links").addClass("hovered")
		if (!$("#" + id + "_sub_links > .sub_links_container").hasClass("sub_links_container_on")) {
			$("#" + id + "_sub_links > .sub_links_container").addClass("sub_links_container_on")
		}
		collapseToolbar()
	})

	$("#" + id + "_sub_links").mouseleave(function() {
		if (!$("#" + id).hasClass("hovered")) {
			$("#" + id + "_sub_links").removeClass("sub_down")
			$("#" + id + "_sub_links > .sub_links_container").removeClass("sub_links_container_on")
		}
		$("#" + id + "_sub_links").removeClass("hovered")
		
	})


	$("#" + id).mouseenter(function() {
		$("#" + id + "_sub_links").addClass("sub_down")
		$("#" + id).addClass("hovered")

		
		if (!$("#" + id + "_sub_links > .sub_links_container").hasClass("sub_links_container_on")) {
			$("#" + id + "_sub_links > .sub_links_container").addClass("sub_links_container_on")
		}
		setTimeout(function() {
			if ($("#" + id).hasClass("hovered")) {
				collapseToolbar()
			}
		}, 200)
	})

	$("#" + id).mouseleave(function() {
		$("#" + id).removeClass("hovered")
			if (!$("#" + id + "_sub_links").hasClass("hovered")) {
				$("#" + id + "_sub_links").removeClass("sub_down")
				$("#" + id + "_sub_links > .sub_links_container").removeClass("sub_links_container_on")
			}
	})

} 

$(document).keypress(function(e) {
    if(e.which == 13) {
        if($(".search_portion").hasClass("search_down")) {
			if (!isSearchEmpty()) {
				search_str = getSearchData()
				window.location.replace(web_host + "search/" + search_str + "/1")
				window.location.href = web_host + "search/" + search_str + "/1"
				return false;
			} 
		}
		else if ($(".bar").hasClass("bar_down")) {
			initiateLogin() 
		}
    }
});

$( window ).scroll(function() {
	curpos = $(window).scrollTop()
	//if (curpos > 210) {
	if (curpos > 190) {
		$(".bar").addClass("bar_up")
		$(".upper_portion").find(".logo").addClass("logo_up")
		$(".upper_portion").find(".logo").on('transitionend webkitTransitionEnd oTransitionEnd', function () {
			$(this).hide()
		});
		$(".mini_logo").show()
		$(".lower_portion").find(".mini_logo").addClass("mini_logo_show")
		//collapseToolbar()
	}
	else {
		$(".bar").removeClass("bar_down");
		$(".bar").removeClass("bar_up")
		$(".upper_portion").find(".logo").show()
		$(".upper_portion").find(".logo").removeClass("logo_up")
		$(".lower_portion").find(".mini_logo").removeClass("mini_logo_show")
		$(".mini_logo").hide()
	}
	checkScrollDirection();
})

function initiateLogin() {
	uid = $("input[name='username']").val()
	pass = $("input[name='password']").val()

	if (uid && pass) {
		$.ajax({
			url: web_host + "src/login.php",
			type: "POST",
			data:{"username":uid, "password":pass}
		}).done(function(data) {
			if (data == "1") {
				location.reload();
			}
			else if (data == "0") {
				$(".warning").find(".alert_text_table").html('<div class="normal_text"> <div class="big">Incorrect username or password, please try again.</div>\
				If you have further issues please contact <a class="small" href="mailto:members@cfmdc.org">members@cfmdc.org</a></div>')
				$(".warning").addClass("warning_up")
			}
			else if (data == "-1") {
				$(".warning").find(".alert_text_table").html('<div class="normal_text"> <div class="big">There was a server error, please try again.</div></div>')
				$(".warning").addClass("warning_up")
			}
		});
	}
}

function isSearchEmpty() {

	// New Aquisition
	new_aquisition_str = ""
	$.each($("input[name='new_aquisition_checkbox_input']:checked"), function(){
		new_aquisition_str = "1"
	})

	if (new_aquisition_str) {
		return false;
	}

	// Celluloid Only
	celluloid_only_str = ""
	$.each($("input[name='celluloid_only_checkbox_input']:checked"), function(){
		celluloid_only_str = "1"
	})

	if (celluloid_only_str) {
		return false;
	}

	// Artist
	if ($("input[name='artist']").val()) {
		return false;
	}


	// Title
	if ($("input[name='title']").val()) {
		return false;
	}

	// Country
	if ($("input[name='country']").val()) {
		return false;
	}

	// Year 
	if ($("input[name='year_begin']").val() || $("input[name='year_end']").val()) {
		return false;
	}

	// Genre
	genre = ""
	$.each($("input[name='search-genre[]']:checked"), function(){
		genre = "1"
	})

	if (genre) {
		return false
	}

	// Category
	category = ""
	$.each($("input[name='search-category[]']:checked"), function(){
		category = "1"
	})

	if (category) {
		return false
	}

	return true;
}

function getSearchData() {

	// New Aquisition
	new_aquisition_str = ""
	$.each($("input[name='new_aquisition_checkbox_input']:checked"), function(){
		new_aquisition_str = "1"
	})

	// Celluloid Only
	celluloid_only_str = ""
	$.each($("input[name='celluloid_only_checkbox_input']:checked"), function(){
		celluloid_only_str = "1"
	})

	// Artist
	artist_str = $("input[name='artist']").val()
	artist_str = artist_str.replace(/([^a-zA-Z\d\s0-9])/g, '\\$1')

	// Title
	title_str = $("input[name='title']").val()
	title_str = title_str.replace(/([^a-zA-Z\d\s0-9])/g, '\\$1')

	// Country
	country_str = $("input[name='country']").val()
	country_str = country_str.replace(/([^a-zA-Z\d\s0-9])/g, '\\$1')

	// Year 
	year_str = ""
	year_begin_str = $("input[name='year_begin']").val()
	year_end_str = $("input[name='year_end']").val()

	if (year_begin_str && year_end_str) {
		year_str = String(year_begin_str) + ".." + String(year_end_str)
	}
	else if (year_begin_str) {
		year_str = String(year_begin_str);
	}
	else if (year_end_str) {
		year_str = String(year_end_str);
	}

	// Genre
	genre_str = ""
	genre_count = 0

	$.each($("input[name='search-genre[]']:checked"), function(){
		genre_count++
		genre_val = $(this).val()
		if (genre_val.match(/^\d+$/)) {
			if (genre_count != 1) {
				genre_str += "(|)"
			}
			genre_str += genre_val
		}
	})

	// Category
	category_str = ""
	category_count = 0

	$.each($("input[name='search-category[]']:checked"), function(){
		category_count++
		category_val = $(this).val()
		if (category_val.match(/^\d+$/)) {
			if (category_count != 1) {
				category_str += "(|)"
			}
			category_str += category_val
		}
	})

	query_str = new_aquisition_str + "(&)" + celluloid_only_str + "(&)" + artist_str + "(&)" + title_str + "(&)" + country_str + "(&)" + year_str + "(&)" + genre_str + "(&)" + category_str
	query_str = encodeURIComponent(query_str)

	return query_str
}

function build_genre_list(genres) {
	ul_str = ""

	for($i=0; $i<genres.length; $i++) {
		li_str = '<li class="search_list_entry_genre">\
					<input type="checkbox" value="' + ($i+1) + '" name="search-genre[]" id="search-genre-' + ($i+1) + '"/>\
					<label for="search-genre-' + ($i+1) + '">' + genres[$i][0] +'</label>\
				</li>'
		ul_str += li_str
	}

	return ul_str
}

function build_category_list(categories) {
	ul_str = ""

	for($i=0; $i<categories.length; $i++) {
		li_str = '<li class="search_list_entry_category">\
					<input type="checkbox" value="' + ($i+1) + '" name="search-category[]" id="search-category-' + ($i+1) + '"/>\
					<label for="search-category-' + ($i+1) + '">' + categories[$i][0] +'</label>\
				</li>'
		ul_str += li_str
	}

	return ul_str
}

function hide_search() {
	$(".search_portion").removeClass("search_down");
	$(".search").removeClass("search_on")
}

function hide_hamburger() {$(".hidden_portion").removeClass("portion_down")}

function hide_signin() {$(".bar").removeClass("bar_down")}

function checkNumerics(obj) {
	obj.on('keyup', '.numeric-only', function(event) {
		v = this.value;
		if($.isNumeric(v) === false) {
				//chop off the last char entered
				this.value = this.value.slice(0,-1);
		}
	});
}

function checkScrollDirection() {
	oldScrollbarPos = newScrollbarPos;
	newScrollbarPos =  $(window).scrollTop();
	if (newScrollbarPos - oldScrollbarPos < 0) {
		isScrollUp = true;
		startingCalcPos = newScrollbarPos;
		if (toolbarCollapsed) {
			expandToolbar();
			toolbarCollapsed = false;
		}
	}
	else {
		isScrollUp = false;
		if ((newScrollbarPos - startingCalcPos > 60) && !toolbarCollapsed) {
			collapseToolbar();
			toolbarCollapsed = true;
		}
	}
}

function collapseToolbar() {
	//$(".bar").removeClass("bar_down");
	//$(".bar").addClass("bar_up")
	
	$(".hidden_portion").removeClass("portion_down");
	$(".search_portion").removeClass("search_down")
	$(".search").removeClass("search_on")

	$(".warning").removeClass("warning_up")
	$(".message").removeClass("message_up")
}

function expandToolbar() {
	if ($(".bar").hasClass("bar_up")) {
		//$(".bar").removeClass("bar_up");
	}
}