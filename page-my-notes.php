<?php 

// what we did here is that users which arn't logged in onto our site won't be able to see /my-notes page we made, instead they will get redirected to homepage since there could be sensitive data in some of the notes
if(!is_user_logged_in()) {
    wp_redirect(esc_url(site_url('/')));
    exit;
}

get_header();

while(have_posts()) {
    the_post(); 
    
    pageBanner();
    ?>

  <div class="container container--narrow page-section">

    <div class="create-note">
        <h2 class="headline headline--medium">Create New Note</h2>
        <input class="new-note-title" placeholder="Title">
        <textarea class="new-note-body" placeholder="Your note here..." ></textarea>
        <span class="submit-note">Create Note</span>
        <span class="note-limit-message">Note limite reached: delete an existing note to make room for a new one.</span>
    </div>
    <ul class="min-list link-list" id="my-notes">
        <?php 
            // we made variable where we stored all the data from notes post type and customized it
            $userNotes = new WP_Query(array(
                'post_type' => 'note',
                'posts_per_page' => -1,
                // this parameter will pull posts only made by user who is logged in
                'author' => get_current_user_id()
            ));

            while($userNotes->have_posts()) {
                $userNotes->the_post(); ?>

                    <!-- Whenever we are using function to pull data in wordpress we want to wrap it around esc_attr(); function for security reasons -->
                    <li data-id="<?php the_ID(); ?>">
                    <!-- down below we used WP function str_replace(); where we replaced word "Private:" with empty string which comes as a default when displaying titles if posts are set to be private  -->
                        <input readonly class="note-title-field" value="<?php echo str_replace('Private: ', '', esc_attr(get_the_title())); ?>">
                        <span class="edit-note"><i class="fa fa-pencil" aria-hidden="true"></i>Edit</span>
                        <span class="delete-note"><i class="fa fa-trash-o" aria-hidden="true"></i>Delete</span>
                        <textarea readonly class="note-body-field"><?php echo esc_textarea(get_the_content()); ?></textarea>
                        <span class="update-note btn btn--blue btn--small"><i class="fa fa-arrow-right" aria-hidden="true"></i>Save</span>
                    </li>

        <?php
            }
        ?>
    </ul>

  </div>
    
<?php }

    get_footer();

?>