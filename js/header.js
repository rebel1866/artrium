let header = (function () {
  const headerHTML =
    '<img id="logo" src="img/logo.png" /> <div id="menu"> <div id="home"> <span id="homeInner"> <span class="material-symbols-outlined"> house </span> <a href="home.html">HOME</a> </span> </div> <div id="catalog"> <span id="catInner"> <span class="material-symbols-outlined"> menu_book </span> <a href="catalog.html">CATALOG</a> </span> </div> <div id="galleries"> <span id="galInner"> <span class="material-symbols-outlined"> view_week </span> <a href="">GALLERIES</a> </span> </div> <div id="careers"> <span id="carInner"> <span class="material-symbols-outlined"> supervisor_account </span> <a href="careers.html">CAREERS</a> </span> </div> <div id="about"> <span id="aboutInner"> <span class="material-symbols-outlined"> help </span> <a href="">ABOUT US</a> </span> </div> </div> <div id="right-part"> <div id="signin"> <button id="signinBtn">SIGN IN</button> </div> <span id="cart" class="material-symbols-outlined"> shopping_cart </span> </div>';

  function init() {
    document.getElementById("header").innerHTML = headerHTML;

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
