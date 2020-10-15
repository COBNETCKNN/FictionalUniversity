<?php 
get_header(); 

pageBanner(array(
  'title' => 'Our Campuses',
  'subtitle' => 'We have several conveniently located campuses.',
));
?>


	<div class="container container--narrow page-section">
		<div class="cotainer flex flex-wrap justify-center ">
			 <?php 
			
				while(have_posts()) {
				the_post(); 
				?>
				

				<div class=" w-1/3 max-w-xs rounded overflow-hidden shadow-lg p-2">
					<img class="w-full" src="<?php echo get_field('card_thumbnail_image');?>">
						<div class="px-6 py-4">
						<div class="font-bold text-xl mb-2"><?php the_title(); ?></div>
						<p class="text-grey-darker text-base">
						<?php echo wp_trim_words(get_the_content(), 25); ?>
						</p>
						</div>
						<li class="flex justify-center"><a href="<?php the_permalink();?>"><button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Read more</button></a></li>
				</div>
		
						
				<?php
					}
				?>

			<!-- 	<li><a href="<?php the_permalink();?>"><?php the_title(); ?></a></li> -->


			<?php /**
			}  */
			// making paginaton of posts
			echo paginate_links();
			?>
		</div>
	</div>

<?php get_footer(); ?>
