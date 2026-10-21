/* Galerie 2F : page d'administration */
( function ( $ ) {
	'use strict';

	var cfg = window.G2F || { categories: [], photos: [], i18n: {} };
	var t = cfg.i18n;
	var $list = $( '#g2f-list' );
	var $empty = $( '#g2f-empty' );
	var $json = $( '#g2f-json' );
	var $dirty = $( '#g2f-dirty' );
	var $count = $( '#g2f-count' );
	var $defCat = $( '#g2f-def-cat' );
	var $defSub = $( '#g2f-def-sub' );
	var $filter = $( '#g2f-filter' );
	var dirty = false;

	function findCat( key ) {
		for ( var i = 0; i < cfg.categories.length; i++ ) {
			if ( cfg.categories[ i ].key === key ) { return cfg.categories[ i ]; }
		}
		return null;
	}

	function option( value, label ) {
		return $( '<option>' ).val( value ).text( label );
	}

	function fillCats( $select, firstLabel ) {
		$select.empty().append( option( '', firstLabel ) );
		cfg.categories.forEach( function ( c ) { $select.append( option( c.key, c.label ) ); } );
	}

	/* Sous-catégories dépendantes de la catégorie choisie. Retourne false si la catégorie n'en a pas. */
	function fillSubs( $select, catKey, selected ) {
		var cat = findCat( catKey );
		$select.empty();
		if ( ! cat || ! cat.subs.length ) {
			$select.append( option( '', t.noSub ) ).prop( 'disabled', true );
			return false;
		}
		$select.append( option( '', t.noSub ) ).prop( 'disabled', false );
		cat.subs.forEach( function ( s ) { $select.append( option( s.key, s.label ) ); } );
		$select.val( selected || '' );
		return true;
	}

	function markDirty() {
		dirty = true;
		$dirty.prop( 'hidden', false );
	}

	function refresh() {
		var n = $list.children().length;
		$empty.toggle( n === 0 );
		$count.text( n === 1 ? t.count1 : t.countN.replace( '%d', n ) );
	}

	function setThumb( $row, url ) {
		var $box = $row.find( '.g2f-thumb' ).empty();
		if ( url ) {
			$box.append( $( '<img>' ).attr( { src: url, alt: '' } ) );
		} else {
			$box.append( $( '<span class="g2f-missing">' ).text( t.missing ) );
		}
	}

	function addRow( p ) {
		var $row = $( '<li class="g2f-row">' ).data( 'id', p.id );

		var $handle = $( '<span class="g2f-handle dashicons dashicons-menu" title="Glisser pour réordonner">' );
		var $thumb = $( '<button type="button" class="g2f-thumb" title="Changer la photo">' );

		var $cat = $( '<select class="g2f-cat">' );
		fillCats( $cat, t.chooseCat );
		$cat.val( p.cat || '' );
		var $sub = $( '<select class="g2f-sub">' );
		fillSubs( $sub, p.cat, p.sub );

		var $title = $( '<input type="text" class="g2f-title" maxlength="200" placeholder="Ex. Semi-covering utilitaire">' ).val( p.title || '' );

		var $fields = $( '<div class="g2f-fields">' ).append(
			$( '<label>' ).append( $( '<span>' ).text( 'Catégorie' ), $cat ),
			$( '<label>' ).append( $( '<span>' ).text( 'Sous-catégorie' ), $sub ),
			$( '<label class="g2f-title-label">' ).append( $( '<span>' ).text( 'Titre (description de la photo, invisible sur le site, utile pour Google)' ), $title )
		);

		var $move = $( '<div class="g2f-move">' ).append(
			$( '<button type="button" class="button-link g2f-up" title="Monter" aria-label="Monter">' ).text( '▲' ),
			$( '<button type="button" class="button-link g2f-down" title="Descendre" aria-label="Descendre">' ).text( '▼' )
		);
		var $del = $( '<button type="button" class="button-link button-link-delete g2f-remove">' ).text( 'Retirer' );

		$row.append( $handle, $thumb, $fields, $( '<div class="g2f-actions">' ).append( $move, $del ) );
		setThumb( $row, p.thumb );
		$list.append( $row );
		return $row;
	}

	/* ----- Événements des lignes ----- */
	$list.on( 'change', '.g2f-cat', function () {
		var $row = $( this ).closest( '.g2f-row' );
		fillSubs( $row.find( '.g2f-sub' ), this.value, '' );
		$row.removeClass( 'g2f-invalid' );
		markDirty();
	} );
	$list.on( 'change input', '.g2f-sub, .g2f-title', markDirty );

	$list.on( 'click', '.g2f-remove', function () {
		if ( window.confirm( t.confirmDel ) ) {
			$( this ).closest( '.g2f-row' ).remove();
			refresh();
			markDirty();
		}
	} );
	$list.on( 'click', '.g2f-up', function () {
		var $row = $( this ).closest( '.g2f-row' );
		var $prev = $row.prevAll( ':visible' ).first();
		if ( $prev.length ) { $row.insertBefore( $prev ); markDirty(); }
	} );
	$list.on( 'click', '.g2f-down', function () {
		var $row = $( this ).closest( '.g2f-row' );
		var $next = $row.nextAll( ':visible' ).first();
		if ( $next.length ) { $row.insertAfter( $next ); markDirty(); }
	} );

	/* Remplacer la photo d'une ligne */
	$list.on( 'click', '.g2f-thumb', function () {
		var $row = $( this ).closest( '.g2f-row' );
		var frame = wp.media( {
			title: t.replaceTitle,
			button: { text: t.replaceBtn },
			library: { type: 'image' },
			multiple: false
		} );
		frame.on( 'open', function () {
			var id = $row.data( 'id' );
			if ( id ) { frame.state().get( 'selection' ).add( wp.media.attachment( id ) ); }
		} );
		frame.on( 'select', function () {
			var a = frame.state().get( 'selection' ).first().toJSON();
			$row.data( 'id', a.id );
			setThumb( $row, thumbOf( a ) );
			markDirty();
		} );
		frame.open();
	} );

	function thumbOf( a ) {
		return ( a.sizes && a.sizes.thumbnail && a.sizes.thumbnail.url ) || a.url;
	}

	/* ----- Ajout de photos depuis la médiathèque ----- */
	var addFrame = null;
	$( '#g2f-add' ).on( 'click', function () {
		if ( ! addFrame ) {
			addFrame = wp.media( {
				title: t.pickTitle,
				button: { text: t.pickButton },
				library: { type: 'image' },
				multiple: 'add'
			} );
			addFrame.on( 'select', function () {
				addFrame.state().get( 'selection' ).each( function ( att ) {
					var a = att.toJSON();
					addRow( {
						id: a.id,
						cat: $defCat.val(),
						sub: $defSub.val(),
						title: a.alt || '',
						thumb: thumbOf( a )
					} );
				} );
				addFrame.state().get( 'selection' ).reset();
				applyFilter();
				refresh();
				markDirty();
			} );
		}
		addFrame.open();
	} );

	/* ----- Catégorie par défaut ----- */
	fillCats( $defCat, t.chooseCat );
	fillSubs( $defSub, '', '' );
	$defCat.on( 'change', function () { fillSubs( $defSub, this.value, '' ); } );

	/* ----- Filtre d'affichage (n'affecte pas l'enregistrement) ----- */
	$filter.append( option( '', 'Toutes les photos' ) );
	cfg.categories.forEach( function ( c ) { $filter.append( option( c.key, c.label ) ); } );
	function applyFilter() {
		var f = $filter.val();
		$list.children().each( function () {
			var show = ! f || $( this ).find( '.g2f-cat' ).val() === f;
			$( this ).toggle( show );
		} );
	}
	$filter.on( 'change', applyFilter );

	/* ----- Glisser-déposer ----- */
	$list.sortable( {
		handle: '.g2f-handle',
		placeholder: 'g2f-placeholder',
		forcePlaceholderSize: true,
		tolerance: 'pointer',
		update: markDirty
	} );

	/* ----- Copier le shortcode ----- */
	$( '#g2f-copy' ).on( 'click', function () {
		var btn = this;
		var txt = $( '#g2f-shortcode' ).text();
		var done = function () { var old = btn.textContent; btn.textContent = 'Copié !'; setTimeout( function () { btn.textContent = old; }, 1500 ); };
		if ( navigator.clipboard && navigator.clipboard.writeText ) {
			navigator.clipboard.writeText( txt ).then( done );
		} else {
			var r = document.createRange();
			r.selectNodeContents( document.getElementById( 'g2f-shortcode' ) );
			var s = window.getSelection();
			s.removeAllRanges();
			s.addRange( r );
			try { document.execCommand( 'copy' ); done(); } catch ( e ) { /* ignoré */ }
		}
	} );

	/* ----- Enregistrement : une seule valeur JSON (évite la limite max_input_vars) ----- */
	$( '#g2f-form' ).on( 'submit', function ( e ) {
		var rows = [];
		var bad = null;
		$list.children().each( function () {
			var $r = $( this );
			var cat = $r.find( '.g2f-cat' ).val();
			if ( ! cat ) {
				$r.addClass( 'g2f-invalid' ).show();
				bad = bad || $r;
			}
			rows.push( {
				id: $r.data( 'id' ),
				cat: cat,
				sub: $r.find( '.g2f-sub' ).val() || '',
				title: $r.find( '.g2f-title' ).val()
			} );
		} );
		if ( bad ) {
			e.preventDefault();
			window.alert( t.needCat );
			bad[ 0 ].scrollIntoView( { behavior: 'smooth', block: 'center' } );
			return;
		}
		$json.val( JSON.stringify( rows ) );
		dirty = false;
	} );

	window.addEventListener( 'beforeunload', function ( e ) {
		if ( dirty ) { e.preventDefault(); e.returnValue = t.leave; return t.leave; }
	} );

	/* ----- Démarrage ----- */
	cfg.photos.forEach( addRow );
	refresh();
} )( jQuery );
