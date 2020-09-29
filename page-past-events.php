<?php get_header(); 

// what we did here is that we made custom page for page we made in our admin dashboard for events that happened in the past... to make it connect with file we made, we just have to put slug of our page into the name of the file... in this case page-past-events.php 
// further on we edited default WP query without making new, and this down there is example how to do it
?>

  <div class="page-banner">
    <div class="page-banner__bg-image" style="background-image: url(<?php echo get_theme_file_uri('/images/ocean.jpg')?>);"></div>
    <div class="page-banner__content container container--narrow">
      <h1 class="page-banner__title">Past Events</h1>
      <div class="page-banner__intro">
        <p>A recap of our past events.</p>
      </div>
    </div>  
  </div>

  <div class="container container--narrow page-section">
    <?php // we use while loop because we want to do something once for each blog post

            $today = date('Ymd');
            $pastEvents = new WP_Query(array(
                // what this does is that it says to wordpress go out and find paged number and if there isn't that means we are on first page of results
                'paged' => get_query_var('paged', 1),
                'post_type' => 'event',
                'meta_key' => 'event_date',
                'orderby' => 'meta_value_num',
                'order' => 'ASC',
                'meta_query' => array(
                    array(
                        'key' => 'event_date',
                        'compare' => '<',
                        'value' => $today,
                        'type' => 'numeric'
                    )
                )
                ));


      while($pastEvents->have_posts()) {
        $pastEvents->the_post(); ?>

    <div class="event-summary">
        <a class="event-summary__date t-center" href="#">
              <span class="event-summary__month"><?php 
// what we did here is explained in front-page.php under events
                $eventDate = new DateTime(get_field('event_date'));
                echo $eventDate->format('M')
              ?></span>
              <span class="event-summary__day"><?php        
                echo $eventDate->format('d')
              ?></span>
            </a>
        <div class="event-summary__content">
            <h5 class="event-summary__title headline headline--tiny"><a href="<?php the_permalink();?>"><?php the_title(); ?></a></h5>
            <p><?php echo wp_trim_words(get_the_content(), 18); ?><a href="<?php the_permalink();?>" class="nu gray">Learn more</a></p>
        </div>
    </div>


    <?php
      }
// making custom query pagination work which is different from default WP one
      echo paginate_links(array(
          'total' => $pastEvents->max_num_pages
      ));
    ?>

<?php get_footer(); ?>