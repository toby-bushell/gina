<?php
function my_scripts() {

  $release_version = '1.0.0'; // Changing this forces a cache reset

  if(function_exists('is_wpe') && is_wpe()){ // Check for WPEngine's Prod environment
    $js_folder = '/dist';
    $min_file_suffex = '.min';
  }else{
    $js_folder = '';
    $min_file_suffex = '';
  }

	// Use jQuery from a CDN

	// Enqueue our stylesheet and JS file with a jQuery dependency.
	// Note that we aren't using WordPress' default style.css, and instead enqueueing the file of compiled Sass.
  wp_enqueue_style( 'my-styles', get_template_directory_uri() . '/assets/css/main'.$min_file_suffex.'.css', $release_version);

  // Two commonly used scripts
  // wp_enqueue_script( 'salvatorre-masonry', get_template_directory_uri() . '/assets/js/libs/masonry.min.js', array('jquery'), $release_version, true );
  // wp_enqueue_script( 'scrollreveal', get_template_directory_uri() . '/assets/js/libs/scrollreveal.min.js', $release_version, true );
  wp_enqueue_script( 'clipboard', get_template_directory_uri() . '/assets/js/libs/clipboard.min.js', $release_version, true );

  // wp_enqueue_script( 'babel-polyfill-js', get_template_directory_uri() . '/assets/js/libs/polyfill.min.js', array('jquery'), $release_version, true );
  wp_enqueue_script( 'my-js', get_template_directory_uri() . '/assets/js'. $js_folder .'/main'.$min_file_suffex.'.js', array('jquery'), $release_version, true );
  wp_enqueue_script( 'my-work', get_template_directory_uri() . '/assets/js'. $js_folder .'/work'.$min_file_suffex.'.js', array('jquery'), $release_version, true );

  // Analytics
  // wp_enqueue_script( 'youtube-tracking-js', get_template_directory_uri() . '/assets/js/libs/youtube-analytics.js', array('jquery'), $release_version, true );
}

add_action( 'wp_enqueue_scripts', 'my_scripts' );

// // Add css file to change acf css
// function load_admin_style() {
//   wp_register_style( 'wp-admin.css', get_template_directory_uri() . '/assets/css/admin.css', false );
//   wp_enqueue_style( 'wp-admin.css' );
// }
// add_action( 'admin_enqueue_scripts', 'load_admin_style' );

