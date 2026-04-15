(function () {
  function init() {
    document.querySelectorAll('.bm-usp-rotator').forEach(function (rot) {
      if (rot.dataset.bmUspInit === '1') return;
      var items = rot.querySelectorAll('.bm-usp-item');
      if (items.length < 2) return;
      rot.dataset.bmUspInit = '1';
      items[0].classList.add('is-active');
      var i = 0;
      var paused = false;
      setInterval(function () {
        if (paused) return;
        items[i].classList.remove('is-active');
        i = (i + 1) % items.length;
        items[i].classList.add('is-active');
      }, 3000);
      rot.addEventListener('mouseenter', function () { paused = true; });
      rot.addEventListener('mouseleave', function () { paused = false; });
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  document.addEventListener('shopify:section:load', init);
})();
