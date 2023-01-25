let feedbacks = (function () {
  let handleOver = function (e) {
    if (window.matchMedia("(hover: none)").matches) {
      return;
    }
    let feedbackList = document.getElementsByClassName("feedback");
    if (e.currentTarget.getAttribute("id") === "next") {
      let current = e.currentTarget;
      let next = current.nextElementSibling;
      if (next === null) {
        return;
      }

      current.removeAttribute("id");
      next.setAttribute("id", "next");
      let prevIndex = findElementIndex(feedbackList, "prev");
      let newPrevIndex = prevIndex + 1;
      feedbackList[prevIndex].removeAttribute("id");
      feedbackList[newPrevIndex].setAttribute("id", "prev");

      for (let fdb of feedbackList) {
        let transform = Number(extractTransformNum(fdb.style.transform));
        let transformNew = transform - 110;
        fdb.style.transform = `translateX(${transformNew}%)`;
      }
      return;
    }
    if (e.currentTarget.getAttribute("id") === "prev") {
      let current = e.currentTarget;
      let prev = current.previousElementSibling;
      if (prev === null) {
        return;
      }
      current.removeAttribute("id");
      prev.setAttribute("id", "prev");

      let nextIndex = findElementIndex(feedbackList, "next");
      let newNextIndex = nextIndex - 1;
      feedbackList[nextIndex].removeAttribute("id");
      feedbackList[newNextIndex].setAttribute("id", "next");

      for (let fdb of feedbackList) {
        let transform = Number(extractTransformNum(fdb.style.transform));
        let transformNew = transform + 110;
        fdb.style.transform = `translateX(${transformNew}%)`;
      }
    }
  };

  function buildFeedbacks() {
    fetch("http://localhost:3000/feedbacks?_limit=9&_page=1")
      .then((response) => response.json())
      .then((result) => handleFdb(result));
  }

  function handleFdb(data) {
    fillFeedbacks(data);
    initFeedbacks();
    let feedbackList = document.getElementsByClassName("feedback");
    for (let fdb of feedbackList) {
      fdb.addEventListener("mouseover", handleOver);
    }
    window.onresize = initFeedbacks;
  }

  function findElementIndex(elements, id) {
    let index = -1;
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].getAttribute("id") === id) {
        index = i;
      }
    }
    return index;
  }
  function initFeedbacks() {
    let feedbackList = document.getElementsByClassName("feedback");
    let transform = -330;
    for (let element of feedbackList) {
      element.removeAttribute("id");
      element.style.transform = `translateX(${transform}%)`;
      transform = transform + 110;
    }

    let isFour = window.matchMedia("(min-width: 1550px)");
    if (isFour.matches) {
      feedbackList[3].setAttribute("id", "prev");
      feedbackList[6].setAttribute("id", "next");
    } else {
      feedbackList[3].setAttribute("id", "prev");
      feedbackList[5].setAttribute("id", "next");
    }
  }

  function fillFeedbacks(data) {
    for (let el of data) {
      let feedback = document.createElement("div");
      feedback.classList.add("feedback");
      let fbdBody = document.createElement("div");
      fbdBody.innerHTML = el.body;
      fbdBody.classList.add("fdbBody");
      let fdbHeader = document.createElement("div");
      fdbHeader.classList.add("fdbHeader");
      fillHeader(fdbHeader, el);
      feedback.appendChild(fdbHeader);
      feedback.appendChild(fbdBody);
      let btn = document.createElement("button");
      btn.innerHTML = "Read more...";

      feedback.appendChild(btn);
      document.getElementById("fdbContainer").appendChild(feedback);
    }
  }
  function fillHeader(fdbHeader, el) {
    let author = document.createElement("div");
    author.classList.add("fAuthor");
    author.innerHTML = el.author;

    let date = document.createElement("div");
    date.classList.add("fDate");
    date.innerHTML = "Aug 5, 2022";

    fdbHeader.appendChild(author);
    fdbHeader.appendChild(date);
  }

  return {
    buildFeedbacks: buildFeedbacks,
  };
})();
