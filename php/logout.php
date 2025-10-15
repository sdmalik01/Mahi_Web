<?php
require_once 'config.php';
session_destroy();
redirect('../admin-login.html');
?>
<?php
// MindEase - Logout Handler
require_once 'config.php';

// Destroy session
session_destroy();

// Redirect to login page
redirect('../admin-login.html');
?>