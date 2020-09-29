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
          <p><a class="metabox__blog-home-link" href="<?php echo get_post_type_archive_link('event');?>"><i class="fa fa-home" aria-hidden="true"></i>Events Home</a> <span class="metabox__main"><?php the_title(); ?></span></p>
        </div> 

            <div class="generic-content">
                <?php the_content(); ?>
            </div>

            <?php 
// what we did here is that we firstly made variable to store our ACF data for related program field, after that we made foreach loop since ACF gives us array of data for every program we made, and using that we were able to echo out the title of the program with the permalink connected
// after that we put it all in the if statement so HTML tags we put won't show up if there is no related program selected for event
// and we wraped everything in the ul - unordered list tag
                $relatedPrograms = get_field('related_program');
                
                if($relatedPrograms) {

                    echo '<h2 class="section-break">';
                    echo '<h2 class="headline headline--medium">Related Program(s):</h2>';
                    echo '<ul class="link-list min-list">';

                        foreach($relatedPrograms as $program) { ?>
                            
                            <li><a href="<?php echo get_the_permalink($program);?>"><?php echo get_the_title($program); ?></a></li>
                    
                    <?php } 
                    echo '</ul>'; 
                    ?>

                <?php } ?>
                

                
    </div>
    
 <?php }

get_footer();

?>