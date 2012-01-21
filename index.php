<?phpre_once '../facebook/facebook.php';
$config = array(
    'appId' => '202513166510526',
    'secret' => '2f793b5487c32bc7a455fe9bec6b54f1'
);

$fb = new Facebook( $config );

$user_id = $fb->getUser();
$params = array (
    'scope' => ' user_likes, friends_likes, read_stream',
    'redirect' => 'http://apps.facebook.com/Gtest'
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

