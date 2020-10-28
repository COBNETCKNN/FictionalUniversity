<?php 

get_header();

while(have_posts()) {
    the_post(); 
    
    pageBanner();
    ?>




  <div class="container container--narrow page-section">
<?php // we made here if statement since child pages have their ID's but parent pages have ID of zero 0, which in PHP means same as FALSE and will not show results ?>
    <?php 
      $theParent = wp_get_post_parent_id(get_the_ID());
      if ($theParent) { ?>
        <div class="metabox metabox--position-up metabox--with-home-link">
          <p><a class="metabox__blog-home-link" href="<?php echo get_permalink($theParent); ?>"><i class="fa fa-home" aria-hidden="true"></i> Back to <?php echo get_the_title($theParent); ?></a> <span class="metabox__main"><?php the_title(); ?></span></p>
        </div>
    <?php
      }
    ?>


    <?php 
    
    // how to not show menu of child pages if the parent doesn't have one
    $testArray = get_pages(array(
      'child_of' => get_the_ID()
    ));
    
    // if statement to show menu of child pages for parent which have child pages
    if($theParent or $testArray) { ?>

    <div class="page-links">
      <h2 class="page-links__title"><a href="<?php echo get_permalink($theParent);?>"><?php echo get_the_title($theParent); ?></a></h2>
      <ul class="min-list">
        <?php 
        // finding child pages of parent ones
          if($theParent) {
            $findChildrenOf = $theParent;
          } else {
            $findChildrenOf = get_the_ID();
          }
        // customizing menu using associative array
          wp_list_pages(array(
            'title_li' => NULL,
            'child_of' => $findChildrenOf,
            // adding ability to sort out pages in pages wordpress tab
            'sort_column' => 'menu_order'
          ));


        ?>
      </ul>
    </div>

    <?php } ?>

      

<!-- WORDPRESS DEFAULT SEARCH FOR NON-JS USERS -->
    <div class="generic-content">
    <!-- So what we did here is that in our form we set method="get" so what user types in gets reflected onto the url when he presses the Search button
    In our action we added esc_url() which is best WP practice in these situations to protect our site, and inside it we used function which will redirect user to custom URL, in this case it's / since we want to use default WP search 
    http://localhost:3000/?s=math
     -->
        <h4>Perform a New Search:</h4>
        <!-- special WP function which will pull HTML for our searchform.php file -->
          <?php get_search_form(); ?>
    </div>

  </div>
    
 <?php }

get_footer();

?>