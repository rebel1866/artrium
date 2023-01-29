let searchAjax = (function () {
  let timer;
  function init() {
    document.getElementById("search").addEventListener("input", function (e) {
      let val = e.target.value;
      if (val.length <= 2) {
        document.getElementById("ajaxResult").innerHTML = "";
        return;
      }
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        doAjax(val);
      }, 300);
    });
    document.getElementById("search").addEventListener("focusout", function () {
      document.getElementById("ajaxResult").style.display = "none";
      document.getElementById("search").value = "";
    });
  }
  function doAjax(query) {
    fetch(` http://localhost:3000/paintings?name_like=${query}`)
      .then((response) => response.json())
      .then((result) => printSearchResult(result));
  }

  function printSearchResult(result) {
    let ajax = document.getElementById("ajaxResult");
    ajax.innerHTML = "";
    ajax.style.display = "";
    let counter = 0;
    for (let element of result) {
      if (counter === 5) {
        break;
      }
      counter++;
      let div = document.createElement("div");
      div.classList.add("ajax-element");
      div.innerHTML = element.name + " (" + element.author + ")";
      div.setAttribute("id", element.id);
      ajax.appendChild(div);
    }
    let div = document.createElement("div");
    if (result.length !== 0) {
      div.innerHTML = "View all search result";
    } else {
      div.innerHTML = "Nothing found";
    }
    div.setAttribute("id", "viewAllSearch");
    ajax.appendChild(div);
  }
  return { init: init };
})();
