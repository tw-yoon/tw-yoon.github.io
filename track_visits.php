<?php
$ip = $_SERVER['REMOTE_ADDR'];
$filename = 'visits.txt';

$visits = file_exists($filename) ? json_decode(file_get_contents($filename), true) : [];

if (isset($visits[$ip])) {
    $visits[$ip]++;
} else {
    $visits[$ip] = 1;
}

file_put_contents($filename, json_encode($visits));

header('Content-Type: application/json');
echo json_encode(['visits' => $visits[$ip]]);
?>