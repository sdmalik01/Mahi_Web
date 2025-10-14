<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = sanitize_input($_POST['name'] ?? '');
    $email = sanitize_input($_POST['email'] ?? '');
    $message = sanitize_input($_POST['message'] ?? '');

    if ($name && $email && $message) {
        $query = "INSERT INTO feedback (name, email, message, created_at)
                  VALUES ('$name', '$email', '$message', NOW())";
        if (mysqli_query($conn, $query)) {
            json_response(true, 'Thank you for your feedback!');
        } else {
            json_response(false, 'Database error: ' . mysqli_error($conn));
        }
    } else {
        json_response(false, 'All fields are required.');
    }
}
?>
