let infiniteScroll = (function () {
  let isExecuted = false;
  let page = 2;
  let pageSize = 8;
  let initPageSize = 16;
  const pattern =
    '<div class="item">   <div class="itemPhoto">      <img />    </div><div class="iName iHeader"></div><div class="iAuthor iHeader"></div><div class="iPrice iHeader"></div><button class="getBtn">BUY IT NOW!</button>  </div>';

  function init() {
    let isFour = window.matchMedia("(min-width: 1350px)").matches;
    if (!isFour) {
      pageSize = 6;
      initPageSize = 12;
    }
    let isFive = window.matchMedia("(min-width: 1720px)").matches;
    if (isFive) {
      pageSize = 10;
      initPageSize = 15;
    }

    fetch(`http://localhost:3000/paintings?_limit=${initPageSize}&_page=1`)
      .then((response) => response.json())
      .then((result) => fillPaintings(result));
    document.addEventListener("scroll", handle);
    document.getElementById("showMore").addEventListener("click", handle);
  }

  function fillPaintings(data) {
    for (let el of data) {
      let inner = document.getElementById("items").innerHTML;
      document.getElementById("items").innerHTML = inner + pattern;
      fillLastEl(el);
    }
  }

  function fillLastEl(element) {
    let lastItem = document.getElementById("items").lastElementChild;
    lastItem.querySelector(".itemPhoto img").setAttribute("src", element.img);
    lastItem.setAttribute("id", element.id);
    lastItem.querySelector(".iName").innerHTML = element.name;
    lastItem.querySelector(".iAuthor").innerHTML = element.author;
    lastItem.querySelector(".iPrice").innerHTML = element.price + "$";
  }

  function handle() {
    if (isExecuted) {
      return;
    }
    let more = document.getElementById("showMore");
    if (more !== null && more.getBoundingClientRect().y < window.innerHeight) {
      isExecuted = true;
      fetchItems();
    }
  }

  function fetchItems() {
    page++;
    let wait = document.createElement("div");
    wait.setAttribute("id", "waiting");
    wait.classList.add("rotate");
    document.getElementById("moreC").innerHTML = "";
    document.getElementById("moreC").appendChild(wait);
    fetch(`http://localhost:3000/paintings?_limit=${pageSize}&_page=${page}`)
      .then((response) => response.json())
      .then((result) =>
        setTimeout(function () {
          appendItems(result);
        }, 1000)
      );
  }

  function appendItems(data) {
    document.getElementById("moreC").innerHTML = "";

    if (data.length === 0) {
      return;
    }
    isExecuted = false;

    fillPaintings(data);

    let btn = document.createElement("button");
    btn.setAttribute("id", "showMore");
    btn.innerHTML = "Show more";
    document.getElementById("moreC").appendChild(btn);
  }
  return { init: init, fillPaintings: fillPaintings };
})();
