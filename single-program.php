<?php 

get_header();

while(have_posts()) {
    the_post(); 
    
pageBanner();
    ?>

    <div class="container container--narrow page-section">
        <div class="metabox metabox--position-up metabox--with-home-link">
          <p><a class="metabox__blog-home-link" href="<?php echo get_post_type_archive_link('program');?>"><i class="fa fa-home" aria-hidden="true"></i>All Programs</a> <span class="metabox__main"><?php the_title(); ?></span></p>
        </div> 

            <div class="generic-content"><?php the_content(); ?></div>

            <?php 

// CUSTOM QUERY TO SHOW RELATED PROFESSORS TO CERTAIN PROGRAMS
          $relatedProfessors = new WP_Query(array(
              'posts_per_page' => -1,
              'post_type' => 'professor',
              'orderby' => 'title',
              'order' => 'ASC',
              'meta_query' => array(
                array(
                    'key' => 'related_program',
                    'compare' => 'LIKE',
                    'value' => '"' . get_the_ID() . '"',
                )
              )
            ));

            if($relatedProfessors->have_posts()) {
              echo '<h2 class="section-break">';
              echo '<h2 class="headline headline--medium">' . get_the_title() . ' Professors</h2>';

            echo '<ul class="professor-cards">';
              while($relatedProfessors->have_posts()) {
                $relatedProfessors->the_post(); ?>

              <li class="professor-card__list-item">
                <a class="professor-card" href="<?php the_permalink(); ?>">
                  <img class="professor-card__image" src="<?php the_post_thumbnail_url('professorLandscape')?>">
                  <span class="professor-card__name"><?php the_title(); ?></span>
                </a>
              </li>
 
          <?php
            }
            echo '</ul>';
          }

          wp_reset_postdata(); // this function resets the ID from the query we used to page one, so WP will be able to pull ID of the page on upcoming query

// what we did here is that we used our custom query made for events and moditifed it in the way that it will show relatable events to the program on our single-program.php 
// we copied custom query along with the while loop from the single-event.php
// in meta query we made new array after that "default" one where we filtered out events and made only ones reletable to show up


// CUSTOM QUERY TO SHOW RELATED UPCOMING EVENTS ON CERTAIN PROGRAMS PAGES
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

// what we did here is that we wraped our while loop inside an if statement to show upcoming events for certain program, if there is no events associated with certain program it will show nothing
            if($homepageEvents->have_posts()) {
              echo '<h2 class="section-break">';
            echo '<h2 class="headline headline--medium">Upcoming ' . get_the_title() . ' Events</h2>';

            while($homepageEvents->have_posts()) {
              $homepageEvents->the_post(); 

              get_template_part('template-parts/content-event');

            }
            }

          ?>

    </div>
    
 <?php }

get_footer();

?>