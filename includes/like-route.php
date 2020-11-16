<?php 

function univeristyLikeRoutes() {
    register_rest_route('university/v1', 'manageLike', array(
        'methods' => 'POST',
        'callback' => 'createLike'
    ));

    register_rest_route('university/v1', 'manageLike', array(
        'methods' => 'DELETE',
        'callback' => 'deleteLike'
    ));
}

function createLike($data) {
    // if statement which enforces users to be logged in to be able to like professor
    if(is_user_logged_in()) {
        $professor = sanitize_text_field($data['professorId']);

        $existQuery = new WP_Query(array(
            'author' => get_current_user_id(),
            'post_type' => 'like',
            'meta_query' => array(
                array(
                'key' => 'liked_professor_id',
                'compare' => '=',
                'value' => $professor,
                )
            )
        ));

        // if statement which prevents users from liking profesor more than one time
        if($existQuery->found_posts == 0 AND get_post_type($professor) == 'professor') {
            // create new like post
            // this WP function will enable us to programatically create new post right from our PHP code
            return wp_insert_post(array(
                'post_type' => 'like',
                'post_status' => 'publish',
                'post_title' => '2nd PHP Test',
                'meta_input' => array(
                    'liked_professor_id' => $professor
                )
            ));
        }else {
            die("Invalid professor ID.");
        }    
    }else {
        die("Only logged in users can create a like.");
    }
}

function deleteLike($data) {
    $likeId = sanitize_text_field($data['like']);

    if(get_current_user_id() == get_post_field('post_author' ,$likeId) AND get_post_type($likeId) == 'like') {
        wp_delete_post($likeId, true);
        return 'Congrats, like deleted';
    }else {
        die("You don't have permission to delete this.");
    }
    
}


add_action('rest_api_init', 'univeristyLikeRoutes');