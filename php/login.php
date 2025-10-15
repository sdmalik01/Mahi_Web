<?php
require_once 'config.php';

// Admin Login
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = sanitize_input($_POST['username'] ?? '');
    $password = sanitize_input($_POST['password'] ?? '');

    $query = "SELECT * FROM users WHERE username='$username' LIMIT 1";
    $result = mysqli_query($conn, $query);

    if ($result && mysqli_num_rows($result) === 1) {
        $user = mysqli_fetch_assoc($result);
        if (password_verify($password, $user['password'])) {
            $_SESSION['admin_logged_in'] = true;
            $_SESSION['admin_user'] = $user['username'];
            redirect('../admin-dashboard.html');
        } else {
            redirect('../admin-login.html?error=Invalid Password');
        }
    } else {
        redirect('../admin-login.html?error=User Not Found');
    }
}
?>
<?php
// MindEase - Admin Login Handler
require_once 'config.php';

// Check if checking login status
if (isset($_GET['check'])) {
    json_response(true, 'Status checked', ['logged_in' => is_admin_logged_in()]);
}

// Handle login request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = sanitize_input($_POST['username']);
    $password = $_POST['password'];
    
    if (empty($username) || empty($password)) {
        json_response(false, 'Username and password are required');
    }
    
    // Query database
    $sql = "SELECT * FROM users WHERE username = '$username' LIMIT 1";
    $result = mysqli_query($conn, $sql);
    
    if ($result && mysqli_num_rows($result) > 0) {
        $user = mysqli_fetch_assoc($result);
        
        // Verify password
        if (password_verify($password, $user['password'])) {
            $_SESSION['admin_logged_in'] = true;
            $_SESSION['admin_id'] = $user['id'];
            $_SESSION['admin_username'] = $user['username'];
            
            json_response(true, 'Login successful');
        } else {
            json_response(false, 'Invalid username or password');
        }
    } else {
        json_response(false, 'Invalid username or password');
    }
}
?>