<?phpre_once '../facebook/facebook.php';
$config = array(
    'appId' => '158930817550508',
    'secret' => '8f75e17d055f03747eb4741e50dac9dd'
);

$fb = new Facebook( $config );

$user_id = $fb->getUser();
$params = array (
    'scope' => ' user_likes, friends_likes, read_stream',
    'redirect' => 'http://apps.facebook.com/MosaicX'
);

if ($user_id){
    print '<pre>';
    print_r($fb->api('/me'));
    print_r($fb->api('/me/likes'));
    print_r($fb->api('/me/122613185/likes'));
    print '<pre>';
} else {
    header('Location: ' . $fb->getLoginUrl($params));
}
?>

