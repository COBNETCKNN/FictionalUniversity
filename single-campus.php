<?php 

get_header();

while(have_posts()) {
    the_post(); 

    pageBanner();
    ?>

    <div class="container container--narrow page-section">
        <div class="metabox metabox--position-up metabox--with-home-link">
            <p><a class="metabox__blog-home-link" href="<?php echo get_post_type_archive_link('campus');?>"><i class="fa fa-home" aria-hidden="true"></i>All Campuses</a> <span class="metabox__main"><?php the_title(); ?></span></p>
          </div> 

            <div class="generic-content"><?php the_content(); ?></div>

           <?php 

            // custom query to show related programs on our pages for campuses
          $relatedPrograms = new WP_Query(array(
              'posts_per_page' => -1,
              'post_type' => 'program',
              'orderby' => 'title',
              'order' => 'ASC',
              'meta_query' => array(
                array(
                    'key' => 'related_campus',
                    'compare' => 'LIKE',
                    'value' => '"' . get_the_ID() . '"',
                )
              )
            ));

            if($relatedPrograms->have_posts()) {
              echo '<h2 class="section-break">';
              echo '<h2 class="headline headline--medium">Programs Available At This Campus</h2>';

            echo '<ul class="min-list link-list">';
              while($relatedPrograms->have_posts()) {
                $relatedPrograms->the_post(); ?>

              <li>
                <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
              </li>
 
          <?php
                }
            echo '</ul>';
            } 
             wp_reset_postdata();
          ?>

            <hr class="section-break">

            <!-- Leaflet map div withID for customizing in CSS and displaying onto frontend -->
            <div id="map"></div>

            <script>
                var map = L.map('map', {scrollWheelZoom:false}).setView(
                    [<?php echo get_field('latitude'); ?>, <?php echo get_field('longitude');?>], 11);

                L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                }).addTo(map);

                L.marker([<?php echo get_field('latitude'); ?>, <?php echo get_field('longitude');  ?>])
                .addTo(map)
                .bindPopup('<h2><?php the_title();?></h2>').openPopup();
            </script>
                
    </div>
    
    <?php 
            }
get_footer();

?>