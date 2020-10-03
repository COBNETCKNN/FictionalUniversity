<?php get_header(); 

// what we did here is that we made custom page for page we made in our admin dashboard for events that happened in the past... to make it connect with file we made, we just have to put slug of our page into the name of the file... in this case page-past-events.php 
// further on we edited default WP query without making new, and this down there is example how to do it


pageBanner(array(
  'title' => 'Past Events',
  'subtitle' => 'A recap of our past events.',
));
?>

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
        $pastEvents->the_post(); 

        get_template_part('template-parts/content-event');

      }
// making custom query pagination work which is different from default WP one
      echo paginate_links(array(
          'total' => $pastEvents->max_num_pages
      ));
    ?>

<?php get_footer(); ?>