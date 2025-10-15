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
<?php
// MindEase - Add Resource
require_once 'config.php';

if (!is_admin_logged_in()) {
    json_response(false, 'Unauthorized');
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = sanitize_input($_POST['title']);
    $type = sanitize_input($_POST['type']);
    $description = sanitize_input($_POST['description']);
    $url = sanitize_input($_POST['url']);
    
    if (empty($title) || empty($type) || empty($description) || empty($url)) {
        json_response(false, 'All fields are required');
    }
    
    if (!in_array($type, ['article', 'video'])) {
        json_response(false, 'Invalid resource type');
    }
    
    // Insert into database
    $sql = "INSERT INTO resources (title, type, description, url) 
            VALUES ('$title', '$type', '$description', '$url')";
    
    if (mysqli_query($conn, $sql)) {
        json_response(true, 'Resource added successfully', [
            'id' => mysqli_insert_id($conn)
        ]);
    } else {
        json_response(false, 'Failed to add resource: ' . mysqli_error($conn));
    }
} else {
    json_response(false, 'Invalid request method');
}
?>