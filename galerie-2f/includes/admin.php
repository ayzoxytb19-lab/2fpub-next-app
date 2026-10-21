<?php
/**
 * Page d'administration « Galerie 2F ».
 *
 * @package Galerie2F
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'admin_menu', 'galerie_2f_admin_menu' );
add_action( 'admin_post_galerie_2f_save', 'galerie_2f_handle_save' );

/**
 * Capacité requise pour gérer la galerie (Éditeur et Administrateur par défaut).
 *
 * @return string
 */
function galerie_2f_capability() {
	return apply_filters( 'galerie_2f_capability', 'edit_pages' );
}

/**
 * Ajoute le menu « Galerie 2F ».
 */
function galerie_2f_admin_menu() {
	$hook = add_menu_page(
		'Galerie 2F',
		'Galerie 2F',
		galerie_2f_capability(),
		'galerie-2f',
		'galerie_2f_admin_page',
		'dashicons-format-gallery',
		25
	);
	add_action( 'admin_print_styles-' . $hook, 'galerie_2f_admin_assets' );
}

/**
 * Charge CSS/JS uniquement sur la page de la galerie.
 */
function galerie_2f_admin_assets() {
	wp_enqueue_media();
	wp_enqueue_style( 'galerie-2f-admin', GALERIE_2F_URL . 'assets/admin.css', array(), GALERIE_2F_VERSION );
	wp_enqueue_script( 'galerie-2f-admin', GALERIE_2F_URL . 'assets/admin.js', array( 'jquery', 'jquery-ui-sortable', 'media-editor' ), GALERIE_2F_VERSION, true );

	$cats = array();
	foreach ( galerie_2f_get_categories() as $key => $cat ) {
		$cats[] = array(
			'key'   => $key,
			'label' => $cat['label'],
			'subs'  => $cat['subs'] ? array_map(
				function ( $k, $l ) {
					return array(
						'key'   => $k,
						'label' => $l,
					);
				},
				array_keys( $cat['subs'] ),
				array_values( $cat['subs'] )
			) : array(),
		);
	}

	$photos = array();
	foreach ( galerie_2f_get_photos() as $photo ) {
		$id       = isset( $photo['id'] ) ? (int) $photo['id'] : 0;
		$thumb    = $id ? wp_get_attachment_image_url( $id, 'thumbnail' ) : '';
		$photos[] = array(
			'id'    => $id,
			'cat'   => isset( $photo['cat'] ) ? $photo['cat'] : '',
			'sub'   => isset( $photo['sub'] ) ? $photo['sub'] : '',
			'title' => isset( $photo['title'] ) ? $photo['title'] : '',
			'thumb' => $thumb ? $thumb : '',
		);
	}

	wp_localize_script(
		'galerie-2f-admin',
		'G2F',
		array(
			'categories' => $cats,
			'photos'     => $photos,
			'i18n'       => array(
				'chooseCat'    => '— Choisir —',
				'noSub'        => '— Aucune —',
				'pickTitle'    => 'Choisir des photos',
				'pickButton'   => 'Ajouter à la galerie',
				'replaceTitle' => 'Remplacer la photo',
				'replaceBtn'   => 'Utiliser cette photo',
				'confirmDel'   => 'Retirer cette photo de la galerie ? Elle reste dans la médiathèque.',
				'needCat'      => 'Choisissez une catégorie pour chaque photo (lignes en rouge) avant d’enregistrer.',
				'leave'        => 'Des modifications ne sont pas enregistrées.',
				'missing'      => 'Image introuvable',
				'count1'       => '1 photo',
				'countN'       => '%d photos',
			),
		)
	);
}

/**
 * Affiche la page.
 */
