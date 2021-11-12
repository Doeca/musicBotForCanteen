<?php
include 'cookie.php';
require 'vendor/autoload.php';
use Metowolf\Meting;


$type = addslashes($_GET['type']); //netease tencent
$songid = addslashes($_GET['id']);
if($songid == '') die('[]');

$api = new Meting($type);
$api->cookie(getCookie($type));

// Get data
$data = $api->format(true)->search('Soldier', [
    'page' => 1,
    'limit' => 50
]);

echo $data;
// [{"id":35847388,"name":"Hello","artist":["Adele"],"album":"Hello","pic_id":"1407374890649284","url_id":35847388,"lyric_id":35847388,"source":"netease"},{"id":33211676,"name":"Hello","artist":["OMFG"],"album":"Hello",...

// Parse link
$data = $api->format(true)->url(35847388);

echo $data;
// {"url":"http:\/\/...","size":4729252,"br":128}