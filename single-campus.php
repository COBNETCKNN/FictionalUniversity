<?php 

get_header();

while(have_posts()) {
    the_post(); 
    
    pageBanner();
    ?>

    <div class="container container--narrow page-section">

            <div class="generic-content">
                <div class="row group">
                    <div class="one-third"><?php the_post_thumbnail('professorPortrait'); ?></div>
                    <div class="two-thirds"><?php the_content(); ?></div>
                </div>
            </div>

            <h2 class="section-break"></h2>

            <div id="map">
            
            </div>

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
    
 <?php }

get_footer();

?>