function galerie_2f_admin_page() {
	if ( ! current_user_can( galerie_2f_capability() ) ) {
		wp_die( esc_html__( 'Accès refusé.', 'galerie-2f' ), '', array( 'response' => 403 ) );
	}
	$saved   = isset( $_GET['saved'] ) && '1' === $_GET['saved']; // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- simple message d'affichage.
	$ignored = isset( $_GET['ignored'] ) ? absint( $_GET['ignored'] ) : 0; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
	?>
	<div class="wrap g2f-wrap">
		<h1>Galerie 2F</h1>

		<?php if ( $saved ) : ?>
			<div class="notice notice-success is-dismissible"><p><strong>Galerie enregistrée.</strong> Les changements sont visibles sur le site.</p></div>
		<?php endif; ?>
		<?php if ( $ignored ) : ?>
			<div class="notice notice-warning is-dismissible"><p>
				<?php
				echo esc_html(
					sprintf(
						/* translators: %d: nombre de photos ignorées */
						_n( '%d photo n’a pas pu être enregistrée (image supprimée ou catégorie invalide).', '%d photos n’ont pas pu être enregistrées (images supprimées ou catégorie invalide).', $ignored, 'galerie-2f' ),
						$ignored
					)
				);
				?>
			</p></div>
		<?php endif; ?>

		<div class="g2f-help">
			<p><strong>Comment ça marche</strong></p>
			<ol>
				<li>Cliquez sur <em>Ajouter des photos</em> et choisissez-les dans la médiathèque (ou envoyez-en de nouvelles).</li>
				<li>Pour chaque photo, choisissez la <em>catégorie</em>, puis la <em>sous-catégorie</em>.</li>
				<li>Glissez-déposez les photos (poignée à gauche) pour changer l’ordre d’affichage.</li>
				<li>Cliquez sur <em>Enregistrer la galerie</em>.</li>
			</ol>
			<p>
				Pour afficher la galerie dans une page, collez ce code :
				<code id="g2f-shortcode">[galerie_2f]</code>
				<button type="button" class="button button-small" id="g2f-copy">Copier</button>
				<span class="description">(ou utilisez le bloc « Galerie 2F » / le widget Elementor « Galerie 2F »)</span>
			</p>
		</div>

		<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>" id="g2f-form">
			<input type="hidden" name="action" value="galerie_2f_save">
			<?php wp_nonce_field( 'galerie_2f_save', 'galerie_2f_nonce' ); ?>
			<input type="hidden" name="photos_json" id="g2f-json" value="">

			<div class="g2f-toolbar">
				<div class="g2f-adder">
					<button type="button" class="button button-primary button-hero" id="g2f-add">+ Ajouter des photos</button>
					<span class="g2f-defaults">
						Pour les prochaines photos :
						<select id="g2f-def-cat" aria-label="Catégorie par défaut"></select>
						<select id="g2f-def-sub" aria-label="Sous-catégorie par défaut"></select>
					</span>
				</div>
				<div class="g2f-filter">
					<label for="g2f-filter">Afficher :</label>
					<select id="g2f-filter"></select>
					<span id="g2f-count" class="description"></span>
				</div>
			</div>

			<ul id="g2f-list"></ul>
			<p id="g2f-empty" class="g2f-empty">Aucune photo pour l’instant. Cliquez sur « Ajouter des photos ».</p>

			<div class="g2f-savebar">
				<button type="submit" class="button button-primary button-large" id="g2f-save">Enregistrer la galerie</button>
				<span class="description" id="g2f-dirty" hidden>Modifications non enregistrées</span>
			</div>
		</form>

		<p class="g2f-credit">Plugin développé par Malcolm (2F PUB). Les photos sont recadrées automatiquement (format 4/3 sur mobile, grille 3 colonnes sur ordinateur) et s’adaptent à tous les écrans.</p>
	</div>
	<?php
}

/**
 * Enregistrement du formulaire (nonce + droits vérifiés).
 */
function galerie_2f_handle_save() {
	if ( ! current_user_can( galerie_2f_capability() ) ) {
		wp_die( esc_html__( 'Accès refusé.', 'galerie-2f' ), '', array( 'response' => 403 ) );
	}
	check_admin_referer( 'galerie_2f_save', 'galerie_2f_nonce' );

	$json = isset( $_POST['photos_json'] ) ? wp_unslash( $_POST['photos_json'] ) : '[]'; // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized -- décodé puis nettoyé champ par champ dans galerie_2f_sanitize_photos().
	$raw  = json_decode( is_string( $json ) ? $json : '[]', true );
	$raw  = is_array( $raw ) ? $raw : array();

	$photos = galerie_2f_sanitize_photos( $raw );
	update_option( GALERIE_2F_OPTION, $photos, false );

	wp_safe_redirect(
		add_query_arg(
			array(
				'page'    => 'galerie-2f',
				'saved'   => '1',
				'ignored' => max( 0, count( $raw ) - count( $photos ) ),
			),
			admin_url( 'admin.php' )
		)
	);
	exit;
}
