<div class="post-item">
    <h2 class="headline headline--medium headline--post-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>

<div class="generic-content">
    <!-- we made this custom function in our functions.php which makes excerpts from our text custom fields made in ACF -->
    <?php echo custom_field_excerpt(); ?>
    <p><a class="btn btn--blue" href="<?php the_permalink();?>">View Program</a></p>
    </div>
</div>