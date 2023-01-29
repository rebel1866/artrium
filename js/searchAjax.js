let searchAjax = (function () {
  let timer;
  let lastAjaxResult;
  let focus = false;
  function init() {
    document.addEventListener("click", function (e) {
      if (e.target.classList.contains("ajax-inner")) {
        return;
      } else {
        document.getElementById("ajaxResult").style.display = "none";
      }
    });
    document.getElementById("search").addEventListener("input", function (e) {
      let val = e.target.value;
      if (val.length === 0) {
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
    document
      .getElementById("search")
      .addEventListener("focusout", function (e) {
        focus = false;
        if (e.target.value === "") {
          document.getElementById("search").style.width = "200px";
        }
      });
    document.getElementById("search").addEventListener("focusin", function (e) {
      e.target.style.width = "600px";
      focus = true;
    });
    document
      .getElementById("search")
      .addEventListener("mouseover", function (e) {
        e.target.style.width = "600px";
      });
    document
      .getElementById("search")
      .addEventListener("mouseout", function (e) {
        if (e.target.value === "" && !focus) {
          document.getElementById("search").style.width = "200px";
        }
      });
  }
  function doAjax(query) {
    fetch(` http://localhost:3000/paintings?name_like=${query}`)
      .then((response) => response.json())
      .then((result) => printSearchResult(result));
  }

  function printSearchResult(result) {
    lastAjaxResult = result;
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
      div.classList.add("ajax-inner");
      ajax.appendChild(div);
    }
    let div = document.createElement("div");
    if (result.length !== 0) {
      div.innerHTML = "View all search result";
    } else {
      div.innerHTML = "Nothing found";
    }
    div.setAttribute("id", "viewAllSearch");
    div.classList.add("ajax-inner");
    ajax.appendChild(div);

    document
      .getElementById("viewAllSearch")
      .removeEventListener("click", viewAllSearch);

    document
      .getElementById("viewAllSearch")
      .addEventListener("click", viewAllSearch);
  }
  function viewAllSearch(e) {
    if (e.target.innerHTML === "Nothing found") {
      return;
    }
    document.getElementById("items").innerHTML = "";
    infiniteScroll.fillPaintings(lastAjaxResult);
    document.getElementById("moreC").innerHTML = "";
    document.getElementById("search").style.width = "200px";
    document.getElementById("search").value = "";
    document.getElementById("ajaxResult").style.display = "none";
  }
  return { init: init };
})();
