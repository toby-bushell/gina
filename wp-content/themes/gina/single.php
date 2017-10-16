<?php
/**
 * The Template for displaying all single posts
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */

$context = Timber::get_context();
$post = Timber::query_post();
$context['post'] = $post;
$context['categories'] = Timber::get_terms('category');

Timber::render( array( 'page-' . $post->post_name . '.twig', 'page.twig' ), $context );
