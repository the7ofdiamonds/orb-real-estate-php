<?php

namespace ORB\Real_Estate\Templates;

use ORB\Real_Estate\CSS\CSS;
use ORB\Real_Estate\JS\JS;

class Templates
{
    private $current_page;
    private $cssDir;
    private $jsDir;

    public function __construct(string $current_page = 'index')
    {
        $this->current_page = $current_page;
        $this->cssDir = ORB_REAL_ESTATE . 'CSS/public/dist/css/';
        $this->jsDir = ORB_REAL_ESTATE . 'JS/public/dist/js/';
    }

    function load_admin_css()
    {
        return (new CSS('admin'))->load_pages_css($this->current_page);
    }

    function load_admin_js()
    {
        return (new JS('admin'))->load_pages_react($this->current_page);
    }

    function get_admin_template()
    {
        include_once ORB_REAL_ESTATE . 'includes/admin-react.php';
        add_action('admin_footer', [$this, 'load_admin_js']);
    }

    function get_front_page_template($frontpage_template, $sections)
    {
        if (is_front_page()) {
            $frontpage_template = ORB_REAL_ESTATE . 'Pages/page.php';

            if (file_exists($frontpage_template)) {
                foreach ($sections as $section) {
                    $frontpage_css = $this->cssDir . $section . '.css';

                    if (file_exists($frontpage_css)) {

                        add_action('wp_head', function () use ($section) {
                            (new CSS)->load_front_page_css($section);
                        });
                    }

                    $frontpage_js = $this->jsDir . $section . '.js';

                    if (file_exists($frontpage_js)) {

                        add_action('wp_footer', function () use ($section) {
                            (new JS)->load_front_page_react($section);
                        });
                    }

                    return $frontpage_template;
                }
            }

            return $frontpage_template;
        }
    }

    function get_custom_page_template($template_include, $custom_page)
    {

        if (isset($custom_page['file_name'])) {
            $filename = $custom_page['file_name'];
            $filename_css = $this->cssDir . $filename . '.css';
            $filename_js = $this->jsDir . $filename . '.js';

            if (file_exists($filename_css)) {
                add_action('wp_head', function () use ($filename) {
                    (new CSS)->load_pages_css($filename);
                });
            }

            if (file_exists($filename_js)) {
                add_action('wp_footer', function () use ($filename) {
                    (new JS)->load_pages_react($filename);
                });
            }
        }

        if (isset($custom_page['page_name'])) {
            $custom_template = ORB_REAL_ESTATE . "Pages/page-{$custom_page['page_name']}.php";

            if (file_exists($custom_template)) {
                return $custom_template;
            }
        }

        return $template_include;
    }

    function get_protected_page_template($template_include, $protected_page)
    {
        $template = ORB_REAL_ESTATE . 'Pages/page-protected.php';

        if (file_exists($template)) {
            $filename = $protected_page['file_name'];

            add_action('wp_head', function () use ($filename) {
                (new CSS)->load_pages_css($filename);
            });
            add_action('wp_footer', function () use ($filename) {
                (new JS)->load_pages_react($filename);
            });

            return $template;
        } else {
            error_log('Protected Page Template does not exist.');
        }

        return $template_include;
    }

    function get_page_template($template_include, $page)
    {
        $filename = $page['file_name'];
        $filename_css = $this->cssDir . $filename . '.css';
        $filename_js = $this->jsDir . $filename . '.js';

        if (file_exists($filename_css)) {
            add_action('wp_head', function () use ($filename) {
                (new CSS)->load_pages_css($filename);
            });
        }

        if (file_exists($filename_js)) {
            add_action('wp_footer', function () use ($filename) {
                (new JS)->load_pages_react($filename);
            });
        }

        $template = ORB_REAL_ESTATE . 'Pages/page.php';;

        if (file_exists($template)) {
            return $template;
        }

        return $template_include;
    }

    function get_page_list_template($template_include, $page)
    {
        $filename = $page['file_name'];

        add_action('wp_head', function () use ($filename) {
            (new CSS)->load_pages_css($filename);
        });
        add_action('wp_footer', function () use ($filename) {
            (new JS)->load_pages_react($filename);
        });

        return $template_include;
    }

    function get_taxonomy_page_template($taxonomy_template, $taxonomy)
    {
        if (is_tax($taxonomy['taxonomy'])) {
            $custom_taxonomy_template = ORB_REAL_ESTATE . "Taxonomies/taxonomy-{$taxonomy['file_name']}.php";

            if (file_exists($custom_taxonomy_template)) {
                $filename = $taxonomy['file_name'];

                add_action('wp_head', function () use ($filename) {
                    (new CSS)->load_pages_css($filename);
                });
                add_action('wp_footer', function () use ($filename) {
                    (new JS)->load_pages_react($filename);
                });

                return $custom_taxonomy_template;
            }
        }

        return $taxonomy_template;
    }

    function get_archive_page_template($archive_template, $post_type)
    {
        if (is_post_type_archive($post_type['name'])) {
            $custom_archive_template = ORB_REAL_ESTATE . 'Post_Types/' . $post_type['plural'] . '/archive-' . $post_type['name'] . '.php';

            if (file_exists($custom_archive_template)) {
                $filename = $post_type['file_name'];

                add_action('wp_head', function () use ($filename) {
                    (new CSS)->load_pages_css($filename);
                });
                add_action('wp_footer', function () use ($filename) {
                    (new JS)->load_pages_react($filename);
                });

                return $custom_archive_template;
            }
        }

        return $archive_template;
    }

    function get_single_page_template($single_template, $post_type)
    {
        if (is_singular($post_type['name'])) {
            $custom_single_template = ORB_REAL_ESTATE . 'Post_Types/' . $post_type['plural'] . '/single-' . $post_type['name'] . '.php';

            if (file_exists($custom_single_template)) {
                $filename = $post_type['file_name'];

                add_action('wp_head', function () use ($filename) {
                    (new CSS)->load_pages_css($filename);
                });
                add_action('wp_footer', function () use ($filename) {
                    (new JS)->load_pages_react($filename);
                });

                return $custom_single_template;
            }
        }

        return $single_template;
    }
}
