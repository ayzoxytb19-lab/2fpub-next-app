(function(){
  /* Les photos viennent de la page d'administration « Galerie 2F » (balise #f2g-data). */
  var PHOTOS = [];
  var dataEl = document.getElementById('f2g-data');
  if (dataEl) {
    try { PHOTOS = JSON.parse(dataEl.textContent) || []; } catch (err) { PHOTOS = []; }
  }
  var root = document.getElementById('f2g-gallery');
  if (!root) return;
  var grid = root.querySelector('.f2g-grid');
  var empty = root.querySelector('.f2g-empty');
  var lb = document.getElementById('f2g-lightbox');
  var lbImg = lb.querySelector('img');
  document.body.appendChild(lb);
  var state = { cat: 'all', sub: '' };
  var tabs = root.querySelectorAll('.f2g-tab');
  var wraps = root.querySelectorAll('.f2g-tabwrap');
  function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]; }); }
  function tabLabel(cat){ var t = root.querySelector('.f2g-tab[data-cat="' + cat + '"]'); return t ? (t.getAttribute('data-label') || t.textContent) : cat; }
  function subLabel(cat, sub){ if (!sub) return ''; var it = root.querySelector('.f2g-tabwrap[data-cat="' + cat + '"] .f2g-item[data-sub="' + sub + '"]'); return it ? it.textContent : ''; }
  function closeMenus(){ for (var i = 0; i < wraps.length; i++) wraps[i].classList.remove('open'); }
  function render(){
    for (var i = 0; i < tabs.length; i++) {
      var t = tabs[i];
      var on = t.getAttribute('data-cat') === state.cat;
      t.classList.toggle('active', on);
      var lab = t.querySelector('.f2g-tablabel');
      if (lab) {
        var s = on ? subLabel(state.cat, state.sub) : '';
        lab.textContent = t.getAttribute('data-label') + (s ? ' › ' + s : '');
      }
    }
    var items = root.querySelectorAll('.f2g-item');
    for (var j = 0; j < items.length; j++) {
      var w = items[j].closest('.f2g-tabwrap');
      items[j].classList.toggle('active', w.getAttribute('data-cat') === state.cat && items[j].getAttribute('data-sub') === state.sub);
    }
    var list = PHOTOS.filter(function(p){
      if (state.cat === 'all') return true;
      if (p.cat !== state.cat) return false;
      return !state.sub || p.sub === state.sub;
    });
    grid.innerHTML = '';
    grid.scrollLeft = 0;
    empty.classList.toggle('hidden', list.length > 0);
    list.forEach(function(p){
      var badge = subLabel(p.cat, p.sub) || tabLabel(p.cat);
      var card = document.createElement('div');
      card.className = 'f2g-card';
      card.setAttribute('role', 'button');
      card.tabIndex = 0;
      var srcset = p.srcset ? ' srcset="' + esc(p.srcset) + '" sizes="(max-width:768px) 86vw, (max-width:1024px) 50vw, 400px"' : '';
      card.innerHTML = '<img loading="lazy" decoding="async" src="' + esc(p.thumb || p.url) + '"' + srcset + ' alt="' + esc(p.title) + ' - 2F Publicité">' + '<div class="f2g-overlay"><span class="f2g-badge">' + esc(badge) + '</span></div>';
      function open(){ if (p.srcset) { lbImg.sizes = '(max-width:1148px) 100vw, 1100px'; lbImg.srcset = p.srcset; } else { lbImg.removeAttribute('srcset'); } lbImg.src = p.url; lbImg.alt = p.title; lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false'); }
      card.addEventListener('click', open);
      card.addEventListener('keydown', function(e){ if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
      grid.appendChild(card);
    });
  }
  function select(cat, sub){ state.cat = cat; state.sub = sub || ''; closeMenus(); render(); }
  for (var k = 0; k < tabs.length; k++) {
    (function(t){
      var wrap = t.closest('.f2g-tabwrap');
      t.addEventListener('click', function(e){
        e.stopPropagation();
        if (!wrap) { select(t.getAttribute('data-cat'), ''); return; }
        var isOpen = wrap.classList.contains('open');
        closeMenus();
        if (!isOpen) wrap.classList.add('open');
      });
    })(tabs[k]);
  }
  var allItems = root.querySelectorAll('.f2g-item');
  for (var m = 0; m < allItems.length; m++) {
    (function(it){
      it.addEventListener('click', function(e){
        e.stopPropagation();
        select(it.closest('.f2g-tabwrap').getAttribute('data-cat'), it.getAttribute('data-sub'));
      });
    })(allItems[m]);
  }
  document.addEventListener('click', closeMenus);
  function closeLb(){ lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); }
  lb.addEventListener('click', function(e){ if (e.target !== lbImg) closeLb(); });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') { closeLb(); closeMenus(); } });
  /* Mobile : défilement automatique + glissement manuel */
  var mq = window.matchMedia('(max-width:768px)');
  var reduce = window.matchMedia('(prefers-reduced-motion:reduce)');
  var userUntil = 0;
  function hold(){ userUntil = Date.now() + 6000; }
  ['touchstart', 'touchmove', 'pointerdown', 'wheel'].forEach(function(ev){ grid.addEventListener(ev, hold, { passive: true }); });
  setInterval(function(){
    if (!mq.matches || reduce.matches || document.hidden || Date.now() < userUntil || lb.classList.contains('open')) return;
    var cards = grid.children;
    if (cards.length < 2) return;
    var r = grid.getBoundingClientRect();
    if (r.bottom < 0 || r.top > window.innerHeight) return;
    var w = cards[0].offsetWidth + 12;
    var idx = Math.round(grid.scrollLeft / w);
    var left = idx + 1 >= cards.length ? 0 : cards[idx + 1].offsetLeft - cards[0].offsetLeft;
    grid.scrollTo({ left: left, behavior: 'smooth' });
  }, 3500);
  render();
})();
