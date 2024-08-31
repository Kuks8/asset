<?php

require 'UserModel.php';
require 'AuthController.php';
require 'database.php';

$model = new UserModel($db);
$controller = new AuthController($model);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];
    $otp = $_POST['otp'];

    $result = $controller->verifyOTP($email, $password, $otp);

    if ($result['status'] == 'success') {
        header('Location: dashboard.php');
    } else {
        $status = 'error';
        $message = $result['message'];
        include 'view/login.php';
    }
}
