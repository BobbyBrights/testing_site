<?php

define ('SITE_ROOT', realpath(dirname(getcwd())));

$host = "http://www.testing.cfmdc.org/";

// $target_file = $target_dir . guidv4(openssl_random_pseudo_bytes(16)) . ".jpg";

// move_uploaded_file($_FILES["film-still-file_1"]["tmp_name"], $target_file);

echo $target_dir;

if(session_status()==1) {
    @session_start();
}

if ($_SESSION['loggedin']) {
	$client_id = $_SESSION['client_id'];
}
else {
	$client_id = -1;
}

// --- request info ---

$firstname = $_POST['firstname'];
$lastname = $_POST['lastname'];
$address = $_POST['address'];
$city_town = $_POST['city_town'];
$country = $_POST['country_'];
$association = $_POST['organization'];
$province_state = $_POST['province_state'];
$postal_code = $_POST['postal_code'];
$phone = $_POST['phone'];
$email = $_POST['email'];

// --- form(s) ---

$number_of_forms = (int) $_POST['form_count'];

// here loading up files






// print_r($_POST['search-org-format_1']);

//echo(implode(',', $_POST['search-org-format_1']));

//echo guidv4(openssl_random_pseudo_bytes(16));


$outcome = 0;

if (isCorrectCaptcha($_POST)) {
    $servername = "external-db.s220335.gridserver.com";
    $username = "db220335";
    $password = "XQ245_Qfhuz";
    $database = "db220335_cfmdc";

    $mysqli = new mysqli($servername, $username, $password, $database);

    if ($mysqli->connect_errno) {
        $outcome = 0;
    }
    else {
    	$stmt = $mysqli->prepare("INSERT INTO `film_submission_request`(`firstname`, `lastname`, `association_with_film`, `phone_number`, `email`, `address`, `province_state`, `country`, `postal_code_zip_code`, `city_town`, `client_id`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssssssssi",$firstname,$lastname,$association,$phone,$email,$address,$province_state,$country,$postal_code,$city_town,$client_id);

        $stmt->execute();

        $current_id = $mysqli->insert_id;

        $count = $stmt->affected_rows;

        if ($count != 1) {
            return $outcome;
            $stmt->close();
        	$mysqli->close();
        }

        $stmt = $mysqli->prepare("INSERT INTO `film_submission`(`cid`, `film_title`, `length`, `year`, `country`, `language`, `colour`, `sound`, `synopsis`, `firstname`, `lastname`, `email`, `bio`, `secondary_filmmaker`, `self_identification`, `screening_history_link`, `web_still_link`, `preview_format`, `original_format`, `exhibition_format`, `genre`, `keywords`, `copyright`, `vimeo_link`, `vimeo_password`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        
		for ($i=1; $i<=$number_of_forms; $i++) {

			//upload files --> get url links

			$target_dir = SITE_ROOT . "/upload/";

			// web still
			$target_filename = guidv4(openssl_random_pseudo_bytes(16)) . ".jpg";
			$target_file = $target_dir . $target_filename ;
			move_uploaded_file($_FILES["film-still-file_" . $i]["tmp_name"], $target_file);

			$web_still_link = $host . "upload/" . $target_filename;

			// screening history
			if ($_FILES["film-screening-history-file_" . $i]["size"] > 0) {
				$target_filename = guidv4(openssl_random_pseudo_bytes(16)) . ".pdf";
				$target_file = $target_dir . $target_filename ;
				move_uploaded_file($_FILES["film-screening-history-file_" . $i]["tmp_name"], $target_file);

				$screening_history_link = $host . "upload/" . $target_filename;
			}
			else {
				$screening_history_link = "";
			}

			// copyright
			if ($_POST["rights_" . $i] == 'yes') {
				$copyright = 1;
			}
			else {
				$copyright = 0;
			}

			$film_title = $_POST["film_title_" . $i];
			$length = $_POST["length_" . $i];
			$year = $_POST["year_" . $i];
			$country = $_POST["country_" . $i];
			$language = $_POST["language_" . $i];
			$colour = $_POST["colour_" . $i];
			$sound = $_POST["sound_" . $i];
			$synopsis = $_POST["film_synopsis_" . $i];

			if ($i > 1 && $_POST["filmmaker_info_" . $i] == "yes") {
				$firstname = $_POST["filmmakers_firstname_1"];
				$lastname = $_POST["filmmakers_lastname_1"];
				$email = $_POST["filmmakers_email_1"];
				$bio = $_POST["filmmakers_bio_1"];
				$secondary_filmmaker = $_POST["sec_filmmakers_name_1"];
			}
			else {
				$firstname = $_POST["filmmakers_firstname_" . $i];
				$lastname = $_POST["filmmakers_lastname_" . $i];
				$email = $_POST["filmmakers_email_" . $i];
				$bio = $_POST["filmmakers_bio_" . $i];
				$secondary_filmmaker = $_POST["sec_filmmakers_name_" . $i];
			}

			$self_identification = $_POST["self_identification_" . $i];
			$preview_format = $_POST["preview_format_" . $i];
			$original_format = implode(',', $_POST['search-org-format_' . $i]);
			$exhibition_format = implode(',', $_POST['search-ex-format_' . $i]);
			$genre = implode(',', $_POST['search-genre_' . $i]);
			$keywords = implode(',', $_POST['search-category_' . $i]);
			$vimeo_link = $_POST["vimeo_link_" . $i];
			$vimeo_password = $_POST["vimeo_password_" . $i];

			$stmt->bind_param("isssssssssssssssssssssiss", $current_id, $film_title, $length, $year, $country, $language, $colour, $sound, $synopsis, $firstname, $lastname, $email, $bio, $secondary_filmmaker, $self_identification, $screening_history_link, $web_still_link, $preview_format, $original_format, $exhibition_format, $genre, $keywords, $copyright, $vimeo_link, $vimeo_password);

			$stmt->execute();
		}

        $stmt->close();
        $mysqli->close();

    }
}

function guidv4($data)
{
    assert(strlen($data) == 16);

    $data[6] = chr(ord($data[6]) & 0x0f | 0x40); // set version to 0100
    $data[8] = chr(ord($data[8]) & 0x3f | 0x80); // set bits 6-7 to 10

    return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
}

function isCorrectCaptcha($postvar) {
    $url = 'https://www.google.com/recaptcha/api/siteverify';
    $secret = "6LemsxcUAAAAAK8i2Iv2ZcCjzlggw1IkGuS-e8CO";
    $captcha = $postvar['g-recaptcha-response'];
    $myvars = 'secret=' . $secret . '&response=' . $captcha;

    $ch = curl_init( $url );
    curl_setopt( $ch, CURLOPT_POST, 1);
    curl_setopt( $ch, CURLOPT_POSTFIELDS, $myvars);
    curl_setopt( $ch, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt( $ch, CURLOPT_HEADER, 0);
    curl_setopt( $ch, CURLOPT_RETURNTRANSFER, 1);

    $response = curl_exec( $ch );

    $s = json_decode($response);

    return $s->success;
}

?>