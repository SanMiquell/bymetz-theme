(function() {
  function start(rot) {
    if (rot.dataset.bmUspInit === '1') return;
    var items = rot.querySelectorAll('.bm-usp-item');
    if (items.length < 2) return;
    rot.dataset.bmUspInit = '1';

    rot.style.position = 'relative';
    items.forEach(function(it, idx) {
      it.style.transition = 'opacity 250ms ease';
      if (idx === 0) {
        it.style.position = 'relative';
        it.style.opacity = '1';
      } else {
        it.style.position = 'absolute';
        it.style.top = '0';
        it.style.left = '0';
        it.style.right = '0';
        it.style.opacity = '0';
        it.style.pointerEvents = 'none';
      }
    });

    var i = 0;
    var paused = false;
    setInterval(function() {
      if (paused) return;
      var current = items[i];
      var next = items[(i + 1) % items.length];
      next.style.position = 'relative';
      next.style.opacity = '1';
      next.style.pointerEvents = '';
      current.style.opacity = '0';
      current.style.pointerEvents = 'none';
      setTimeout(function() {
        current.style.position = 'absolute';
        current.style.top = '0';
        current.style.left = '0';
        current.style.right = '0';
      }, 260);
      i = (i + 1) % items.length;
    }, 3000);

    rot.addEventListener('mouseenter', function() { paused = true; });
    rot.addEventListener('mouseleave', function() { paused = false; });
  }

  function initAll() {
    document.querySelectorAll('.bm-usp-rotator').forEach(start);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
  document.addEventListener('shopify:section:load', initAll);
  setTimeout(initAll, 500);
  setTimeout(initAll, 1500);
})();
