<?php
function getFacebookPosts() {
  require "php-graph-sdk-5.0.0/src/Facebook/autoload.php";

  $fb = new Facebook\Facebook([
    'app_id' => '606132946084851',
    'app_secret' => 'fdf53899f5c1c9917fe4f06d4516c8af',
    'default_graph_version' => 'v2.3',
  ]);

  $token_obj = file_get_contents('https://graph.facebook.com/oauth/access_token?client_id=606132946084851&client_secret=fdf53899f5c1c9917fe4f06d4516c8af&grant_type=client_credentials');
  $token_arr = json_decode($token_obj);
  $token = $token_arr->access_token;

  $fb->setDefaultAccessToken($token);

  try {
    $response = $fb->get('/cfmdcfilm?fields=posts.limit(35){id,full_picture,message,name}');
  } catch(Facebook\Exceptions\FacebookSDKException $e) {
    echo $e;
    exit;
  }

  $postsArray = $response->getDecodedBody();

  return utf8_decode(json_encode(utf8ize($postsArray), JSON_UNESCAPED_UNICODE));
}


?>