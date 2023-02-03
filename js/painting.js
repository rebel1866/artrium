let painting = (function () {
  document.addEventListener("DOMContentLoaded", init);

  function init() {
    header.init();
    cart.init();
    signIn.init();
    loadItem();
    document.getElementById("1").style.border = "2px solid red";
    document.getElementById("slideList").addEventListener("click", (e) => {
      let el = e.target;
      let id = el.getAttribute("id");
      let mainSlides = document.getElementById("mainSlide").children;
      for (let sl of mainSlides) {
        sl.style.display = "none";
      }
      let slideList = document.getElementById("slideList").children;
      for (let slide of slideList) {
        slide.style.border = "";
      }
      let nId = "main" + id;
      el.style.border = "2px solid red";
      document.getElementById(nId).style.display = "";
    });
  }

  function loadItem() {
    let id = window.location.search.substring(4);
    fetch(`http://localhost:3000/paintings?id=${id}`)
      .then((response) => response.json())
      .then((result) => viewPainting(result));
  }

  function viewPainting(painting) {}

  return { init: init };
})();
