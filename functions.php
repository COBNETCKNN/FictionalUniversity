<?php  

function university_files() {

    wp_enqueue_script('googleMap', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDPCzVJ5iYP7vZM52Bms86A5p1KRIg5Z2I', NULL, '1.0', true);
    wp_enqueue_script('googleMapsJS', get_template_directory_uri() . '/js/custom.js', NULL, '1.0', true);
    wp_enqueue_script('custom.js', get_template_directory_uri() . '/src/app.js');
    wp_enqueue_script('main-university-js', get_theme_file_uri('/js/scripts-bundled.js'),
    // microtime() is wordpress function which stops site from caching and forces it to load js again and again, and we don't use this on live server
    NULL, microtime(), true);

    wp_enqueue_style('customCSS', get_template_directory_uri() . '/css/custom.css');
    wp_enqueue_style('custom-google-fonts', '//fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i');
    wp_enqueue_style('font-awesome', '//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
    // microtime() forcing style.css to load everytime we refresh site and stops cahcing of the site
    wp_enqueue_style('university_main_styles', get_stylesheet_uri(), NULL, microtime());

}

add_action('wp_enqueue_scripts', 'university_files');


// ENABLING FEATURES TO THE THEME
function university_features() {
    /* 
    // making menus location in admin panel for menus we made
    // making new menu location for header which can be found in 'menus' => display location
    register_nav_menu('headerMenuLocation', 'Header Menu Location');
    // new menu locations for footer
    register_nav_menu('footerLocationOne', 'Footer Location One');
    register_nav_menu('footerLocationTwo', 'Footer Location Two'); */
    add_theme_support('title-tag'); // showing title in the browser's tab
    add_theme_support('post-thumbnails'); // enabling featured images
    add_image_size( 'professorLandscape', 220, 220, true); // making custom sizes for featured images
    add_image_size('professorPortrait', 480, 650, true);
    add_image_size('pageBanner', 1500,350, true);
    add_image_size('iconMarker', 50, 50, true);
}

add_action('after_setup_theme', 'university_features');


// MAKING REAUSABLE FUNCTIONS

// $args = NULL means that argument will be optional not required which would be if there is no NULL
function pageBanner($args = NULL) {
    
    if(!$args['title']) {
        $args['title'] = get_the_title();
    }
// if no title was not provided just pull the wordpress page title

    if(!$args['subtitle']) {
        $args['subtitle'] = get_field('page_banner_subtitle');
    }
// making argument for subtitle, so if it's not provided as a fallback it will use custom field one

    if(!$args['photo']) {
        if(get_field('page_banner_background_image')) {
            $args['photo'] = get_field('page_banner_background_image')['sizes']['pageBanner'];
        } else {
            $args['photo'] = get_theme_file_uri('/images/ocean.jpg');
        }
    }
// what we did here is that we nested if statement inside on, so if there is no background image provided by us wordpress will use one uploaded by client, further if there is no image uploaded by client wordpress will use image provided by us from img directory in our there folder

    ?>

        <div class="page-banner">
            <div class="page-banner__bg-image" style="background-image: url(<?php echo $args['photo'] ?>);"></div>
            <div class="page-banner__content container container--narrow">
                <h1 class="page-banner__title"><?php echo $args['title'] ?></h1>
                <div class="page-banner__intro">
                <p><?php echo $args['subtitle'] ?></p>
                </div>
            </div>  
        </div>

    <?php
}







// EDITING DEFAULT QUERIES FOR CUSTOM POST TYPES AND THEIR ARCHIVES
function university_adjust_queries($query) {
    if (!is_admin() AND is_post_type_archive('event') AND $query->is_main_query()) {
// what we did here is that we made conditions in if statement so only changed we made affect certein part of our site... !is_admin() stands for not affecting our adming dashboard, is_post_type_archive('event) means that changed will only occur on archive of our custom post type and $query->is_main_query() is third check which makes sure that changes will never affect our custom query and that it will only run in the url based query
// EVENT ARCHIVE QUERY
        $today = date('Ymd');
        $query->set('meta_key', 'event_date');
        $query->set('orderby', 'meta_value_num');
        $query->set('order', 'ASC');
        $query->set('meta_query', array(
                array(
                  'key' => 'event_date',
                  'compare' => '>=',
                  'value' => $today,
                  'type' => 'numeric'
                  // on english language it means only show us dates where event date is greater or equeal to today's date
                )
              ));
    }

// PROGRAMS ARCHIVE QUERY
    if(!is_admin() AND is_post_type_archive('program') AND $query->is_main_query()) {
        $query->set('orderby', 'title');
        $query->set('order', 'ASC');
        $query->set('posts_per_page', -1);
    }
}

add_action('pre_get_posts', 'university_adjust_queries');


function my_acf_init() {
    acf_update_setting('google_api_key', 'AIzaSyDPCzVJ5iYP7vZM52Bms86A5p1KRIg5Z2I');
}
add_action('acf/init', 'my_acf_init');


