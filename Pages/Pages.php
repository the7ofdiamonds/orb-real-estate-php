<?php

namespace ORB\Real_Estate\Pages;

class Pages
{
    public $front_page_react;
    public $custom_pages;
    public $protected_pages;
    public $pages_list;
    public $pages;

    public function __construct()
    {
        $this->front_page_react = [
            'FrontPage'
        ];

        $this->custom_pages = [
            [
                'url' => 'login',
                'regex' => '#^/login#',
                'file_name' => 'Login',
                'title' => 'LOGIN',
                'page_name' => 'login'
            ],
            [
                'url' => 'logout',
                'regex' => '#^/logout#',
                'file_name' => 'Logout',
                'title' => 'LOGOUT',
                'page_name' => 'logout'
            ],
            [
                'url' => 'signup',
                'regex' => '#^/signup#',
                'file_name' => 'Signup',
                'title' => 'SIGNUP',
                'page_name' => 'signup'
            ],
            [
                'url' => 'dashboard',
                'regex' => '#^/dashboard#',
                'file_name' => 'Dashboard',
                'title' => 'DASHBOARD',
                'page_name' => 'dashboard'
            ],
            [
                'file_name' => 'About',
                'regex' => '#^/about#'
            ],
            [
                'file_name' => 'Schedule',
                'regex' => '#^/schedule#'
            ]
        ];

        $this->protected_pages = [];

        $this->pages = [
            [
                'url' => 'forgot',
                'regex' => '#^/forgot#',
                'file_name' => 'Forgot',
                'title' => 'FORGOT',
                'page_name' => 'forgot'
            ],
            [
                'url' => 'account/activation',
                'regex' => '#^\/account\/activation\/([a-z0-9.%]+)\/([a-zA-Z0-9-]+)/$#',
                'file_name' => 'AccountActivation',
                'title' => 'Account Activation',
                'name' => 'account-activation'
            ],
            [
                'url' => 'account/recovery',
                'regex' => '#^\/account\/recovery\/([a-z0-9.%]+)\/([a-zA-Z0-9-]+)/$#',
                'file_name' => 'AccountRecovery',
                'title' => 'ACCOUNT RECOVERY',
                'name' => 'account-recovery'
            ],
            [
                'url' => 'password/recovery',
                'regex' => '#^\/password\/recovery\/([a-z0-9.%]+)\/([a-zA-Z0-9-]+)/$#',
                'file_name' => 'PasswordRecovery',
                'title' => 'PASSWORD RECOVERY',
                'name' => 'password-recovery'
            ]
        ];

        $this->pages_list = [
            ['title' => 'LOGIN']
        ];
    }

    function add_pages()
    {
        if (!empty($this->pages_list)) {
            global $wpdb;

            foreach ($this->pages_list as $page) {
                if (!empty($page['title'])) {
                    $page_exists = $wpdb->get_var($wpdb->prepare("SELECT ID FROM $wpdb->posts WHERE post_title = %s AND post_type = 'page'", $page['title']));

                    if (!$page_exists) {
                        $page_data = array(
                            'post_title'   => $page['title'],
                            'post_type'    => 'page',
                            'post_content' => '',
                            'post_status'  => 'publish',
                        );

                        wp_insert_post($page_data);

                        error_log($page['title'] . ' page added.');
                    }
                }
            }
        }
    }

    function is_user_logged_in()
    {
        return isset($_SESSION['idToken']);
    }
}
