document.addEventListener("DOMContentLoaded", init);

function init() {
  header.init();
  signIn.init();
  infiniteScroll.init();
  initScrollTop();
  searchAjax.init();
  cart.init();
}

function initScrollTop() {
  document.addEventListener("scroll", function () {
    if (document.documentElement.scrollTop > window.innerHeight) {
      document.getElementById("scrollTop").style.display = "";
    } else {
      document.getElementById("scrollTop").style.display = "none";
    }
  });
  document.getElementById("scrollTop").addEventListener("click", function () {
    let to = 0;
    let from = document.documentElement.scrollTop;
    animate({
      duration: 300,
      timing: linear,
      draw: function (progress) {
        let result = (to - from) * progress + from;
        document.documentElement.scrollTop = Math.ceil(result);
      },
    });
  });
}
