<?php 
get_header(); 

pageBanner(array(
  'title' => 'Our Campuses',
  'subtitle' => 'We have several conveniently located campuses.',
));
?>


	<div class="container container--narrow page-section">
		<?php // we use while loop because we want to do something once for each blog post
		while(have_posts()) {
			the_post(); ?>

				<li><a href="<?php the_permalink();?>"><?php the_title(); ?></a></li>

			<?php
			}
			// making paginaton of posts
			echo paginate_links();
			?>

	</div>

<?php get_footer(); ?>
