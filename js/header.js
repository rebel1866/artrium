let header = (function () {


  function init() {
    document.querySelectorAll("#menu div").forEach((el) =>
      el.addEventListener("click", function (e) {
        let id = e.currentTarget.getAttribute("id");
        let a = document.querySelector(`#${id} a`);
        window.location.href = a.getAttribute("href");
      })
    );
  }

  return { init: init };
})();
