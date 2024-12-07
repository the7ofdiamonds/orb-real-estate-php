<?php

namespace ORB\Real_Estate;

/**
 * @package ORB\Real_Estate
 */
/*
Plugin Name: ORB Real Estate
Plugin URI: 
Description: Real Estate.
Version: 1.0.0
Author: THE7OFDIAMONDS.TECH
Author URI: http://THE7OFDIAMONDS.TECH
License: 
Text Domain: orb-real-estate
*/

/*
Licensing Info Here
*/

defined('ABSPATH') or die('Hey, what are you doing here? You silly human!');
define('ORB_REAL_ESTATE', WP_PLUGIN_DIR . '/orb-real-estate/');
define('ORB_REAL_ESTATE_URL', WP_PLUGIN_URL . '/orb-real-estate/');

require_once ORB_REAL_ESTATE . 'vendor/autoload.php';

use ORB\Real_Estate\Admin\Admin;

use ORB\Real_Estate\API\API;
use ORB\Real_Estate\CSS\CSS;
use ORB\Real_Estate\Database\Database;
use ORB\Real_Estate\Exception\DestructuredException;
use ORB\Real_Estate\JS\JS;
use ORB\Real_Estate\Pages\Pages;
use ORB\Real_Estate\Post_Types\Post_Types;
use ORB\Real_Estate\Roles\Roles;
use ORB\Real_Estate\Router\Router;
use ORB\Real_Estate\Shortcodes\Shortcodes;
use ORB\Real_Estate\Taxonomies\Taxonomies;
use ORB\Real_Estate\Templates\Templates;


use Dotenv\Dotenv;

class ORB_Real_Estate
{
    private $plugin_file;
    public $pages;
    public $router;
    public $posttypes;
    public $taxonomies;

    public function __construct()
    {
        $this->plugin_file = plugin_basename(__FILE__);

        if (!function_exists('get_plugin_data')) {
            require_once(ABSPATH . 'wp-admin/includes/plugin.php');
        }

        $plugin_data = get_plugin_data(__FILE__);
        define('PLUGIN_NAME', $plugin_data['Name']);

        $dotenv = Dotenv::createImmutable(__DIR__);
        $dotenv->load();

        $admin = new Admin;

        add_action('admin_init', function () use ($admin) {
            $admin;
            add_filter("plugin_action_links_{$this->plugin_file}", [$admin, 'settings_link']);
        });

        add_action('admin_menu', [$admin, 'register_custom_menu_page']);

        add_action('rest_api_init', function () {
            new API();
        });

        $this->pages = new Pages;
        $this->posttypes = new Post_Types;
        $this->taxonomies = new Taxonomies;
        $templates = new Templates;

        $this->router = new Router(
            $this->pages,
            $this->posttypes,
            $this->taxonomies,
            $templates
        );

        add_action('init', function () {
            $this->posttypes->custom_post_types();
            $this->taxonomies->custom_taxonomy();
            $this->router;
            $this->router->react_rewrite_rules();
            new Shortcodes;
        });
    }

    function activate()
    {
        try {
            (new Database())->setup();
            // $this->pages->add_pages();
            // $this->router->react_rewrite_rules();
        } catch (DestructuredException $e) {
            error_log($e->getErrorMessage());
        }
    }

    function deactivate()
    {
        flush_rewrite_rules();
    }
}

$orb_real_estate = new ORB_Real_Estate();
register_activation_hook(__FILE__, array($orb_real_estate, 'activate'));
