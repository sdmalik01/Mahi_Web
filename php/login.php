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
