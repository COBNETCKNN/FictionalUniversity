<?php get_header(); 

pageBanner(array(
  'title' => 'Search Results',
  'subtitle' => 'You searched for &ldquo;' . esc_html(get_search_query(false)) . '&rdquo;',
));
?>

  <div class="container container--narrow page-section">
    <?php // we use while loop because we want to do something once for each blog post
      
      if(have_posts()) {
        while(have_posts()) {
        the_post(); 
        
            get_template_part('template-parts/content', get_post_type());
        }
            // making paginaton of posts
            echo paginate_links();
        } else {
          echo '<h2 class="headline headline--small-plus">No results match that search.</h2>';
      }

      // special WP function which will pull HTML for our searchform.php file
      get_search_form();

    ?>



  </div>

<?php get_footer(); ?>