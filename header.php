  <?php // adding english language via wordpress function ?>
<html <?php language_attributes(); ?>>
  <head>
    <?php // telling wordpress which characters of the language it can expect ?>
    <meta charset="<?php bloginfo('charset');?>">

    <?php // making site responsive for mobile devices... if wordpress isn't resposnive and we know that it has CSS adapted for mobile devices we probably are missing this meta tag ?>
      <meta name="viewport" content="width=device-width", initial-scale=1>

    <?php // allowing wordpress to take control over our header section ?>
      <?php wp_head(); ?>


      <?php 
      // Including our Leaflet CSS and JS files in header to load only on campust Post Type
      if(get_post_type() == 'campus'){ ?>

       <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
   integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
   crossorigin=""/>

 <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
   integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
   crossorigin=""></script> 

        <?php
      } ?>
            
  </head>
  <?php // wordpress function for making classes for every page we have so we can use them in CSS and JS ?>
  <body <?php body_class(); ?>>
      <header class="site-header">
        <div class="container">
          <h1 class="school-logo-text float-left">
            <a href="<?php echo site_url()?>"><strong>Fictional</strong> University</a>
          </h1>
          <span class="js-search-trigger site-header__search-trigger"><i class="fa fa-search" aria-hidden="true"></i></span>
          <i class="site-header__menu-trigger fa fa-bars" aria-hidden="true"></i>
          <div class="site-header__menu group">
            <nav class="main-navigation">

<!--
              <?php 
              // dinamic menus which we learned how to use and we commented out
              // putting menu we made in functions.php and customize in 'menus' section onto page
              wp_nav_menu(array(
                'theme_location' => 'headerMenuLocation',
              )); ?>
 -->             

              <ul>
                <?php // making links on header clickable and if statement to add class to HTML element if the current page is About Us or if the children's page parent page is About Us?>
                <li <?php if(is_page('about-us') or wp_get_post_parent_id(0) == 11) echo 'class="current-menu-item"'?>><a href="<?php echo site_url('/about-us')?>">About Us</a></li>
                <li <?php if(get_post_type() == 'program') echo 'class="current-menu-item"' ?>><a href="<?php echo get_post_type_archive_link('program')?>">Programs</a></li>
                <li <?php if(get_post_type() == 'event' OR is_page('past-events')) echo 'class="current-menu-item"' ?>><a href="<?php echo get_post_type_archive_link('event');?>">Events</a></li>
                <li <?php if(get_post_type() == 'campus') echo 'class="current-menu-item"' ?>><a href="<?php echo get_post_type_archive_link('campus');?>">Campuses</a></li>
                <li <?php if(get_post_type() == 'post') echo 'class="current-menu-item"'?>><a href="<?php echo site_url('/blog')?>">Blog</a></li>
              </ul>
            </nav>
            <div class="site-header__util">
              <a href="#" class="btn btn--small btn--orange float-left push-right">Login</a>
              <a href="#" class="btn btn--small btn--dark-orange float-left">Sign Up</a>
              <span class="search-trigger js-search-trigger"><i class="fa fa-search" aria-hidden="true"></i></span>
            </div>
          </div>
        </div>
      </header>
