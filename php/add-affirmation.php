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
<?php
// MindEase - Add Affirmation
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $affirmation_text = sanitize_input($_POST['affirmation_text']);
    $category = sanitize_input($_POST['category'] ?? 'general');
    
    if (empty($affirmation_text)) {
        json_response(false, 'Affirmation text is required');
    }
    
    // Insert into database
    $sql = "INSERT INTO affirmations (affirmation_text, category, is_default) 
            VALUES ('$affirmation_text', '$category', 0)";
    
    if (mysqli_query($conn, $sql)) {
        json_response(true, 'Affirmation added successfully', [
            'id' => mysqli_insert_id($conn)
        ]);
    } else {
        json_response(false, 'Failed to add affirmation: ' . mysqli_error($conn));
    }
} else {
    json_response(false, 'Invalid request method');
}
?>