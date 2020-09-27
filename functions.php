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


// SHOWING UP PAGES NAME ON BROWSER'S TAB: PRIVACY POLICY, ABOUT US, EVENTS...
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



// EDITING QUERY FOR ARCHIVE OF OUR CUSTOM POST TYPE WE MADE 'EVENTS'
function university_adjust_queries($query) {
    if (!is_admin() AND is_post_type_archive('event') AND $query->is_main_query()) {
// what we did here is that we made conditions in if statement so only changed we made affect certein part of our site... !is_admin() stands for not affecting our adming dashboard, is_post_type_archive('event) means that changed will only occur on archive of our custom post type and $query->is_main_query() is third check which makes sure that changes will never affect our custom query and that it will only run in the url based query
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
}

add_action('pre_get_posts', 'university_adjust_queries');


