<?php

// Check timber is installed and activated
if ( ! class_exists( 'Timber' ) ) {
	add_action( 'admin_notices', function() {
			echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php' ) ) . '</a></p></div>';
		} );
	return;
}

/*
** Core Timber site setup
*/

// Define location for twig to render templates
Timber::$dirname = array('templates', 'views');

// Initiate the overall twig site object
require_once('lib/site-options.php');

// Enqueue scripts
require_once('lib/enqueue-scripts.php');

/**
**  Requiring files
**/

// Content Hooks, E.G. when uploading an image to a WordPress post
// require_once('lib/content-hooks.php');

// Custom functions
require_once('lib/custom-functions.php');

// Search
require('lib/search.php');


/*
** Adding Classes
*/
// Add to body class
add_filter('body_class','my_class_names');
function my_class_names($classes) {

    // if ( is_search() ){
    //   $classes[] = 'search-active';
    // }
    return $classes;
}

add_filter( 'wpseo_metabox_prio', function() { return 'low';});

?>
