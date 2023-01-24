let feedbacks = (function () {
  let amountOnPage = 3;

  let handleOver = function (e) {
    let feedbackList = document.getElementsByClassName("feedback");
    if (e.target.getAttribute("id") === "next") {
      let current = e.target;
      let next = current.nextElementSibling;
      if (next === null) {
        return;
      }
      let currentIndex = findElementIndex(
        feedbackList,
        current.getAttribute("id")
      );
      current.removeAttribute("id");
      next.setAttribute("id", "next");
      let prevIndex = currentIndex - amountOnPage + 1;
      let newPrevIndex = prevIndex + 1;
      feedbackList[prevIndex].removeAttribute("id");
      feedbackList[newPrevIndex].setAttribute("id", "prev");

      for (let fdb of feedbackList) {
        let transform = Number(extractTransformNum(fdb.style.transform));
        let transformNew = transform - 110;
        fdb.style.transform = `translateX(${transformNew}%)`;
      }
    }
    if (e.target.getAttribute("id") === "prev") {
      let current = e.target;
      let prev = current.previousElementSibling;
      if (prev === null) {
        return;
      }
      let currentIndex = findElementIndex(
        feedbackList,
        current.getAttribute("id")
      );
      current.removeAttribute("id");
      prev.setAttribute("id", "prev");

      let nextIndex = currentIndex + amountOnPage - 1;
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
    let feedbackList = document.getElementsByClassName("feedback");
    for (let fdb of feedbackList) {
      fdb.addEventListener("mouseover", handleOver);
    }
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

  return {
    buildFeedbacks: buildFeedbacks,
  };
})();
