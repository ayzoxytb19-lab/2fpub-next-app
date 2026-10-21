<?php
/**
 * Widget Elementor « Galerie 2F ».
 *
 * @package Galerie2F
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Galerie_2F_Elementor_Widget extends \Elementor\Widget_Base {

	public function get_name() {
		return 'galerie_2f';
	}

	public function get_title() {
		return 'Galerie 2F';
	}

	public function get_icon() {
		return 'eicon-gallery-grid';
	}

	public function get_categories() {
		return array( 'general' );
	}

	protected function register_controls() {
		$this->start_controls_section(
			'section_content',
			array( 'label' => 'Galerie 2F' )
		);
		$this->add_control(
			'info',
			array(
				'type'      => \Elementor\Controls_Manager::RAW_HTML,
				'raw'       => 'Les photos se gèrent dans le menu <a href="' . esc_url( admin_url( 'admin.php?page=galerie-2f' ) ) . '" target="_blank" rel="noopener">Galerie 2F</a>.',
				'separator' => 'none',
			)
		);
		$this->end_controls_section();
	}

	protected function render() {
		$in_editor = class_exists( '\Elementor\Plugin' ) && \Elementor\Plugin::$instance->editor->is_edit_mode();
		if ( $in_editor ) {
			echo '<div style="padding:32px 24px;text-align:center;border:2px dashed #2B6AEF;border-radius:16px;background:rgba(43,106,239,.05)">'
				. '<strong>Galerie 2F</strong><br>La galerie s’affiche sur le site publié.</div>';
			return;
		}
		echo galerie_2f_render(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- HTML construit et échappé dans galerie_2f_render().
	}
}
