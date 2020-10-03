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




// TEMPLATE PARTS
// this is our way of getting rid of duplicate HTML code in our theme, we make a template part and use function get_template_part(); with arguments for path to it and show it off in the frontend, so our code looks cleaner

?>


