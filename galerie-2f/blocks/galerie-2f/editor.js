( function ( wp ) {
	var el = wp.element.createElement;
	var useBlockProps = wp.blockEditor.useBlockProps;

	wp.blocks.registerBlockType( 'galerie-2f/galerie', {
		edit: function () {
			return el(
				'div',
				useBlockProps( {
					style: {
						padding: '32px 24px',
						textAlign: 'center',
						border: '2px dashed #2B6AEF',
						borderRadius: '16px',
						background: 'rgba(43,106,239,.05)',
						color: '#1e1e1e',
					},
				} ),
				el( 'strong', { style: { display: 'block', fontSize: '16px' } }, 'Galerie 2F' ),
				el(
					'span',
					{ style: { display: 'block', marginTop: '6px', fontSize: '13px' } },
					'La galerie s’affichera ici sur le site. Pour changer les photos : menu « Galerie 2F » à gauche.'
				)
			);
		},
		save: function () {
			return null;
		},
	} );
} )( window.wp );
