<?php
require_once 'config.php';

if (!is_admin_logged_in()) redirect('../admin-login.html');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $text = sanitize_input($_POST['text'] ?? '');

    if (!empty($text)) {
        $query = "INSERT INTO affirmations (text, created_at) VALUES ('$text', NOW())";
        if (mysqli_query($conn, $query)) {
            json_response(true, 'Affirmation added successfully');
        } else {
            json_response(false, 'Database error: ' . mysqli_error($conn));
        }
    } else {
        json_response(false, 'Affirmation text cannot be empty');
    }
}
?>
