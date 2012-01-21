<?php
$uid = $_GET['uid'];
header('Content-Type: image/jpeg');
echo(file_get_contents(
    "https://graph.facebook.com/" .
    $uid .
    "/picture?type=square"
));
