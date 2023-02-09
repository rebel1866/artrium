let painting = (function () {
  document.addEventListener("DOMContentLoaded", init);

  function init() {
    header.init();
    cart.init();
    signIn.init();
  }
  return { init: init };
})();
