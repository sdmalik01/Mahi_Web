<?php
require_once 'config.php';
if (!is_admin_logged_in()) redirect('../admin-login.html');

$data = [];

$data['affirmations'] = [];
$res = mysqli_query($conn, "SELECT * FROM affirmations ORDER BY id DESC");
while ($row = mysqli_fetch_assoc($res)) $data['affirmations'][] = $row;

$data['resources'] = [];
$res = mysqli_query($conn, "SELECT * FROM resources ORDER BY id DESC");
while ($row = mysqli_fetch_assoc($res)) $data['resources'][] = $row;

$data['feedback'] = [];
$res = mysqli_query($conn, "SELECT * FROM feedback ORDER BY id DESC");
while ($row = mysqli_fetch_assoc($res)) $data['feedback'][] = $row;

json_response(true, 'Data fetched successfully', $data);
?>
