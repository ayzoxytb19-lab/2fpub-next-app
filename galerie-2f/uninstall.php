<?php
/**
 * Suppression des données à la désinstallation du plugin.
 * Les images restent dans la médiathèque.
 */

if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	exit;
}

delete_option( 'galerie_2f_photos' );
