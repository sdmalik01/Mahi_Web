<?php
require_once 'config.php';
if (!is_admin_logged_in()) redirect('../admin-login.html');

$id = intval($_POST['id'] ?? 0);

if ($id > 0) {
    $query = "DELETE FROM affirmations WHERE id=$id";
    if (mysqli_query($conn, $query)) {
        json_response(true, 'Affirmation deleted successfully');
    } else {
        json_response(false, 'Error deleting affirmation');
    }
} else {
    json_response(false, 'Invalid affirmation ID');
}
?>
