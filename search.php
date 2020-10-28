<?php get_header(); 

pageBanner(array(
  'title' => 'Search Results',
  // here we used esc_html(get_search_query(false)) function to pull what user has typed in search form and display it on our frontend
  // &ldquo is " for left side, and &rdquo is " for right side
  'subtitle' => 'You searched for &ldquo;' . esc_html(get_search_query(false)) . '&rdquo;',
));
?>

  <div class="container container--narrow page-section">
    <?php // we use while loop because we want to do something once for each blog post
      
      if(have_posts()) {
        while(have_posts()) {
        the_post(); 
        
        // what we did her is that we used get_template_part() WP function which will pull HTML from our template-parts folder, which allowes us to customize style of different post types search results
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