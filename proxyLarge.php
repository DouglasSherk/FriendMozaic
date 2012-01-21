<?php
$url = urldecode($_GET['url']);
header('Content-Type: image/jpeg');
echo(file_get_contents($url));
