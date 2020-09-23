<?php  

function university_files() {
    wp_enqueue_script('main-university-js', get_theme_file_uri('/js/scripts-bundled.js'),
    // microtime() is wordpress function which stops site from caching and forces it to load js again and again, and we don't use this on live server
    NULL, microtime(), true);
    wp_enqueue_style('custom-google-fonts', '//fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i');
    wp_enqueue_style('font-awesome', '//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
    // microtime() forcing style.css to load everytime we refresh site and stops cahcing of the site
    wp_enqueue_style('university_main_styles', get_stylesheet_uri(), NULL, microtime());
}

add_action('wp_enqueue_scripts', 'university_files');


// showing up pages name on browser's tab example: privacy policy, about us...
function university_features() {
    /* 
    // making menus location in admin panel for menus we made
    // making new menu location for header which can be found in 'menus' => display location
    register_nav_menu('headerMenuLocation', 'Header Menu Location');
    // new menu locations for footer
    register_nav_menu('footerLocationOne', 'Footer Location One');
    register_nav_menu('footerLocationTwo', 'Footer Location Two'); */
    add_theme_support('title-tag');
}

add_action('after_setup_theme', 'university_features');