<?php
/**
 * Plugin Name:       Accordion
 * Description:       Example block written with ESNext standard and JSX support – build step required.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       accordion
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_accordion_block_init() {
	register_block_type( __DIR__ . '/build/accordion-container' );
	register_block_type( __DIR__ . '/build/accordion-item' );
	register_block_type( __DIR__ . '/build/accordion-header' );
	register_block_type( __DIR__ . '/build/accordion-content' );

}
add_action( 'init', 'create_block_accordion_block_init' );

function accordion_enqueue() {
	if (has_block('accordion/accordion-container')) {
		wp_enqueue_style('accordion-css', plugins_url('/assets/accordion.min.css', __FILE__), '1.0', 'all');
		wp_enqueue_script('accordion-js', plugins_url('/assets/accordion.min.js', __FILE__), '', '1.0',  true);
	}

}
add_action( 'wp_enqueue_scripts', 'accordion_enqueue' );

function accordion_load_block_editor_assets() { //this function loads assets necessary for editing content in the block editor. Front end loading is handled via the load_assets function.
	wp_enqueue_script('accordionlink-attribute', plugins_url('/src/fn-add-attributes-core-blocks.js', __FILE__), '', '1.0',  true);

}
add_action( 'enqueue_block_editor_assets', 'accordion_load_block_editor_assets');
