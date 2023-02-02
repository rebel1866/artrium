let cart = (function () {
  function init() {
    document.getElementById("cartForm").style.display = "none";
    document.getElementById("cart").addEventListener("mouseover", () => {
      document.getElementById("cartForm").style.display = "block";
    });
    document.getElementById("cart").addEventListener("mouseout", (e) => {
      if (e.relatedTarget.getAttribute("id") !== "cartForm") {
        document.getElementById("cartForm").style.display = "none";
      }
    });
    document.getElementById("cartForm").addEventListener("mouseout", () => {
      document.getElementById("cartForm").style.display = "none";
    });
  }
  return { init: init };
})();
