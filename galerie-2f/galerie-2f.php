<?php
/**
 * Plugin Name: Galerie 2F
 * Description: Galerie photos filtrable (catégories et sous-catégories) gérable sans code. Utiliser le shortcode [galerie_2f].
 * Version:     1.2
 * Author:      Malcolm (2F PUB)
 * Author URI:  https://www.2fpub.fr
 * Text Domain: galerie-2f
 * Requires at least: 5.8
 * Requires PHP: 7.2
 * License:     GPL-2.0-or-later
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'GALERIE_2F_VERSION', '1.2' );
define( 'GALERIE_2F_RELEASE_NAME', 'Logo Lumineux' );
define( 'GALERIE_2F_FILE', __FILE__ );
define( 'GALERIE_2F_DIR', plugin_dir_path( __FILE__ ) );
define( 'GALERIE_2F_URL', plugin_dir_url( __FILE__ ) );
define( 'GALERIE_2F_OPTION', 'galerie_2f_photos' );

require_once GALERIE_2F_DIR . 'includes/categories.php';
require_once GALERIE_2F_DIR . 'includes/data.php';
require_once GALERIE_2F_DIR . 'includes/frontend.php';

if ( is_admin() ) {
	require_once GALERIE_2F_DIR . 'includes/admin.php';
}

add_action( 'init', 'galerie_2f_register_block' );
add_action( 'elementor/widgets/register', 'galerie_2f_register_elementor_widget' );

/**
 * Bloc Gutenberg « Galerie 2F » (rendu côté serveur, aucun build nécessaire).
 */
function galerie_2f_register_block() {
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}
	register_block_type(
		GALERIE_2F_DIR . 'blocks/galerie-2f',
		array(
			'render_callback' => 'galerie_2f_render',
		)
	);
}

/**
 * Widget Elementor « Galerie 2F ».
 *
 * @param \Elementor\Widgets_Manager $widgets_manager Gestionnaire de widgets.
 */
function galerie_2f_register_elementor_widget( $widgets_manager ) {
	require_once GALERIE_2F_DIR . 'includes/elementor-widget.php';
	$widgets_manager->register( new Galerie_2F_Elementor_Widget() );
}

/**
 * Lien « Gérer les photos » dans la liste des extensions.
 *
 * @param array $links Liens existants.
 * @return array
 */
function galerie_2f_action_links( $links ) {
	$url = admin_url( 'admin.php?page=galerie-2f' );
	array_unshift( $links, '<a href="' . esc_url( $url ) . '">' . esc_html__( 'Gérer les photos', 'galerie-2f' ) . '</a>' );
	return $links;
}
add_filter( 'plugin_action_links_' . plugin_basename( __FILE__ ), 'galerie_2f_action_links' );
