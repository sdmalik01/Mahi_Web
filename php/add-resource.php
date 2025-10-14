<?php
require_once 'config.php';
if (!is_admin_logged_in()) redirect('../admin-login.html');

$title = sanitize_input($_POST['title'] ?? '');
$link = sanitize_input($_POST['link'] ?? '');
$type = sanitize_input($_POST['type'] ?? 'article');

if ($title && $link) {
    $query = "INSERT INTO resources (title, link, type, created_at) VALUES ('$title', '$link', '$type', NOW())";
    if (mysqli_query($conn, $query)) {
        json_response(true, 'Resource added successfully');
    } else {
        json_response(false, 'Database error: ' . mysqli_error($conn));
    }
} else {
    json_response(false, 'Title and link are required');
}
?>
