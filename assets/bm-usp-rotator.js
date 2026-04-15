(function() {
  function start(rot) {
    if (rot.dataset.bmUspInit === '1') return;
    var items = rot.querySelectorAll('.bm-usp-item');
    if (items.length < 2) return;
    rot.dataset.bmUspInit = '1';
    items.forEach(function(it, idx) {
      it.classList.toggle('is-active', idx === 0);
    });
    var i = 0;
    var paused = false;
    setInterval(function() {
      if (paused) return;
      items[i].classList.remove('is-active');
      i = (i + 1) % items.length;
      items[i].classList.add('is-active');
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
