<?php
/**
 * Lecture et validation des photos enregistrées.
 *
 * Format stocké (option `galerie_2f_photos`) : liste ordonnée de
 * array( 'id' => (int) ID médiathèque, 'cat' => string, 'sub' => string, 'title' => string ).
 *
 * @package Galerie2F
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'GALERIE_2F_MAX_PHOTOS', 1000 );

/**
 * Nettoie une liste brute de photos (venant d'un formulaire).
 * Les entrées invalides sont ignorées.
 *
 * @param mixed $raw Liste brute.
 * @return array
 */
function galerie_2f_sanitize_photos( $raw ) {
	if ( ! is_array( $raw ) ) {
		return array();
	}
	$categories = galerie_2f_get_categories();
	$clean      = array();

	foreach ( $raw as $row ) {
		if ( count( $clean ) >= GALERIE_2F_MAX_PHOTOS ) {
			break;
		}
		if ( ! is_array( $row ) ) {
			continue;
		}
		$id = isset( $row['id'] ) ? absint( $row['id'] ) : 0;
		if ( ! $id || 'attachment' !== get_post_type( $id ) || ! wp_attachment_is_image( $id ) ) {
			continue;
		}
		$cat = isset( $row['cat'] ) ? sanitize_key( $row['cat'] ) : '';
		if ( ! isset( $categories[ $cat ] ) ) {
			continue;
		}
		$sub = isset( $row['sub'] ) ? sanitize_key( $row['sub'] ) : '';
		if ( '' !== $sub && ! isset( $categories[ $cat ]['subs'][ $sub ] ) ) {
			$sub = '';
		}
		$title = isset( $row['title'] ) ? sanitize_text_field( $row['title'] ) : '';

		$clean[] = array(
			'id'    => $id,
			'cat'   => $cat,
			'sub'   => $sub,
			'title' => $title,
		);
	}
	return $clean;
}

/**
 * Photos enregistrées (brutes, telles qu'en base).
 *
 * @return array
 */
function galerie_2f_get_photos() {
	$photos = get_option( GALERIE_2F_OPTION, array() );
	return is_array( $photos ) ? $photos : array();
}

/**
 * Photos prêtes pour le front : URL vignette, URL grande image, texte alternatif.
 * Les images supprimées de la médiathèque sont ignorées.
 *
 * @return array
 */
function galerie_2f_get_front_photos() {
	$categories = galerie_2f_get_categories();
	$out        = array();

	foreach ( galerie_2f_get_photos() as $photo ) {
		if ( empty( $photo['id'] ) || empty( $photo['cat'] ) || ! isset( $categories[ $photo['cat'] ] ) ) {
			continue;
		}
		$id    = (int) $photo['id'];
		$full  = wp_get_attachment_image_url( $id, 'full' );
		if ( ! $full ) {
			continue;
		}
		$thumb = wp_get_attachment_image_url( $id, 'medium_large' );
		// Toutes les tailles générées par WordPress : le navigateur choisit la plus adaptée à l'écran.
		$srcset = wp_get_attachment_image_srcset( $id, 'full' );
		$title = isset( $photo['title'] ) ? trim( (string) $photo['title'] ) : '';
		if ( '' === $title ) {
			$title = trim( (string) get_post_meta( $id, '_wp_attachment_image_alt', true ) );
		}
		if ( '' === $title ) {
			$title = $categories[ $photo['cat'] ]['label'];
		}
		$sub = isset( $photo['sub'] ) ? $photo['sub'] : '';
		if ( '' !== $sub && ! isset( $categories[ $photo['cat'] ]['subs'][ $sub ] ) ) {
			$sub = '';
		}
		$out[] = array(
			'cat'   => $photo['cat'],
			'sub'   => $sub,
			'thumb' => $thumb ? $thumb : $full,
			'url'   => $full,
			'srcset' => $srcset ? $srcset : '',
			'title' => $title,
		);
	}
	return $out;
}
