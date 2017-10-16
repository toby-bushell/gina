<?php

class StarterSite extends TimberSite {

	function __construct() {
		add_theme_support( 'post-formats');
		add_theme_support( 'post-thumbnails' );
		add_theme_support( 'menus' );
		add_filter( 'timber_context', array( $this, 'add_to_context' ) );
		add_filter( 'get_twig', array( $this, 'add_to_twig' ) );
		add_action( 'init', array( $this, 'register_post_types' ) );
		add_action( 'init', array( $this, 'register_taxonomies' ) );
		add_action( 'init', array( $this, 'register_menus' ) );

		add_image_size( 'hero', 1500 );
		parent::__construct();
	}

	function register_post_types() {
    require('content-types.php');
	}

	function register_taxonomies() {
    require('register-tax.php');
  }

  function register_menus(){
    require('register-menus.php');
  }

  function add_to_context( $context ) {

    // Our menu occurs on every page, so we add it to the global context.

    if (has_nav_menu('primary_menu')){ // First check whether a registered menu location has a menu assigned
      $context['menu'] = new TimberMenu('primary_menu');
    }
    if (has_nav_menu('footer_menu')){
      $context['footer_menu'] = new TimberMenu('footer_menu');
    }


    // This 'site' context below allows you to access main site information like the site title or description.
    $context['site'] = $this;
    return $context;
	  }

  function add_to_twig( $twig ) {
    /* this is where you can add your own fuctions to twig */
    $twig->addExtension( new Twig_Extension_StringLoader() );
    return $twig;
  }
}

if( function_exists('acf_add_options_page') ) {
	acf_add_options_page();
}
// Add custom options from acf available site wide
add_filter( 'timber_context', 'mytheme_timber_context'  );

function mytheme_timber_context( $context ) {
    $context['options'] = get_fields('option');
    return $context;
}
new StarterSite();

