<?php 

get_header();

while(have_posts()) {
    the_post(); ?>

    <div class="page-banner">
        <div class="page-banner__bg-image" style="background-image: url(<?php echo get_theme_file_uri('/images/ocean.jpg')?>);"></div>
        <div class="page-banner__content container container--narrow">
            <h1 class="page-banner__title"><?php the_title(); ?></h1>
            <div class="page-banner__intro">
            <p>DON'T FORGET TO REPLACE ME LATER</p>
            </div>
        </div>  
    </div>

    <div class="container container--narrow page-section">
        <div class="metabox metabox--position-up metabox--with-home-link">
          <p><a class="metabox__blog-home-link" href="<?php echo get_post_type_archive_link('program');?>"><i class="fa fa-home" aria-hidden="true"></i>All Programs</a> <span class="metabox__main"><?php the_title(); ?></span></p>
        </div> 

            <div class="generic-content"><?php the_content(); ?></div>

            <?php 

// what we did here is that we used our custom query made for events and moditifed it in the way that it will show relatable events to the program on our single-program.php 
// we copied custom query along with the while loop from the single-event.php
// in meta query we made new array after that "default" one where we filtered out events and made only ones reletable to show up


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
                ),
                array(
                    'key' => 'related_program',
                    'compare' => 'LIKE',
                    'value' => '"' . get_the_ID() . '"',
                    // we added quotation " marks before get_the_ID() function because wordpress wraps around each of the ID values so it can find it easier
                    // if the array of related programs, contains or LIKE (meaning), the ID number of current program post
                )
              )
            ));

            while($homepageEvents->have_posts()) {
              $homepageEvents->the_post(); ?>

          <div class="event-summary">
            <a class="event-summary__date t-center" href="#">
              <span class="event-summary__month"><?php 
                $eventDate = new DateTime(get_field('event_date'));
                echo $eventDate->format('M')
              ?></span>
              <span class="event-summary__day"><?php 
                echo $eventDate->format('d')
              ?></span>
            </a>
            <div class="event-summary__content">
              <h5 class="event-summary__title headline headline--tiny"><a href="<?php the_permalink();?>"><?php the_title(); ?></a></h5>
              <p>
                <?php if(has_excerpt()) {
                  echo get_the_excerpt();
                  } else {
                  echo wp_trim_words(get_the_content(), 18);
                  } 
                ?>
                <a href="<?php the_permalink();?>" class="nu gray">Learn more</a></p>
            </div>
          </div>

          <?php
            }
          ?>

    </div>
    
 <?php }

get_footer();

?>