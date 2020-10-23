<?php 

add_action('rest_api_init', 'universityRegisterSearch');

function universityRegisterSearch() {

    /** our custom JSON URL will look like: 
    http://localhost:3000/wp-json/university/v1/search */
    register_rest_route('university/v1', 'search', array(
        // in another words GET method
        'methods' => WP_REST_SERVER::READABLE,
        // callback value consists function which we will make down below
        'callback' => 'universitySearchResults'
    ));

}

// we added $data paramater in our function since WP automaatically returns what user of our site has tyoed in search box
function universitySearchResults($data) {
    // making variable where we stored WP_Query in which we have array where we selected 'professor' post type
    $mainQuery = new WP_Query(array(
        'post_type' => array('post', 'page', 'professor', 'program', 'campus', 'event'),
        // 's' stands for 'search', and we made it equal to our parameter in function further on looking into it for what user has typed in search box
        // sanitize_text_field() is WP function that help us protect our site and input field so no malicious code will be inputed into it and potentially break our site
        's' => sanitize_text_field($data['term']) 
    ));

/** In order to work with multiple custom post types we made and show JSON for every single one of them we had to rename our variable into results, since now it's showing all the data and after that what we did is that in our previously empty array we made key for every custom post type along with global one named "generalInfo" and made them equal to empty array
 * After that in our while loop we made bunch of if statements which will push data only to certain type of arrays we made for custom post types depending on what user has typed in the search box, or how our URL looks like
 */
    $results = array(
        'generalInfo' => array(),
        'professors' => array(),
        'programs' => array(),
        'events' => array(),
        'campuses' => array(),
    );

    // using while loop to loop through our posts in our custom post type
    while($mainQuery->have_posts()) {
        $mainQuery->the_post();
        // array_push is function which uses two arguemtns, first one is variable which we made above in whom's array we are going to store our data, and second arguemnt is array for making JSON data
        if(get_post_type() == 'post' OR get_post_type() == 'page') {
            array_push($results['generalInfo'], array(
            'title' => get_the_title(),
            'url' => get_the_permalink(),
        ));
        }

        if(get_post_type() == 'professor') {
            array_push($results['professors'], array(
            'title' => get_the_title(),
            'url' => get_the_permalink(),
        ));
        }

        if(get_post_type() == 'program') {
            array_push($results['programs'], array(
            'title' => get_the_title(),
            'url' => get_the_permalink(),
        ));
        }

        if(get_post_type() == 'campus') {
            array_push($results['campuses'], array(
            'title' => get_the_title(),
            'url' => get_the_permalink(),
        ));
        }

        if(get_post_type() == 'event') {
            array_push($results['events'], array(
            'title' => get_the_title(),
            'url' => get_the_permalink(),
        ));
        }
        
    }


    return $results;

}

