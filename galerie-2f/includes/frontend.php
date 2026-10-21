<?php
/**
 * Affichage public : shortcode [galerie_2f].
 *
 * @package Galerie2F
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_shortcode( 'galerie_2f', 'galerie_2f_render' );
add_action( 'wp_enqueue_scripts', 'galerie_2f_register_assets' );

/**
 * Enregistre (sans charger) les fichiers CSS/JS du front.
 */
function galerie_2f_register_assets() {
	wp_register_style(
		'galerie-2f-fonts',
		'https://fonts.googleapis.com/css2?family=Righteous&family=Red+Hat+Display:wght@400;500;600;700&display=swap',
		array(),
		null // phpcs:ignore WordPress.WP.EnqueuedResourceParameters.MissingVersion
	);
	wp_register_style( 'galerie-2f', GALERIE_2F_URL . 'assets/front.css', array( 'galerie-2f-fonts' ), GALERIE_2F_VERSION );
	wp_register_script( 'galerie-2f', GALERIE_2F_URL . 'assets/front.js', array(), GALERIE_2F_VERSION, true );
}

/**
 * Icône flèche des onglets avec sous-menu.
 *
 * @return string SVG statique.
 */
function galerie_2f_caret_svg() {
	return '<svg class="f2g-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';
}

/**
 * HTML des filtres (onglets + sous-menus).
 *
 * @param array $categories Catégories.
 * @return string
 */
function galerie_2f_filters_html( $categories ) {
	$html  = '<div class="f2g-filters">';
	$html .= '<button type="button" class="f2g-tab active" data-cat="all">' . esc_html__( 'Tous', 'galerie-2f' ) . '</button>';

	foreach ( $categories as $key => $cat ) {
		if ( empty( $cat['subs'] ) ) {
			$html .= '<button type="button" class="f2g-tab" data-cat="' . esc_attr( $key ) . '">' . esc_html( $cat['label'] ) . '</button>';
			continue;
		}
		$html .= '<div class="f2g-tabwrap" data-cat="' . esc_attr( $key ) . '">';
		$html .= '<button type="button" class="f2g-tab" data-cat="' . esc_attr( $key ) . '" data-label="' . esc_attr( $cat['label'] ) . '">'
			. '<span class="f2g-tablabel">' . esc_html( $cat['label'] ) . '</span>' . galerie_2f_caret_svg() . '</button>';
		$html .= '<div class="f2g-menu">';
		$html .= '<button type="button" class="f2g-item f2g-item-all" data-sub="">' . esc_html( $cat['all_label'] ) . '</button>';
		$html .= '<div class="f2g-sep"></div>';
		foreach ( $cat['subs'] as $sub_key => $sub_label ) {
			$html .= '<button type="button" class="f2g-item" data-sub="' . esc_attr( $sub_key ) . '">' . esc_html( $sub_label ) . '</button>';
		}
		$html .= '</div></div>';
	}

	$html .= '</div>';
	return $html;
}

/**
 * Rendu du shortcode [galerie_2f], du bloc et du widget Elementor.
 * Charge CSS/JS uniquement ici, donc uniquement sur les pages qui affichent la galerie.
 *
 * @return string
 */
function galerie_2f_render() {
	static $done = false;
	if ( $done ) {
		return ''; // Une seule galerie par page (identifiants HTML uniques).
	}
	$done = true;

	galerie_2f_register_assets(); // Sûr si appelé avant wp_enqueue_scripts (ex. aperçu).
	wp_enqueue_style( 'galerie-2f' );
	wp_enqueue_script( 'galerie-2f' );

	$categories = galerie_2f_get_categories();
	$json       = wp_json_encode(
		galerie_2f_get_front_photos(),
		JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT
	);

	$html  = '<div id="f2g-gallery">';
	$html .= galerie_2f_filters_html( $categories );
	$html .= '<div class="f2g-grid"></div>';
	$html .= '<div class="f2g-slider-ui" hidden><div class="f2g-progress"><span></span></div>'
		. '<p class="f2g-hint"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="4" y1="12" x2="20" y2="12"/><polyline points="14 6 20 12 14 18"/></svg>'
		. '<span class="f2g-hint-count"></span><span class="f2g-hint-text">' . esc_html__( 'Faites glisser pour voir la suite', 'galerie-2f' ) . '</span></p></div>';
	$html .= '<div class="f2g-empty">'
		. '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>'
		. '<p class="f2g-empty-title">' . esc_html__( 'Rien à voir ici pour l’instant…', 'galerie-2f' ) . '</p>'
		. '<p class="f2g-empty-text">' . esc_html__( 'De nouvelles réalisations arrivent bientôt dans cette catégorie !', 'galerie-2f' ) . '</p>'
		. '</div>';
	$html .= '</div>';
	$html .= '<div id="f2g-lightbox" aria-hidden="true"><button type="button" class="f2g-close" aria-label="' . esc_attr__( 'Fermer', 'galerie-2f' ) . '">&times;</button><img src="" alt=""></div>';
	$html .= '<script type="application/json" id="f2g-data">' . $json . '</script>';

	return $html;
}
