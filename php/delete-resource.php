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
