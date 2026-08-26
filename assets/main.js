// 스크롤 진입 시 짧은 상승 애니메이션.
// 어떤 경로로든 실패하면 전부 보이게 되돌린다 — 본문이 숨겨진 채 남는 일은 없어야 한다.
(function () {
  var items = document.querySelectorAll('.rise');
  if (!items.length) return;

  function revealAll() {
    for (var i = 0; i < items.length; i++) items[i].classList.add('is-in');
  }

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) {
    revealAll();
    return;
  }

  // 안전장치: 관찰자가 어떤 이유로든 발화하지 않아도 2초 뒤에는 반드시 드러낸다.
  var safety = setTimeout(revealAll, 2000);

  var io = new IntersectionObserver(function (entries) {
    for (var i = 0; i < entries.length; i++) {
      if (!entries[i].isIntersecting) continue;
      var el = entries[i].target;
      var delay = parseInt(el.getAttribute('data-delay') || '0', 10);
      (function (node, ms) {
        setTimeout(function () { node.classList.add('is-in'); }, ms);
      })(el, delay);
      io.unobserve(el);
    }
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  for (var i = 0; i < items.length; i++) io.observe(items[i]);

  window.addEventListener('pagehide', function () { clearTimeout(safety); });
})();
