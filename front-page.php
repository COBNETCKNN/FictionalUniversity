<?php get_header(); ?>


<?php 
    // return function means my work here is done, when we use "return" instead echo PHP won't show it on the page, instead it will memorize it
    // if wordpress function begins with the get, it won't do anything it will just memorize the value which you can use later on
    // if wordpress function begins with the, it will echo out the result onto the page
?>



<div class="page-banner">
      <div class="page-banner__bg-image" style="background-image: url(<?php echo get_theme_file_uri('/images/library-hero.jpg')?>);"></div>
      <div class="page-banner__content container t-center c-white">
        <h1 class="headline headline--large">Welcome!</h1>
        <h2 class="headline headline--medium">We think you&rsquo;ll like it here.</h2>
        <h3 class="headline headline--small">Why don&rsquo;t you check out the <strong>major</strong> you&rsquo;re interested in?</h3>
        <a href="<?php echo get_post_type_archive_link('program')?>" class="btn btn--large btn--blue">Find Your Major</a>
      </div>
    </div>


<!-- EVENT FRONTPAGE SECTION  -->


    <div class="full-width-split group">
      <div class="full-width-split__one">
        <div class="full-width-split__inner">
          <h2 class="headline headline--small-plus t-center">Upcoming Events</h2>

          <?php 
// - DISPLAYING CUSTOM POST TYPE EVENTS - what we did here is that we firstly had to make custom query "WO_Query" which we stored in variable $homepageEvents with whom we connected our newly made custom post type via "posty_type => 'event,"


            $today = date('Ymd');
            $homepageEvents = new WP_Query(array(
              'posts_per_page' => 2,
// putting posts_per_page to -1 is PHP way for showing all posts on the frontend
              'post_type' => 'event',
              'meta_key' => 'event_date',
              'orderby' => 'meta_value_num',
              'order' => 'ASC',
              'meta_query' => array(
                array(
                  'key' => 'event_date',
                  'compare' => '>=',
                  'value' => $today,
                  'type' => 'numeric'
                  // on english language it means only show us dates where event date is greater or equeal to today's date
                )
              )
              // meta_value - meta in the value means all the extra or custom data associated with the post, in this case our custom field we made in ACF, also we added meta_value_num so wordpress knows for what type of date to look at
              // meta_query - acts as a sort of filter to get fine data for events we are outputing, using this we were able to sort out events that happened in the past and show only ones which are upcoming considering today's date
            ));

            while($homepageEvents->have_posts()) {
              $homepageEvents->the_post(); 

// what we did here is that we used get_template_part(); fucntion so our code looks much cleaner... in order to use this function we firstly had to make new folder named template-parts and inside it we made file event.php where we copied html code which repeats itself on our theme more than one time
// second argument: To use this function with subfolders in your theme directory, simply prepend the folder name before the slug. For example, if you have a folder called “partials” in your theme directory and a template part called “content-page.php” in that sub-folder, you would use get_template_part() like this: get_template_part( 'partials/content', 'page' );
              get_template_part('template-parts/content', 'event');



            }
          ?>

          <p class="t-center no-margin"><a href="<?php echo get_post_type_archive_link('event');?>" class="btn btn--blue">View All Events</a></p>
        </div>
      </div>
      <div class="full-width-split__two">
        <div class="full-width-split__inner">
          <h2 class="headline headline--small-plus t-center">From Our Blogs</h2>




<!-- BLOG FRONTPAGE SECTION -->



              <?php 
              
                // making custom query, we start making it by making variable
                $homepagePosts = new WP_Query(array(
                    'posts_per_page' => 2,
                ));

                while($homepagePosts->have_posts()) {
                $homepagePosts->the_post(); ?>

                <div class="event-summary">
                    <a class="event-summary__date event-summary__date--beige t-center" href="<?php the_permalink();?>">
                        <span class="event-summary__month"><?php the_time('M'); ?></span>
                        <span class="event-summary__day"><?php the_time('d'); ?></span>
                    </a>
                    <div class="event-summary__content">
                        <h5 class="event-summary__title headline headline--tiny"><a href="<?php the_permalink();?>"><?php the_title(); ?></a></h5>
                        <p><?php if(has_excerpt()) {
                          echo get_the_excerpt();
                          // we saw some design gaps between headline and the text, solution for that is that we echoed out get_the_excerpt instead of typing out get_excerpt
                        } else {
                          echo wp_trim_words(get_the_content(), 18);
                        } 
                          // what we did here is that with if statement we made use of excerpt option on wordpress dashboard to show it off on the page, but if client haven't put anything in it it will use first 18 words of the article
                        ?>
                        
                        <a href="<?php the_permalink();?>" class="nu gray">Read more</a></p>
                    </div>
                </div>



<!--
                // this sort of while loop is tied to default query, we made our own to customize what we want to see on our page
              while(have_posts()) {
                the_post(); ?>

                <li><?php the_title(); ?></li>
-->


            <?php
              } 
              // this function will reset wordpress data and variables to deafult after our custom query and it's nice habit to use this every time we make custom query
              wp_reset_postdata();
              
              ?>
          <?php // site_url() function is used on button when we have file named for certain site and in argument it has to contain that file name ?>
          <p class="t-center no-margin"><a href="<?php echo site_url('/blog');?>" class="btn btn--yellow">View All Blog Posts</a></p>
        </div>
      </div>
    </div>

    


    <?php if( have_rows('slider') ): ?>

    
      <div class="hero-slider">
      <div class="slider__bullets glide__bullets" data-glide-el="controls[nav]"></div>
        <div data-glide-el="track" class="glide__track">
          <div class="glide__slides">
            

    <?php while( have_rows('slider') ): the_row(); 
        $image = get_sub_field('picture');
        ?>
      
          <div class="hero-slider__slide" style="background-image: url(<?php echo $image?>);">
            <div class="hero-slider__interior container">
              <div class="hero-slider__overlay">
                <h2 class="headline headline--medium t-center"><?php echo get_sub_field('title'); ?></h2>
                <p class="t-center"><?php echo get_sub_field('subtitle'); ?></p>
                <p class="t-center no-margin"><a href="#" class="btn btn--blue">Learn more</a></p>
              </div>
            </div>
          </div>
        
    <?php endwhile; ?>

        </div>
      </div>
    </div>

<?php endif; ?>

<?php get_footer(); ?>