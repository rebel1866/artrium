let cart = (function () {
  const elementPattern =
    '<div id="|itemid|" class="cartItem cartEl"><img class="cartImage cartEl" src="|imgPath|" >' +
    '<div class="cartTitle cartEl cartHeader">|name|</div> <div class="cartAuthor cartEl' +
    ' cartHeader">|author|</div><div class="cartPrice cartEl cartHeader">|price|$</div>' +
    ' <div class="manageBtns cartEl"><div class="mAmount cartEl"><div class="increase cartEl">' +
    '</div> <div class="amountItems cartEl">|amountItems|</div><div class="decrease cartEl"></div>' +
    ' </div> <div itemId="|itemid|" class="closeOuter cartEl"> <div itemId="|itemid|" class="closeInner cartEl">+</div></div></div></div>';

  const cartAfter =
    ' #cart::after {content: "|amount|";font-weight: bold;background: red;border-radius: 50%; width: 10px;   margin-top: -10px;margin-left: -30px; font-size: 11px;padding: 1px; padding-bottom:3px; padding-top:0; }';

  const manageBtnsHtml =
    '<div id="totalBlock" class="cartEl"><div id="totalHead" class="cartEl">TOTAL</div><div id="totC" class="cartEl">' +
    '<div class="cartEl" id="totalItems">|amountItems| items</div> <div class="cartEl" id="totalPrice">|totalPrice|$</div></div>' +
    ' <button id="getAll" class="cartEl">VIEW ALL</button>';

  function init() {
    document.getElementById("cartForm").style.display = "none";
    document.getElementById("cart").addEventListener("mouseover", () => {
      document.getElementById("cartForm").style.display = "block";
    });
    document.getElementById("cart").addEventListener("mouseout", (e) => {
      if (
        e.relatedTarget.getAttribute("id") !== null &&
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
    document.getElementById("cartForm").addEventListener("click", (e) => {
      if (
        (e.target.classList !== null &&
          e.target.classList.contains("closeOuter")) ||
        e.target.classList.contains("closeInner")
      ) {
        let id = e.composedPath()[0].getAttribute("itemid");
        document.getElementById(id).style.backgroundColor = "rgb(134, 21, 21)";
        removeById(id);
        setTimeout(() => {
          render();
        }, 400);
      }
      if (e.target.classList.contains("increase")) {
        let id = e.composedPath()[3].getAttribute("id");
        increment(id);
      }
      if (e.target.classList.contains("decrease")) {
        let id = e.composedPath()[3].getAttribute("id");
        decrement(id);
      }
    });
    render();
  }

  function increment(id) {
    let currentPrice;
    let items = JSON.parse(window.localStorage.getItem("cartItems"));
    for (const el of items) {
      if (id == el.obj.id) {
        el.amount = el.amount + 1;
        currentPrice = el.obj.price;
      }
    }
    window.localStorage.setItem("cartItems", JSON.stringify(items));
    let totalHtml = document.getElementById("totalItems").innerHTML;

    let oldAmountItems = Number(
      totalHtml.substring(0, totalHtml.length - " items".length)
    );
    let newAmountItems = oldAmountItems + 1;
    let priceHtml = document.getElementById("totalPrice").innerHTML;
    let oldPrice = Number(priceHtml.substring(0, priceHtml.length - 1));
    let newPrice = oldPrice + currentPrice;
    document.getElementById("totalItems").innerHTML = `${newAmountItems} items`;
    document.getElementById("totalPrice").innerHTML = `${newPrice}$`;
    let currentAmount = getCurrentAmount();
    if (currentAmount !== 0) {
      document.getElementsByTagName("style")[0].innerHTML = cartAfter.replace(
        "|amount|",
        currentAmount
      );
    } else {
      document.getElementsByTagName("style")[0].innerHTML = "";
    }
    let idEscape = CSS.escape(id);
    let oldA = Number(
      document.querySelector(`#${idEscape} .amountItems`).innerHTML
    );
    document.querySelector(`#${idEscape} .amountItems`).innerHTML = ++oldA;
  }
  function decrement(id) {
    let idEscape = CSS.escape(id);
    let oldA = Number(
      document.querySelector(`#${idEscape} .amountItems`).innerHTML
    );
    if (oldA === 1) {
      return;
    }
    let currentPrice;
    let items = JSON.parse(window.localStorage.getItem("cartItems"));
    for (const el of items) {
      if (id == el.obj.id) {
        el.amount = el.amount - 1;
        currentPrice = el.obj.price;
      }
    }
    window.localStorage.setItem("cartItems", JSON.stringify(items));
    let totalHtml = document.getElementById("totalItems").innerHTML;

    let oldAmountItems = Number(
      totalHtml.substring(0, totalHtml.length - " items".length)
    );
    let newAmountItems = oldAmountItems - 1;
    let priceHtml = document.getElementById("totalPrice").innerHTML;
    let oldPrice = Number(priceHtml.substring(0, priceHtml.length - 1));
    let newPrice = oldPrice - currentPrice;
    document.getElementById("totalItems").innerHTML = `${newAmountItems} items`;
    document.getElementById("totalPrice").innerHTML = `${newPrice}$`;
    let currentAmount = getCurrentAmount();
    if (currentAmount !== 0) {
      document.getElementsByTagName("style")[0].innerHTML = cartAfter.replace(
        "|amount|",
        currentAmount
      );
    } else {
      document.getElementsByTagName("style")[0].innerHTML = "";
    }
    document.querySelector(`#${idEscape} .amountItems`).innerHTML = --oldA;
  }
  function removeById(id) {
    let items = JSON.parse(window.localStorage.getItem("cartItems"));
    let itemsNew = [];
    for (const el of items) {
      if (id != el.obj.id) {
        itemsNew.push(el);
      }
    }
    window.localStorage.setItem("cartItems", JSON.stringify(itemsNew));
  }

  function render() {
    let rootElement = document.getElementById("cartForm");
    rootElement.innerHTML = "";
    let storage = window.localStorage.getItem("cartItems");
    if (storage === null) {
      return;
    }
    let items = JSON.parse(storage);

    if (items.length > 3) {
      items = items.slice(-3);
    }
    let amountItems = 0;
    let totalPrice = 0;
    for (let i = 0; i < items.length; i++) {
      let obj = items[i].obj;
      amountItems = amountItems + 1 * items[i].amount;
      totalPrice = totalPrice + obj.price * items[i].amount;
      let res = elementPattern.replace("|price|", obj.price);
      res = res.replace("|name|", obj.name);
      res = res.replace("|author|", obj.author);
      res = res.replace("|imgPath|", obj.img);
      res = res.replaceAll("|itemid|", obj.id);
      res = res.replace("|amountItems|", items[i].amount);
      rootElement.innerHTML = rootElement.innerHTML + res;
    }
    if (items.length !== 0) {
      document.getElementsByTagName("style")[0].innerHTML = cartAfter.replace(
        "|amount|",
        amountItems
      );
    } else {
      document.getElementsByTagName("style")[0].innerHTML = "";
    }
    let manRes = manageBtnsHtml.replace("|amountItems|", amountItems);
    manRes = manRes.replace("|totalPrice|", totalPrice);
    rootElement.innerHTML = rootElement.innerHTML + manRes;
  }
  function getCurrentAmount() {
    let items = JSON.parse(window.localStorage.getItem("cartItems"));
    let total = 0;
    for (const el of items) {
      total = total + el.amount;
    }
    return total;
  }

  return { init: init, render: render };
})();
