
<?php
//header("Content-Type: text/html");

$web_host = "http://s219085.gridserver.com/";

require 'addons/AltoRouter.php';
$router = new AltoRouter();
$router->setBasePath('');
/* Setup the URL routing. This is production ready. */

// Main routes that non-customers see
$router->map('GET','/', 'src/home.php', 'home');
$router->map('GET','/home/', 'src/home.php', 'home-home');

// Films accessed by film_id number
$router->map('GET','/film/[*:film_id]/','src/film.php','film');
$router->map('GET','/film/[*:film_id]','src/film.php','film-film');

// Filmmakers accessed by filmmaker_id number
$router->map('GET','/filmmaker/[*:filmmaker_id]/','src/filmmaker.php','filmmaker');
$router->map('GET','/filmmaker/[*:filmmaker_id]','src/filmmaker.php','filmmaker-filmmaker');

// Search
$router->map('GET','/search/[*:query]/[*:page]', 'src/search.php', 'search_with_page');
$router->map('GET','/search/[*:query]/[*:page]/', 'src/search.php', 'search_with_page-search_with_page');

// Artist Index
$router->map('GET','/artistindex/[*:alpha]', 'src/artist_index.php', 'artist_index');
$router->map('GET','/artistindex/[*:alpha]/', 'src/artist_index.php', 'artist_index_artist_index');
$router->map('GET','/artistindex', 'src/artist_index.php', 'artist_index_empty');
$router->map('GET','/artistindex/', 'src/artist_index.php', 'artist_index_empty_artist_index_empty');

// Request Account
$router->map('GET','/requestaccount', 'src/request_account.php', 'request_account');
$router->map('GET','/requestaccount/', 'src/request_account.php', 'request_account_request_account');

// Forgot Password
$router->map('GET','/forgotpassword', 'src/forgot_password.php', 'forgot_password');
$router->map('GET','/forgotpassword/', 'src/forgot_password.php', 'forgot_password_forgot_password');

// Compilations Main Page
$router->map('GET','/compilations', 'src/compilations.php', 'compilations');
$router->map('GET','/compilations/', 'src/compilations.php', 'compilations_compilations');

// Compilations Individual Page
$router->map('GET','/compilations/[*:nid]', 'src/compilations_nid.php', 'compilations_nid');
$router->map('GET','/compilations/[*:nid]/', 'src/compilations_nid.php', 'compilations_nid_compilations_nid');

// News Page
$router->map('GET','/news/[*:nid]', 'src/news.php', 'news');
$router->map('GET','/news/[*:nid]/', 'src/news.php', 'news_news');

// Links Page
$router->map('GET','/links', 'src/links.php', 'links');
$router->map('GET','/links/', 'src/links.php', 'links_links');

// Staff + Board Page
$router->map('GET','/staffboard', 'src/staffboard.php', 'staffboard');
$router->map('GET','/staffboard/', 'src/staffboard.php', 'staffboard_staffboard');

// About Page
$router->map('GET','/about', 'src/about.php', 'about');
$router->map('GET','/about/', 'src/about.php', 'about_about');

// Contact Page
$router->map('GET','/contact', 'src/contact.php', 'contact');
$router->map('GET','/contact/', 'src/contact.php', 'contact_contact');

// FAQ Page
$router->map('GET','/faq', 'src/faq.php', 'faq');
$router->map('GET','/faq/', 'src/faq.php', 'faq_faq');

// Submit Now Page
$router->map('GET','/submitnow', 'src/submitnow.php', 'submitnow');
$router->map('GET','/submitnow/', 'src/submitnow.php', 'submitnow_submitnow');

// Previews Page
$router->map('GET','/previews', 'src/previews.php', 'previews');
$router->map('GET','/previews/', 'src/previews.php', 'previews_previews');

// Fee Schedule Page
$router->map('GET','/feeschedule', 'src/feeschedule.php', 'feeschedule');
$router->map('GET','/feeschedule/', 'src/feeschedule.php', 'feeschedule_feeschedule');

// Rent a Film Page
$router->map('GET','/rentafilm', 'src/rentafilm.php', 'rentafilm');
$router->map('GET','/rentafilm/', 'src/rentafilm.php', 'rentafilm_rentafilm');

// RENTAL SHIPPING/RETURNS Page
$router->map('GET','/rentalshippingreturns', 'src/rentalshippingreturns.php', 'rentalshippingreturns');
$router->map('GET','/rentalshippingreturns/', 'src/rentalshippingreturns.php', 'rentalshippingreturns_rentalshippingreturns');

// Buy a Film Page
$router->map('GET','/buyafilm', 'src/buyafilm.php', 'buyafilm');
$router->map('GET','/buyafilm/', 'src/buyafilm.php', 'buyafilm_buyafilm');

// EDUCATIONAL SERVICES Page
$router->map('GET','/educationalservices', 'src/educationalservices.php', 'educationalservices');
$router->map('GET','/educationalservices/', 'src/educationalservices.php', 'educationalservices_educationalservices');

// Buy a Film Page
$router->map('GET','/studyguides', 'src/studyguides.php', 'studyguides');
$router->map('GET','/studyguides/', 'src/studyguides.php', 'studyguides_studyguides');

// Compilations Main Page
$router->map('GET','/filmsfortheclassroom', 'src/filmsfortheclassroom.php', 'filmsfortheclassroom');
$router->map('GET','/filmsfortheclassroom/', 'src/filmsfortheclassroom.php', 'filmsfortheclassroom_filmsfortheclassroom');

// Compilations Individual Page
$router->map('GET','/filmsfortheclassroom/[*:nid]', 'src/filmsfortheclassroom_nid.php', 'filmsfortheclassroom_nid');
$router->map('GET','/filmsfortheclassroom/[*:nid]/', 'src/filmsfortheclassroom_nid.php', 'filmsfortheclassroom_nid_filmsfortheclassroom_nid');

// API Routes
//$router->map('GET','/api/[*:key]/[*:name]/', 'src/json.php', 'api');
/* Match the current request */
$match = $router->match();

if($match) {
  if(session_status()==1) {
    @session_start();  
  }
  if(!isset($_SESSION['loggedin'])) {
    $_SESSION['loggedin'] = 0;
  }

  //session_destroy();

	require 'src/header.php';
	//require 'src/toolbar.php';
  require $match['target'];
  require 'src/footer.php';
}

else {
  //header("HTTP/1.0 404 Not Found");
  require 'src/404.html';
}
?>