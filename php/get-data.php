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
<?php
// MindEase - Get Data (Universal data fetcher)
require_once 'config.php';

if (!isset($_GET['type'])) {
    json_response(false, 'Type parameter is required');
}

$type = $_GET['type'];

switch ($type) {
    case 'affirmations':
        $sql = "SELECT * FROM affirmations ORDER BY created_at DESC";
        $result = mysqli_query($conn, $sql);
        
        if ($result) {
            $data = [];
            while ($row = mysqli_fetch_assoc($result)) {
                $data[] = $row;
            }
            json_response(true, 'Affirmations fetched successfully', $data);
        } else {
            json_response(false, 'Failed to fetch affirmations');
        }
        break;
    
    case 'resources':
        $sql = "SELECT * FROM resources ORDER BY created_at DESC";
        $result = mysqli_query($conn, $sql);
        
        if ($result) {
            $data = [];
            while ($row = mysqli_fetch_assoc($result)) {
                $data[] = $row;
            }
            json_response(true, 'Resources fetched successfully', $data);
        } else {
            json_response(false, 'Failed to fetch resources');
        }
        break;
    
    case 'feedback':
        if (!is_admin_logged_in()) {
            json_response(false, 'Unauthorized');
        }
        
        $sql = "SELECT * FROM feedback ORDER BY submitted_at DESC";
        $result = mysqli_query($conn, $sql);
        
        if ($result) {
            $data = [];
            while ($row = mysqli_fetch_assoc($result)) {
                $data[] = $row;
            }
            json_response(true, 'Feedback fetched successfully', $data);
        } else {
            json_response(false, 'Failed to fetch feedback');
        }
        break;
    
    case 'stats':
        if (!is_admin_logged_in()) {
            json_response(false, 'Unauthorized');
        }
        
        // Get counts
        $affirmations_count = mysqli_fetch_assoc(mysqli_query($conn, "SELECT COUNT(*) as count FROM affirmations"))['count'];
        $resources_count = mysqli_fetch_assoc(mysqli_query($conn, "SELECT COUNT(*) as count FROM resources"))['count'];
        $feedback_count = mysqli_fetch_assoc(mysqli_query($conn, "SELECT COUNT(*) as count FROM feedback"))['count'];
        $favorites_count = mysqli_fetch_assoc(mysqli_query($conn, "SELECT COUNT(*) as count FROM favorites"))['count'];
        
        json_response(true, 'Stats fetched successfully', [
            'affirmations' => $affirmations_count,
            'resources' => $resources_count,
            'feedback' => $feedback_count,
            'favorites' => $favorites_count
        ]);
        break;
    
    default:
        json_response(false, 'Invalid type parameter');
}
?>