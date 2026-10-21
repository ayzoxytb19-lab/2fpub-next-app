<?php
/**
 * Catégories et sous-catégories de la galerie.
 *
 * @package Galerie2F
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Liste des catégories, dans l'ordre d'affichage des filtres.
 *
 * Clé  : identifiant stocké en base (ne pas changer une fois des photos enregistrées).
 * label     : texte de l'onglet.
 * all_label : texte « tout afficher » en tête du sous-menu.
 * subs      : sous-catégories identifiant => libellé (vide = pas de sous-menu).
 *
 * @return array
 */
function galerie_2f_get_categories() {
	$categories = array(
		'marquage-vehicule' => array(
			'label'     => 'Marquage véhicule',
			'all_label' => 'Tout le marquage véhicule',
			'subs'      => array(
				'adhesif'  => 'Adhésif découpé',
				'panneaux' => '3 panneaux',
				'semi'     => 'Semi-covering',
			),
		),
		'textile'           => array(
			'label'     => 'Textile pro',
			'all_label' => '',
			'subs'      => array(),
		),
		'enseignes'         => array(
			'label'     => 'Enseignes',
			'all_label' => 'Toutes les enseignes',
			'subs'      => array(
				'ajoure'       => 'Ajouré (creusé)',
				'pvc'          => 'PVC rétroéclairé',
				'alu'          => 'Alu rétroéclairé',
				'pmma'         => 'Relief PMMA',
				'pmma-alu'     => 'Relief PMMA + Alu',
				'plexi'        => 'Boîtier plexi',
				'plexi-opaque' => 'Boîtier plexi (côtés opaques)',
				'drapeau'      => 'Enseigne drapeau',
			),
		),
		'logo-lumineux'     => array(
			'label'     => 'Logo Lumineux',
			'all_label' => '',
			'subs'      => array(),
		),
		'impression'        => array(
			'label'     => 'Impression et autocollants',
			'all_label' => "Toute l'impression et les autocollants",
			'subs'      => array(
				'stickers'     => 'Stickers & autocollants',
				'etiquettes'   => 'Étiquettes',
				'baches'       => 'Bâches & banderoles',
				'muraux'       => 'Adhésifs muraux',
				'grand-format' => 'Impression grand format',
			),
		),
		'vitrophanie'       => array(
			'label'     => 'Vitrophanie',
			'all_label' => 'Toute la vitrophanie',
			'subs'      => array(
				'vitrines'     => 'Autocollants pour vitrines',
				'lettrage'     => 'Lettrage adhésif',
				'depoli'       => 'Film dépoli',
				'microperfore' => 'Film microperforé',
			),
		),
		'plaques'           => array(
			'label'     => 'Plaques & Panneaux',
			'all_label' => 'Toutes les plaques & panneaux',
			'subs'      => array(
				'publicitaires'    => 'Panneaux publicitaires',
				'chantier'         => 'Panneaux de chantier',
				'professionnelles' => 'Plaques professionnelles',
			),
		),
	);

	/**
	 * Permet à un développeur d'ajouter ou de modifier des catégories.
	 *
	 * @param array $categories Catégories.
	 */
	return apply_filters( 'galerie_2f_categories', $categories );
}
