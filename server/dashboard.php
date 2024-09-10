<?php

session_start();

if (!isset($_SESSION['user_id'])) {
    header('Location: login.php');
    exit();
}

// Fetch user details and display the dashboard
echo "Welcome to your dashboard!";
