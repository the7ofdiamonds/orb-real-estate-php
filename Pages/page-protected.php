<?php

// use SEVEN_TECH\Gateway\Cookie\Cookie;

// $cookie = new Cookie();

// if (!$cookie->determine_current_user()) {
//     $fullUrl = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];

//     wp_redirect('/login' . '?redirectTo=' . $fullUrl);
//     exit;
// }

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

get_header();

include ORB_REAL_ESTATE . 'includes/react.php';

get_footer();
