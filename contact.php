<?php

declare(strict_types=1);

ini_set('display_errors', '0');
error_reporting(E_ALL);

$successMessage = 'Thank you — your request was sent to Rarog Group. The team will review it and respond by email.';
$sendErrorMessage = 'We could not send your request right now. Please email Rarog Group directly at support@rarogads.com.';
$validationErrorMessage = 'Please complete the required fields and confirm the privacy consent before submitting.';

header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(false, $sendErrorMessage, 405);
}

$name = sanitizeInput($_POST['fullName'] ?? $_POST['name'] ?? '', 120);
$email = sanitizeEmail($_POST['email'] ?? $_POST['emailAddress'] ?? '');
$phone = sanitizeInput($_POST['phone'] ?? $_POST['phoneNumber'] ?? '', 60);
$service = sanitizeInput($_POST['service'] ?? $_POST['selectedService'] ?? '', 120);
$message = sanitizeInput($_POST['message'] ?? '', 3000);
$sourcePage = sanitizeInput($_POST['sourcePage'] ?? 'Website contact form', 180);
$honeypot = sanitizeInput($_POST['companyWebsite'] ?? '', 240);
$privacyConsent = !empty($_POST['privacyConsent']) || !empty($_POST['policyConsent']);

if ($honeypot !== '') {
    respond(true, $successMessage);
}

if ($name === '' || $email === '' || $message === '' || $privacyConsent === false) {
    respond(false, $validationErrorMessage, 422);
}

if (filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
    respond(false, $validationErrorMessage, 422);
}

$recipient = 'support@rarogads.com';
$subject = 'New website inquiry from Rarog Group website';
$fromEmail = getenv('RAROG_MAIL_FROM') ?: 'no-reply@rarogads.com';
$replyTo = safeHeaderValue($email);
$safeName = safeHeaderValue($name);
$ipAddress = sanitizeInput($_SERVER['REMOTE_ADDR'] ?? 'Unavailable', 120);
$submittedAt = gmdate('Y-m-d H:i:s') . ' UTC';

$bodyLines = [
    'New website inquiry from rarogads.com',
    '',
    'Name: ' . ($name !== '' ? $name : 'Not provided'),
    'Email: ' . ($email !== '' ? $email : 'Not provided'),
    'Phone: ' . ($phone !== '' ? $phone : 'Not provided'),
    'Selected service: ' . ($service !== '' ? $service : 'Not provided'),
    'Source page: ' . ($sourcePage !== '' ? $sourcePage : 'Not provided'),
    'Privacy consent: ' . ($privacyConsent ? 'Confirmed' : 'Not confirmed'),
    'Date/time: ' . $submittedAt,
    'IP address: ' . $ipAddress,
    '',
    'Message:',
    $message,
];

$body = implode("\n", $bodyLines);

$sent = false;

if (isPhpMailerAvailable()) {
    $sent = sendWithPhpMailer($recipient, $subject, $body, $fromEmail, $replyTo, $safeName);
}

if ($sent === false) {
    $sent = sendWithMailFunction($recipient, $subject, $body, $fromEmail, $replyTo);
}

if ($sent === false) {
    respond(false, $sendErrorMessage, 500);
}

respond(true, $successMessage);

function respond(bool $success, string $message, int $statusCode = 200): void
{
    http_response_code($statusCode);
    echo json_encode(
        [
            'success' => $success,
            'message' => $message,
        ],
        JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
    );
    exit;
}

function sanitizeInput(string $value, int $maxLength): string
{
    $clean = trim($value);
    $clean = strip_tags($clean);
    $clean = htmlspecialchars($clean, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');

    if (mb_strlen($clean, 'UTF-8') > $maxLength) {
        $clean = mb_substr($clean, 0, $maxLength, 'UTF-8');
    }

    return $clean;
}

function sanitizeEmail(string $value): string
{
    $email = sanitizeInput($value, 180);
    return str_replace(["\r", "\n"], '', $email);
}

function safeHeaderValue(string $value): string
{
    return trim((string) preg_replace('/[\r\n]+/', ' ', $value));
}

function isPhpMailerAvailable(): bool
{
    $autoloadPath = __DIR__ . '/vendor/autoload.php';

    if (is_file($autoloadPath)) {
        require_once $autoloadPath;
    }

    return class_exists(\PHPMailer\PHPMailer\PHPMailer::class);
}

function sendWithPhpMailer(
    string $recipient,
    string $subject,
    string $body,
    string $fromEmail,
    string $replyTo,
    string $replyName
): bool {
    $smtpHost = getenv('RAROG_SMTP_HOST') ?: '';

    if ($smtpHost === '') {
        return false;
    }

    $mailer = new \PHPMailer\PHPMailer\PHPMailer(true);

    try {
        $smtpUser = getenv('RAROG_SMTP_USER') ?: '';
        $smtpPass = getenv('RAROG_SMTP_PASS') ?: '';
        $smtpPort = (int) (getenv('RAROG_SMTP_PORT') ?: 587);
        $smtpSecure = strtolower((string) (getenv('RAROG_SMTP_SECURE') ?: 'tls'));

        $mailer->CharSet = 'UTF-8';
        $mailer->isSMTP();
        $mailer->Host = $smtpHost;
        $mailer->Port = $smtpPort > 0 ? $smtpPort : 587;
        $mailer->SMTPAuth = $smtpUser !== '' && $smtpPass !== '';

        if ($mailer->SMTPAuth) {
            $mailer->Username = $smtpUser;
            $mailer->Password = $smtpPass;
        }

        if ($smtpSecure === 'ssl') {
            $mailer->SMTPSecure = \PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS;
        } elseif ($smtpSecure === 'tls') {
            $mailer->SMTPSecure = \PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
        }

        $mailer->setFrom($fromEmail, 'Rarog Group website');
        $mailer->addAddress($recipient);
        $mailer->addReplyTo($replyTo, $replyName);
        $mailer->Subject = $subject;
        $mailer->Body = $body;
        $mailer->isHTML(false);

        return $mailer->send();
    } catch (\Throwable $exception) {
        return false;
    }
}

function sendWithMailFunction(
    string $recipient,
    string $subject,
    string $body,
    string $fromEmail,
    string $replyTo
): bool {
    if (PHP_SAPI === 'cli') {
        return false;
    }

    if (!function_exists('mail')) {
        return false;
    }

    $encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
    $headers = [
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'From: Rarog Group Website <' . safeHeaderValue($fromEmail) . '>',
        'Reply-To: ' . safeHeaderValue($replyTo),
        'X-Mailer: PHP/' . PHP_VERSION,
    ];

    return @mail($recipient, $encodedSubject, $body, implode("\r\n", $headers));
}
