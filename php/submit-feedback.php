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
<?php
// MindEase - Submit Feedback
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = sanitize_input($_POST['name']);
    $email = sanitize_input($_POST['email']);
    $message = sanitize_input($_POST['message']);
    
    if (empty($name) || empty($email) || empty($message)) {
        json_response(false, 'All fields are required');
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        json_response(false, 'Invalid email address');
    }
    
    // Insert into database
    $sql = "INSERT INTO feedback (name, email, message, status) 
            VALUES ('$name', '$email', '$message', 'new')";
    
    if (mysqli_query($conn, $sql)) {
        json_response(true, 'Feedback submitted successfully', [
            'id' => mysqli_insert_id($conn)
        ]);
    } else {
        json_response(false, 'Failed to submit feedback: ' . mysqli_error($conn));
    }
} else {
    json_response(false, 'Invalid request method');
}
?>