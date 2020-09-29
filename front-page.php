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
        <a href="#" class="btn btn--large btn--blue">Find Your Major</a>
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
              $homepageEvents->the_post(); ?>

          <div class="event-summary">
            <a class="event-summary__date t-center" href="#">
              <span class="event-summary__month"><?php 
// what we did here is that we made a variable which equeals to PHP class named DateTime in which as a argument we put ACF function to get data, further on we formated the data to show only three letters by looking inside our variable from PHP class
                $eventDate = new DateTime(get_field('event_date'));
                echo $eventDate->format('M')
              ?></span>
              <span class="event-summary__day"><?php 
// we looked inside our variable without making new for date of day format             
                echo $eventDate->format('d')
              ?></span>
            </a>
            <div class="event-summary__content">
              <h5 class="event-summary__title headline headline--tiny"><a href="<?php the_permalink();?>"><?php the_title(); ?></a></h5>
              <p>
                <?php if(has_excerpt()) {
                  echo get_the_excerpt();
// we saw some design gaps between headline and the text, solution for that is that we echoed out get_the_excerpt instead of typing out get_excerpt
                  } else {
                  echo wp_trim_words(get_the_content(), 18);
                  } 
// what we did here is that with if statement we made use of excerpt option on wordpress dashboard to show it off on the page, but if client haven't put anything in it it will use first 18 words of the article
                ?>
                <a href="<?php the_permalink();?>" class="nu gray">Learn more</a></p>
            </div>
          </div>

          <?php
// if the template is not working after we've put the_permalinks and we click on it, make sure that you went to settings->permalinks on WP dashboard and clicked save changes before clicking onto the post

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

    <div class="hero-slider">
      <div data-glide-el="track" class="glide__track">
        <div class="glide__slides">
          <div class="hero-slider__slide" style="background-image: url(<?php echo get_theme_file_uri('/images/bus.jpg')?>);">
            <div class="hero-slider__interior container">
              <div class="hero-slider__overlay">
                <h2 class="headline headline--medium t-center">Free Transportation</h2>
                <p class="t-center">All students have free unlimited bus fare.</p>
                <p class="t-center no-margin"><a href="#" class="btn btn--blue">Learn more</a></p>
              </div>
            </div>
          </div>
          <div class="hero-slider__slide" style="background-image: url(<?php echo get_theme_file_uri('images/apples.jpg')?>);">
            <div class="hero-slider__interior container">
              <div class="hero-slider__overlay">
                <h2 class="headline headline--medium t-center">An Apple a Day</h2>
                <p class="t-center">Our dentistry program recommends eating apples.</p>
                <p class="t-center no-margin"><a href="#" class="btn btn--blue">Learn more</a></p>
              </div>
            </div>
          </div>
          <div class="hero-slider__slide" style="background-image: url(<?php echo get_theme_file_uri('images/bread.jpg')?>);">
            <div class="hero-slider__interior container">
              <div class="hero-slider__overlay">
                <h2 class="headline headline--medium t-center">Free Food</h2>
                <p class="t-center">Fictional University offers lunch plans for those in need.</p>
                <p class="t-center no-margin"><a href="#" class="btn btn--blue">Learn more</a></p>
              </div>
            </div>
          </div>
        </div>
        <div class="slider__bullets glide__bullets" data-glide-el="controls[nav]"></div>
      </div>
    </div>

<?php get_footer(); ?>