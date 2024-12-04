<?php

function add_real_estate_meta_boxes()
    {
        add_meta_box(
            "post_metadata_real_estate_home_type", // div id containing rendered fields
            "Home Type", // section heading displayed as text
            [$this, 'post_meta_box_real_estate_home_type'], // callback function to render fields
            "real-estate", // name of post type on which to render fields
            "side", // location on the screen
            "low" // placement priority
        );


        add_meta_box(
            "post_metadata_real_estate_address", // div id containing rendered fields
            "Address", // section heading displayed as text
            [$this, 'post_meta_box_real_estate_address'], // callback function to render fields
            "real-estate", // name of post type on which to render fields
            "side", // location on the screen
            "low" // placement priority
        );

        add_meta_box(
            "post_metadata_real_estate_bedrooms", // div id containing rendered fields
            "Bedrooms", // section heading displayed as text
            [$this, 'post_meta_box_real_estate_bedrooms'], // callback function to render fields
            "real-estate", // name of post type on which to render fields
            "side", // location on the screen
            "low" // placement priority
        );

        add_meta_box(
            "post_metadata_real_estate_bathrooms", // div id containing rendered fields
            "Bathrooms", // section heading displayed as text
            [$this, 'post_meta_box_real_estate_bathrooms'], // callback function to render fields
            "real-estate", // name of post type on which to render fields
            "side", // location on the screen
            "low" // placement priority
        );

        add_meta_box(
            "post_metadata_real_estate_sqft", // div id containing rendered fields
            "Square Feet", // section heading displayed as text
            [$this, 'post_meta_box_real_estate_sqft'], // callback function to render fields
            "real-estate", // name of post type on which to render fields
            "side", // location on the screen
            "low" // placement priority
        );

        add_meta_box(
            "post_metadata_real_estate_price", // div id containing rendered fields
            "Asking Price", // section heading displayed as text
            [$this, 'post_meta_box_real_estate_price'], // callback function to render fields
            "real-estate", // name of post type on which to render fields
            "side", // location on the screen
            "low" // placement priority
        );

        add_meta_box(
            "post_metadata_real_estate_year_built", // div id containing rendered fields
            "Year Built", // section heading displayed as text
            [$this, 'post_meta_box_real_estate_year_built'], // callback function to render fields
            "real-estate", // name of post type on which to render fields
            "side", // location on the screen
            "low" // placement priority
        );

        add_meta_box(
            "post_metadata_real_estate_heating", // div id containing rendered fields
            "Heating", // section heading displayed as text
            [$this, 'post_meta_box_real_estate_heating'], // callback function to render fields
            "real-estate", // name of post type on which to render fields
            "side", // location on the screen
            "low" // placement priority
        );

        add_meta_box(
            "post_metadata_real_estate_cooling", // div id containing rendered fields
            "Cooling", // section heading displayed as text
            [$this, 'post_meta_box_real_estate_cooling'], // callback function to render fields
            "real-estate", // name of post type on which to render fields
            "side", // location on the screen
            "low" // placement priority
        );

        add_meta_box(
            "post_metadata_real_estate_garage", // div id containing rendered fields
            "Garage", // section heading displayed as text
            [$this, 'post_meta_box_real_estate_garage'], // callback function to render fields
            "real-estate", // name of post type on which to render fields
            "side", // location on the screen
            "low" // placement priority
        );

        add_meta_box(
            "post_metadata_real_estate_driveway", // div id containing rendered fields
            "Driveway", // section heading displayed as text
            [$this, 'post_meta_box_real_estate_driveway'], // callback function to render fields
            "real-estate", // name of post type on which to render fields
            "side", // location on the screen
            "low" // placement priority
        );

        add_meta_box(
            "post_metadata_real_estate_lot", // div id containing rendered fields
            "Lot Size", // section heading displayed as text
            [$this, 'post_meta_box_real_estate_lot'], // callback function to render fields
            "real-estate", // name of post type on which to render fields
            "side", // location on the screen
            "low" // placement priority
        );

        add_meta_box(
            "post_metadata_real_estate_story", // div id containing rendered fields
            "Story", // section heading displayed as text
            [$this, 'post_meta_box_real_estate_story'], // callback function to render fields
            "real-estate", // name of post type on which to render fields
            "side", // location on the screen
            "low" // placement priority
        );

        add_meta_box(
            "post_metadata_real_estate_appliances", // div id containing rendered fields
            "Appliances", // section heading displayed as text
            [$this, 'post_meta_box_real_estate_appliances'], // callback function to render fields
            "real-estate", // name of post type on which to render fields
            "side", // location on the screen
            "low" // placement priority
        );

        add_meta_box(
            "post_metadata_real_estate_flooring", // div id containing rendered fields
            "Flooring", // section heading displayed as text
            [$this, 'post_meta_box_real_estate_flooring'], // callback function to render fields
            "real-estate", // name of post type on which to render fields
            "side", // location on the screen
            "low" // placement priority
        );

        add_meta_box(
            "post_metadata_real_estate_materials", // div id containing rendered fields
            "Materials", // section heading displayed as text
            [$this, 'post_meta_box_real_estate_materials'], // callback function to render fields
            "real-estate", // name of post type on which to render fields
            "side", // location on the screen
            "low" // placement priority
        );

        add_meta_box(
            "post_metadata_real_estate_foundation", // div id containing rendered fields
            "Foundation", // section heading displayed as text
            [$this, 'post_meta_box_real_estate_foundation'], // callback function to render fields
            "real-estate", // name of post type on which to render fields
            "side", // location on the screen
            "low" // placement priority
        );

        add_meta_box(
            "post_metadata_real_estate_parcel", // div id containing rendered fields
            "Parcel", // section heading displayed as text
            [$this, 'post_meta_box_real_estate_parcel'], // callback function to render fields
            "real-estate", // name of post type on which to render fields
            "side", // location on the screen
            "low" // placement priority
        );
    }

    // callback function to render fields
    function post_meta_box_real_estate_home_type()
    {
        global $post;
        $custom = get_post_custom($post->ID);
        $homeType = $custom["_home_type"][0];

        echo "<input type='text' name=\"_home_type\" value=\"" . $homeType . "\">";
    }

    function post_meta_box_real_estate_address()
    {
        global $post;
        $custom = get_post_custom($post->ID);
        $address = $custom["_address"][0];

        echo "<input type='text' name=\"_address\" value=\"" . $address . "\">";
    }

    function post_meta_box_real_estate_bedrooms()
    {
        global $post;
        $custom = get_post_custom($post->ID);
        $bedrooms = $custom["_bedrooms"][0];

        echo "<input type='text' name=\"_bedrooms\" value=\"" . $bedrooms . "\">";
    }

    function post_meta_box_real_estate_bathrooms()
    {
        global $post;
        $custom = get_post_custom($post->ID);
        $bathrooms = $custom["_bathrooms"][0];

        echo "<input type='text' name=\"_bathrooms\" value=\"" . $bathrooms . "\">";
    }

    function post_meta_box_real_estate_sqft()
    {
        global $post;
        $custom = get_post_custom($post->ID);
        $sqft = $custom["_sqft"][0];

        echo "<input type='text' name=\"_sqft\" value=\"" . $sqft . "\">";
    }

    function post_meta_box_real_estate_price()
    {
        global $post;
        $custom = get_post_custom($post->ID);
        $price = $custom["_price"][0];

        echo "<input type='text' name=\"_price\" value=\"" . $price . "\">";
    }

    function post_meta_box_real_estate_year_built()
    {
        global $post;
        $custom = get_post_custom($post->ID);
        $yearBuilt = $custom["_year_built"][0];

        echo "<input type='text' name=\"_year_built\" value=\"" . $yearBuilt . "\">";
    }

    function post_meta_box_real_estate_heating()
    {
        global $post;
        $custom = get_post_custom($post->ID);
        $heating = $custom["_heating"][0];

        echo "<input type='text' name=\"_heating\" value=\"" . $heating . "\">";
    }

    function post_meta_box_real_estate_cooling()
    {
        global $post;
        $custom = get_post_custom($post->ID);
        $cooling = $custom["_cooling"][0];

        echo "<input type='text' name=\"_cooling\" value=\"" . $cooling . "\">";
    }

    function post_meta_box_real_estate_garage()
    {
        global $post;
        $custom = get_post_custom($post->ID);
        $garage = $custom["_garage"][0];

        echo "<input type='text' name=\"_garage\" value=\"" . $garage . "\">";
    }

    function post_meta_box_real_estate_driveway()
    {
        global $post;
        $custom = get_post_custom($post->ID);
        $driveway = $custom["_driveway"][0];

        echo "<input type='text' name=\"_driveway\" value=\"" . $driveway . "\">";
    }

    function post_meta_box_real_estate_lot()
    {
        global $post;
        $custom = get_post_custom($post->ID);
        $lot = $custom["_lot"][0];

        echo "<input type='text' name=\"_lot\" value=\"" . $lot . "\">";
    }

    function post_meta_box_real_estate_story()
    {
        global $post;
        $custom = get_post_custom($post->ID);
        $story = $custom["_story"][0];

        echo "<input type='text' name=\"_story\" value=\"" . $story . "\">";
    }

    function post_meta_box_real_estate_appliances()
    {
        global $post;
        $custom = get_post_custom($post->ID);
        $appliances = $custom["_appliances"][0];

        echo "<input type='text' name=\"_appliances\" value=\"" . $appliances . "\">";
    }

    function post_meta_box_real_estate_flooring()
    {
        global $post;
        $custom = get_post_custom($post->ID);
        $flooring = $custom["_flooring"][0];

        echo "<input type='text' name=\"_flooring\" value=\"" . $flooring . "\">";
    }

    function post_meta_box_real_estate_materials()
    {
        global $post;
        $custom = get_post_custom($post->ID);
        $materials = $custom["_materials"][0];

        echo "<input type='text' name=\"_materials\" value=\"" . $materials . "\">";
    }

    function post_meta_box_real_estate_foundation()
    {
        global $post;
        $custom = get_post_custom($post->ID);
        $foundation = $custom["_foundation"][0];

        echo "<input type='text' name=\"_foundation\" value=\"" . $foundation . "\">";
    }

    function post_meta_box_real_estate_parcel()
    {
        global $post;
        $custom = get_post_custom($post->ID);
        $parcel = $custom["_appliances"][0];

        echo "<input type='text' name=\"_parcel\" value=\"" . $parcel . "\">";
    }

    // save field value
    function save_post_real_estate()
    {
        global $post;
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return;
        }
        // if ( get_post_status( $post->ID ) === 'auto-draft' ) {
        //     return;
        // }
        update_post_meta($post->ID, "_home_type", sanitize_text_field($_POST["_home_type"]));
        update_post_meta($post->ID, "_address", sanitize_text_field($_POST["_address"]));
        update_post_meta($post->ID, "_bedrooms", sanitize_text_field($_POST["_bedrooms"]));
        update_post_meta($post->ID, "_bathrooms", sanitize_text_field($_POST["_bathrooms"]));
        update_post_meta($post->ID, "_sqft", sanitize_text_field($_POST["_sqft"]));
        update_post_meta($post->ID, "_price", sanitize_text_field($_POST["_price"]));
        update_post_meta($post->ID, "_year_built", sanitize_text_field($_POST["_year_built"]));
        update_post_meta($post->ID, "_heating", sanitize_text_field($_POST["_heating"]));
        update_post_meta($post->ID, "_cooling", sanitize_text_field($_POST["_cooling"]));
        update_post_meta($post->ID, "_garage", sanitize_text_field($_POST["_garage"]));
        update_post_meta($post->ID, "_lot", sanitize_text_field($_POST["_lot"]));
        update_post_meta($post->ID, "_driveway", sanitize_text_field($_POST["_driveway"]));
        update_post_meta($post->ID, "_story", sanitize_text_field($_POST["_story"]));
        update_post_meta($post->ID, "_appliances", sanitize_text_field($_POST["_appliances"]));
        update_post_meta($post->ID, "_flooring", sanitize_text_field($_POST["_flooring"]));
        update_post_meta($post->ID, "_materials", sanitize_text_field($_POST["_materials"]));
        update_post_meta($post->ID, "_foundation", sanitize_text_field($_POST["_foundation"]));
        update_post_meta($post->ID, "_parcel", sanitize_text_field($_POST["_parcel"]));
    }

    function add_address_to_rest()
    {
        register_rest_field(
            'real-estate',
            'home_type',
            array(
                'get_callback' => [$this, 'get_prop_home_type']
            )
        );

        register_rest_field(
            'real-estate',
            'address',
            array(
                'get_callback' => [$this, 'get_prop_address']
            )
        );

        register_rest_field(
            'real-estate',
            'bedrooms',
            array(
                'get_callback' => [$this, 'get_prop_bedrooms']
            )
        );

        register_rest_field(
            'real-estate',
            'bathrooms',
            array(
                'get_callback' => [$this, 'get_prop_bathrooms']
            )
        );

        register_rest_field(
            'real-estate',
            'sqft',
            array(
                'get_callback' => [$this, 'get_prop_sqft']
            )
        );

        register_rest_field(
            'real-estate',
            'lot_size',
            array(
                'get_callback' => [$this, 'get_prop_lot']
            )
        );

        register_rest_field(
            'real-estate',
            'price',
            array(
                'get_callback' => [$this, 'get_prop_price']
            )
        );

        register_rest_field(
            'real-estate',
            'year_built',
            array(
                'get_callback' => [$this, 'get_prop_year_built']
            )
        );

        register_rest_field(
            'real-estate',
            'heating',
            array(
                'get_callback' => [$this, 'get_prop_heating']
            )
        );

        register_rest_field(
            'real-estate',
            'cooling',
            array(
                'get_callback' => [$this, 'get_prop_cooling']
            )
        );

        register_rest_field(
            'real-estate',
            'garage',
            array(
                'get_callback' => [$this, 'get_prop_garage']
            )
        );

        register_rest_field(
            'real-estate',
            'featured_media_url',
            array(
                'get_callback'    => [$this, 'get_prop_featured_media']
            )
        );

        register_rest_field(
            'real-estate',
            'driveway',
            array(
                'get_callback' => [$this, 'get_prop_driveway']
            )
        );

        register_rest_field(
            'real-estate',
            'story',
            array(
                'get_callback' => [$this, 'get_prop_story']
            )
        );

        register_rest_field(
            'real-estate',
            'appliances',
            array(
                'get_callback' => [$this, 'get_prop_appliances']
            )
        );

        register_rest_field(
            'real-estate',
            'flooring',
            array(
                'get_callback' => [$this, 'get_prop_flooring']
            )
        );

        register_rest_field(
            'real-estate',
            'construction_materials',
            array(
                'get_callback' => [$this, 'get_prop_materials']
            )
        );

        register_rest_field(
            'real-estate',
            'foundation',
            array(
                'get_callback' => [$this, 'get_prop_foundation']
            )
        );

        register_rest_field(
            'real-estate',
            'parcel_number',
            array(
                'get_callback' => [$this, 'get_prop_parcel']
            )
        );

        register_rest_field(
            'real-estate',
            'gallery',
            array(
                'get_callback' => [$this, 'get_prop_gallery']
            )
        );
    }

    function get_prop_home_type($post_id)
    {
        global $post;

        return get_post_meta(get_the_id(), '_home_type', true);
    }

    function get_prop_address($post_id)
    {
        global $post;

        return get_post_meta(get_the_id(), '_address', true);
    }

    function get_prop_bedrooms($post_id)
    {
        global $post;

        return get_post_meta(get_the_id(), '_bedrooms', true);
    }

    function get_prop_bathrooms($post_id)
    {
        global $post;

        return get_post_meta(get_the_id(), '_bathrooms', true);
    }

    function get_prop_sqft($post_id)
    {
        global $post;

        return get_post_meta(get_the_id(), '_sqft', true);
    }

    function get_prop_lot($post_id)
    {
        global $post;

        return get_post_meta(get_the_id(), '_lot', true);
    }

    function get_prop_price($post_id)
    {
        global $post;

        return get_post_meta(get_the_id(), '_price', true);
    }

    function get_prop_year_built($post_id)
    {
        global $post;

        return get_post_meta(get_the_id(), '_year_built', true);
    }

    function get_prop_heating($post_id)
    {
        global $post;

        return get_post_meta(get_the_id(), '_heating', true);
    }

    function get_prop_cooling($post_id)
    {
        global $post;

        return get_post_meta(get_the_id(), '_cooling', true);
    }

    function get_prop_garage($post_id)
    {
        global $post;

        return get_post_meta(get_the_id(), '_garage', true);
    }

    function get_prop_driveway($post_id)
    {
        global $post;

        return get_post_meta(get_the_id(), '_driveway', true);
    }

    function get_prop_story($post_id)
    {
        global $post;

        return get_post_meta(get_the_id(), '_story', true);
    }

    function get_prop_appliances($post_id)
    {
        global $post;

        return get_post_meta(get_the_id(), '_appliances', true);
    }

    function get_prop_flooring($post_id)
    {
        global $post;

        return get_post_meta(get_the_id(), '_flooring', true);
    }

    function get_prop_materials($post_id)
    {
        global $post;

        return get_post_meta(get_the_id(), '_materials', true);
    }

    function get_prop_foundation($post_id)
    {
        global $post;

        return get_post_meta(get_the_id(), '_foundation', true);
    }

    function get_prop_parcel($post_id)
    {
        global $post;

        return get_post_meta(get_the_id(), '_parcel', true);
    }

    function get_prop_featured_media($object, $field_name, $request)
    {
        if ($object['featured_media']) {
            $img = wp_get_attachment_image_src($object['featured_media'], 'app-thumb');
            return $img[0];
        }
        return false;
    }

    function get_prop_gallery()
    {
        global $post;
        $img[] = get_post_gallery($post, false);
        return $img;
    }


    function real_estate_custom_taxonomies()
    {
        $labels = array(
            'name' => 'Propety Types',
            'singular_name' => 'Property Type',
            'add_new' => 'Add New Property Type',
            'all_items' => 'Propety Types',
            'parent_item' => 'Parent Propety Type',
            'parent_item_colon' => 'Parent Propety Type:',
            'edit_item' => 'Edit Type',
            'update_item' => 'Update Property Type',
            'add_new_item' => 'Add New Property Type',
            'new_item_name' => 'New Property Type Name',
            'menu_name' => 'Propety Types'
        );

        $args = array(
            'labels' => $labels,
            'hierarchical' => true,
            'public' => true,
            'publicly_queryable' => false,
            'show_ui' => true,
            'show_admin_column' => true,
            'show_in_rest' => true,
            'has_archive' => true,
            'query_var' => true,
            'rewrite' => array(
                'with_front' => false,
                'slug' => 'property-type'
            )
        );

        register_taxonomy('property-type', array('real-estate'), $args);
    }

    function get_real_estate_archive_template($archive_template)
    {
        global $post;
        $real_estate_archive_template = plugin_dir_path(__FILE__) . './templates/archive-real-estate.php';

        if (is_post_type_archive('real-estate')) {
            return $real_estate_archive_template;
        } else {
            return $archive_template;
        }
    }

    function get_real_estate_single_template($single_template)
    {

        $real_estate_single_template = plugin_dir_path(__FILE__) . './templates/single-portfolio.php';

        if (is_singular('real-estate')) {
            return  $real_estate_single_template;
        } else {
            return $single_template;
        }
    }
