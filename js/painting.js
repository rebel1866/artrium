let painting = (function () {
  document.addEventListener("DOMContentLoaded", init);

  let current;

  function init() {
    header.init();
    cart.init();
    signIn.init();
    loadItem();
    document.querySelector("#slideList img").style.border = "2px solid red";
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
    document.getElementById("addToCart").addEventListener("click", () => {
      let storage = window.localStorage.getItem("cartItems");
      let array = [];
      if (storage !== null) {
        array = JSON.parse(storage);
      }
      array.push({ obj: current, amount: 1 });
      window.localStorage.setItem("cartItems", JSON.stringify(array));
      cart.render();
    });
  }
  // fsd
  function loadItem() {
    let id = window.location.search.substring(4);
    fetch(`http://localhost:3000/paintings?id=${id}`)
      .then((response) => response.json())
      .then((result) => viewPainting(result));
  }

  function viewPainting(paintings) {
    current = paintings[0];
    document.getElementById("pName").innerHTML = current.name;
    document.getElementById("pAuthor").innerHTML = current.author;
  }

  return { init: init };
})();
