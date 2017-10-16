<?php
/**
 * Template Name: Work
 */


if ( ! class_exists( 'Timber' ) ) {
	echo 'Timber not activated. Make sure you activate the plugin in <a href="/wp-admin/plugins.php#timber">/wp-admin/plugins.php</a>';
	return;
}
$context = Timber::get_context();

$context['pagination'] = Timber::get_pagination();

// We can access the loop of WordPress posts with the 'posts' variable.

$post = new TimberPost();
$context['post'] = $post;
$context['cats'] = Timber::get_terms('categories');


// $args = new WP_Query(array(
//   'post_type'       => array('post'),
//   'post_status'     => 'publish',
//   'order'           => 'DESC'
// ));


// $posts = Timber::get_posts($args);

// If we are on the home page, add a few other templates to our hierarchy.

$templates = array( 'work.twig' );


Timber::render( $templates, $context );
