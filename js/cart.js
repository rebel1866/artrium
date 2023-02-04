let cart = (function () {
  const elementPattern =
    '<div class="cartItem cartEl"><img class="cartImage cartEl" src="|imgPath|" ><div class="cartTitle cartEl cartHeader">|name|</div> <div class="cartAuthor cartEl cartHeader">|author|</div><div class="cartPrice cartEl cartHeader">|price|$</div></div>';

  const cartAfter =
    ' #cart::after {content: "|amount|";font-weight: bold;background: red;border-radius: 50%; width: 10px;   margin-top: -10px;margin-left: -30px; font-size: 11px;padding: 1px; padding-bottom:3px; padding-top:0; }';

  function init() {
    document.getElementById("cartForm").style.display = "none";
    document.getElementById("cart").addEventListener("mouseover", () => {
      document.getElementById("cartForm").style.display = "block";
    });
    document.getElementById("cart").addEventListener("mouseout", (e) => {
      if (
        e.relatedTarget.getAttribute("id") !== "cartForm" &&
        !e.relatedTarget.classList.contains("cartItem")
      ) {
        document.getElementById("cartForm").style.display = "none";
      }
    });
    document.getElementById("cartForm").addEventListener("mouseout", (e) => {
      if (
        e.relatedTarget !== null &&
        !e.relatedTarget.classList.contains("cartEl")
      ) {
        document.getElementById("cartForm").style.display = "none";
      }
    });
    render();
  }

  function render() {
    let rootElement = document.getElementById("cartForm");
    rootElement.innerHTML = "";

    let items = JSON.parse(window.localStorage.getItem("cartItems"));

    if (items.length !== 0) {
      document.getElementsByTagName("style")[0].innerHTML = cartAfter.replace(
        "|amount|",
        items.length
      );
    }

    if (items.length > 3) {
      items = items.slice(-3);
    }
    for (let i = 0; i < items.length; i++) {
      let obj = items[i];
      let res = elementPattern.replace("|price|", obj.price);
      res = res.replace("|name|", obj.name);
      res = res.replace("|author|", obj.author);
      res = res.replace("|imgPath|", obj.img);
      rootElement.innerHTML = rootElement.innerHTML + res;
    }
    rootElement.innerHTML =
      rootElement.innerHTML +
      '<button id="getAll" class="cartEl">VIEW ALL</button>';
  }

  return { init: init };
})();
