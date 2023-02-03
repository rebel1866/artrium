let cart = (function () {
  function init() {
    document.getElementById("cartForm").style.display = "none";
    document.getElementById("cart").addEventListener("mouseover", () => {
      document.getElementById("cartForm").style.display = "block";
    });
    document.getElementById("cart").addEventListener("mouseout", (e) => {
      if (e.relatedTarget.getAttribute("id") !== "cartForm" && !e.relatedTarget.classList.contains('cartItem')) {
        document.getElementById("cartForm").style.display = "none";
      }
    });
    document.getElementById("cartForm").addEventListener("mouseout", (e) => {
      if ( e.relatedTarget !== null && !e.relatedTarget.classList.contains('cartEl')) {
      document.getElementById("cartForm").style.display = "none";
      }
    });
  }
  return { init: init };
})();
