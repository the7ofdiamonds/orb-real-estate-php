<?php

namespace ORB\Real_Estate\Admin;

use ORB\Real_Estate\ENV\ENV;
use ORB\Real_Estate\Exception\DestructuredException;
use ORB\Real_Estate\Templates\Templates;

use Exception;

class Admin
{
    private string $admin_url;
    public string $parent_slug;
    public string $id;
    public string $current_page;
    public string $page_title;
    public string $menu_title;
    public string $menu_slug;
    public string $page_url;

    public array $redis_options;
    public array $redis_parameters;

    public function __construct(string $page_title = "Dashboard", string $menu_title = "Dashboard")
    {
        $this->page_title = $page_title;
        $this->menu_title = $menu_title;
        $this->menu_slug = $this->get_menu_slug($page_title);
        $this->id = $this->menu_slug;
        $this->parent_slug = $this->get_parent_slug();
        $this->admin_url = $this->get_plugin_page_url('admin.php', $this->parent_slug);
        $this->page_url = $this->get_plugin_page_url('admin.php', $this->menu_slug);
    }

    public function get_parent_slug()
    {
        return strtolower(str_replace(' ', '-', PLUGIN_NAME));
    }

    function get_plugin_page_url($filename, $slug)
    {
        return admin_url("{$filename}?page={$slug}");
    }

    public function settings_link($links)
    {
        $settings_link = "<a href='{$this->admin_url}'>Settings</a>";
        array_push($links, $settings_link);

        return $links;
    }

    function get_menu_slug(string $title)
    {
        $slug = strtolower(str_replace(' ', '-', $title));

        return "{$this->get_parent_slug()}-{$slug}";
    }

    public function register_custom_menu_page()
    {
        add_menu_page(
            PLUGIN_NAME,
            'GATEWAY',
            'manage_options',
            $this->parent_slug,
            '',
            'dashicons-info',
            101
        );
        add_submenu_page(
            $this->parent_slug,
            PLUGIN_NAME,
            $this->menu_title,
            'manage_options',
            $this->parent_slug,
            [new Templates, 'get_admin_template'],
            0
        );
    }

    function section_description()
    {
        echo 'Manage User Accounts';
    }

    public function uploadENVFile()
    {
        try {
            $uploadedENVFile = '';

            foreach ($_FILES as $file) {
                $uploadedENVFile = (new ENV)->uploadENVFile($file);
            }

            return $uploadedENVFile;
        } catch (DestructuredException $e) {
            throw new DestructuredException($e);
        }
    }
}
