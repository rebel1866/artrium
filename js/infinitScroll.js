let infiniteScroll = (function () {
  let isExecuted = false;
  let page = 1;

  function init() {
    document.addEventListener("scroll", handle);
  }
  function handle() {
    if (isExecuted) {
      return;
    }
    if (
      document.getElementById("showMore").getBoundingClientRect().y <
      window.innerHeight
    ) {
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
    fetch(`http://localhost:3000/paintings?_limit=8&_page=${page}`)
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

    for (let item of data) {
      let newItem = document.createElement("div");
      newItem.classList.add("item");
      document.getElementById("items").appendChild(newItem);
    }

    let btn = document.createElement("button");
    btn.setAttribute("id", "showMore");
    btn.innerHTML = "Show more";
    document.getElementById("moreC").appendChild(btn);
  }
  return { init: init };
})();
