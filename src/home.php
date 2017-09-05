<!-- <link rel="stylesheet" type="text/css" href="addons/flickity.min.css">
<script src="addons/flickity.pkgd.min.js"
        type="text/javascript"></script> -->

<link rel="stylesheet" href="https://unpkg.com/flickity@2/dist/flickity.min.css">
<script src="https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js"></script>

<?php



require 'src/featured_film.php';
require 'src/facebook.php';
require 'src/news_json.php';
require 'src/recent_aquisitions_json.php';

$featured_film_json = getFeaturedFilmsJson();
$facebook_json = getFacebookPosts();
$news_json = getAllNews();
$recent_aquisitions_json = getRecentAquisitions();

if(session_status()==1) {
    @session_start();
}

?>


<link rel="stylesheet" type="text/css" href="css/home.css">

<script type="text/javascript">
message = '<?= $_SESSION["message"] ?>';
warning = '<?= $_SESSION["warning"] ?>';
<?php
unset($_SESSION["message"]);
unset($_SESSION["warning"]);
?>

featured_film_json = JSON.parse('<?php echo addslashes($featured_film_json); ?>')
facebook_json = JSON.parse('<?php echo addslashes($facebook_json); ?>')
news_json = JSON.parse('<?php echo addslashes($news_json); ?>')
recent_aquisitions_json = JSON.parse('<?php echo addslashes($recent_aquisitions_json); ?>')

</script>


<script src="js/home.js" type="text/javascript"></script>
<script type="application/ld+json">
{
  "@context": "http://schema.org",
  "@type": "Organization",
  "url": "http://testing.cfmdc.org",
  "alternateName": "Canadian Filmmakers Distribution Centre",
  "description": "Established in 1967, CFMDC is a not-for-profit, artist-run centre that has since grown and evolved into a world-renowned distributor of independent media art. Now in our 50th year, with 3700+ films in our catalogue by over 1000 members, CFMDC is one of the most enduring, respected, forward thinking, and engaged, distribution centres in Canada."
}
</script>
<script type="application/ld+json">
{
  "@context": "http://schema.org",
  "@type": "WebPage",
  "url": "http://testing.cfmdc.org",
  "name": "Canadian Filmmakers Distribution Centre",
  "description": "Established in 1967, CFMDC is a not-for-profit, artist-run centre that has since grown and evolved into a world-renowned distributor of independent media art. Now in our 50th year, with 3700+ films in our catalogue by over 1000 members, CFMDC is one of the most enduring, respected, forward thinking, and engaged, distribution centres in Canada.",
  "keywords": "401 Richmond, Canadian Filmmakers Distribution Centre, Film, Canadian, Filmmakers, Distribution, Canadian Film, CFMDC, Canadian Filmmakers Distribution, Canadian Film Distribution, Canadian Distribution, Filmmakers Distribution ",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement":
    [
        {
                "@type": "ListItem",
                "position": 1,
                "item":
                {
                "@id": "http://www.testing.cfmdc.org/filmsfortheclassroom/",
                "name": "Educators"
                }
        },
        {
                "@type": "ListItem",
                "position": 2,
                "item":
                {
                "@id": "http://www.testing.cfmdc.org/previews/",
                "name": "Sales + Rentals"
                }
        },
        {
                "@type": "ListItem",
                "position": 3,
                "item":
                {
                "@id": "http://www.testing.cfmdc.org/faq/",
                "name": "Submit Film"
                }
        },
        {
                "@type": "ListItem",
                "position": 4,
                "item":
                {
                "@id": "http://www.testing.cfmdc.org/artistindex/",
                "name": "Catalogue"
                }
        },
        {
                "@type": "ListItem",
                "position": 4,
                "item":
                {
                "@id": "http://www.testing.cfmdc.org/contact/",
                "name": "Contact"
                }
        },
        {
                "@type": "ListItem",
                "position": 5,
                "item":
                {
                "@id": "http://www.testing.cfmdc.org/staffboard/",
                "name": "Staff + Board"
                }
        },
        {
                "@type": "ListItem",
                "position": 6,
                "item":
                {
                "@id": "http://www.testing.cfmdc.org/about/",
                "name": "About"
                }
        },
        {
                "@type": "ListItem",
                "position": 7,
                "item":
                {
                "@id": "http://www.testing.cfmdc.org/links/",
                "name": "Links"
                }
        }
    ]
  } 
}
</script>