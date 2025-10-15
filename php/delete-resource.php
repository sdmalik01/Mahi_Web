<?php
require_once 'config.php';
if (!is_admin_logged_in()) redirect('../admin-login.html');

$id = intval($_POST['id'] ?? 0);

if ($id > 0) {
    $query = "DELETE FROM resources WHERE id=$id";
    if (mysqli_query($conn, $query)) {
        json_response(true, 'Resource deleted successfully');
    } else {
        json_response(false, 'Error deleting resource');
    }
} else {
    json_response(false, 'Invalid resource ID');
}
?>
<?php
// MindEase - Delete Resource
require_once 'config.php';

if (!is_admin_logged_in()) {
    json_response(false, 'Unauthorized');
}

if (isset($_GET['id'])) {
    $id = intval($_GET['id']);
    
    // Delete from database
    $sql = "DELETE FROM resources WHERE id = $id";
    
    if (mysqli_query($conn, $sql)) {
        json_response(true, 'Resource deleted successfully');
    } else {
        json_response(false, 'Failed to delete resource: ' . mysqli_error($conn));
    }
} else {
    json_response(false, 'ID parameter is required');
}
?>