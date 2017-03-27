
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

// API Routes
$router->map('GET','/api/[*:key]/[*:name]/', 'src/json.php', 'api');
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