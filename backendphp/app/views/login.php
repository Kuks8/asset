<?php if ($status == 'otp_sent'): ?>
    <form method="post" action="verify_otp.php">
        <input type="hidden" name="email" value="<?= $email ?>">
        <input type="hidden" name="password" value="<?= $password ?>">
        <label for="otp">Enter OTP:</label>
        <input type="text" id="otp" name="otp" required>
        <button type="submit">Verify OTP</button>
    </form>
<?php else: ?>
    <form method="post" action="login.php">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
        <button type="submit">Login</button>
    </form>
<?php endif; ?>

<?php if (isset($message)): ?>
    <p><?= $message ?></p>
<?php endif; ?>
