<?php
/**
 * Simple PHP Subscriber Handler
 * Saves subscriber emails to subscribers.csv safely
 */

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
    exit;
}

// Get POST email (works for both standard form POST and FormData AJAX)
$email = isset($_POST['email']) ? trim($_POST['email']) : '';

if (empty($email)) {
    // Fallback for raw JSON payload
    $rawInput = json_decode(file_get_contents('php://input'), true);
    if (isset($rawInput['email'])) {
        $email = trim($rawInput['email']);
    }
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Please enter a valid email address.']);
    exit;
}

$file = __DIR__ . '/subscribers.csv';
$timestamp = date('Y-m-d H:i:s');
$userIp = $_SERVER['REMOTE_ADDR'] ?? 'UNKNOWN';

$fileExisted = file_exists($file);
$handle = @fopen($file, 'a');

if ($handle) {
    if (!$fileExisted) {
        fputcsv($handle, ['Date & Time', 'Email Address', 'IP Address']);
    }
    fputcsv($handle, [$timestamp, $email, $userIp]);
    fclose($handle);

    echo json_encode([
        'success' => true, 
        'message' => 'Thank you! Your email has been registered for early access.'
    ]);
} else {
    echo json_encode([
        'success' => false, 
        'message' => 'Unable to save subscription. File permission error.'
    ]);
}
