document.addEventListener("DOMContentLoaded", init);
let count = 0;
let left = true;
let timerID;

function init() {
  initSlides();
  buildNewPaintings();
  buildTabs();
}

function buildTabs() {
  let handle = function () {
    let timeFunc = makeEaseOut(f);
    if (
      document.getElementById("whyus").getBoundingClientRect().y <
      window.innerHeight - 300
    ) {
      document.getElementById("tabview").style.opacity = 1;
      document.removeEventListener("scroll", handle);

      document
        .getElementById("tabview")
        .addEventListener("click", function (e) {
          let toShow = e.target.getAttribute("toShow");
          if (toShow === null) {
            return;
          }
          document
            .querySelectorAll("#tabheader > div")
            .forEach((el) => el.classList.remove("chosenTab"));
          e.target.classList.add("chosenTab");

          let tabs = document.getElementsByClassName("tab");
          for (let tab of tabs) {
            tab.style.display = "none";
          }

          document.getElementById(toShow).style.display = "block";
        });

      setTimeout(function () {
        let toEf = 97;
        let toPeople = 15641;
        let toPartners = 500;

        from = 0;

        animate({
          duration: 5000,
          timing: timeFunc,
          draw: function (progress) {
            let result = (toEf - from) * progress + from;
            document.getElementById("titleEf").innerHTML =
              Math.ceil(result) + "% efficiency";
          },
        });

        animate({
          duration: 5000,
          timing: timeFunc,
          draw: function (progress) {
            let result = (toPeople - from) * progress + from;
            document.getElementById("titlePeople").innerHTML =
              Math.ceil(result) + " people";
          },
        });

        animate({
          duration: 5000,
          timing: timeFunc,
          draw: function (progress) {
            let result = (toPartners - from) * progress + from;
            document.getElementById("titlePartners").innerHTML =
              Math.ceil(result) + "+ partners";
          },
        });
      }, 500);
    }
  };
  document.addEventListener("scroll", handle);
  let isExecuted = false;
  document.getElementById("n2").addEventListener("click", function () {
    let text = "Best quality around the world";
    if (isExecuted) {
      return;
    }


    let timeFunc = bounce;
    let to = text.length;
    animate({
      duration: 2500,
      timing: timeFunc,
      draw: function (progress) {
        let result = (to - from) * progress + from;
        document.getElementById("title2").innerHTML = text.substring(
          0,
          Math.ceil(result)
        );
      },
    });
    isExecuted = true;
  });
}
function bounce(timeFraction) {
  for (let a = 0, b = 1; 1; a += b, b /= 2) {
    if (timeFraction >= (7 - 4 * a) / 11) {
      return (
        -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
      );
    }
  }
}

function f(timeFraction) {
  return Math.pow(timeFraction, 8);
}

function makeEaseOut(timing) {
  return function (timeFraction) {
    return 1 - timing(1 - timeFraction);
  };
}

function animate(options) {
  var start = performance.now();

  requestAnimationFrame(function animate(time) {
    var timeFraction = (time - start) / options.duration;
    if (timeFraction > 1) timeFraction = 1;

    var progress = options.timing(timeFraction);

    options.draw(progress);

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
}

function buildNewPaintings() {
  function handleData(data) {
    for (let i = 0; i < data.length; i++) {
      let newPaint = document.createElement("div");
      newPaint.classList.add("newPaint");
      let paintInner = document.createElement("div");
      paintInner.classList.add("paintInner");
      newPaint.appendChild(paintInner);
      let img = document.createElement("img");
      img.setAttribute("src", data[i].img);
      paintInner.appendChild(img);
      let overlay = document.createElement("div");
      overlay.classList.add("overlay");
      paintInner.appendChild(overlay);
      let top = document.createElement("div");
      top.classList.add("top");
      overlay.appendChild(top);
      let name = document.createElement("div");
      name.classList.add("name");
      name.innerHTML = data[i].name;
      top.appendChild(name);
      let bottom = document.createElement("div");
      bottom.classList.add("bottom");
      overlay.appendChild(bottom);
      let author = document.createElement("div");
      author.classList.add("author");
      bottom.appendChild(author);
      author.innerHTML = data[i].author;
      let buyBtn = document.createElement("div");
      buyBtn.classList.add("buyBtn");
      buyBtn.innerHTML = 'GET IT NOW!<div class="innerBtn"></div>';
      bottom.appendChild(buyBtn);
      let price = document.createElement("div");
      price.classList.add("price");
      price.innerHTML = data[i].price + "$";
      bottom.appendChild(price);
      document.getElementById("newPaintContainer").appendChild(newPaint);
      if (i === data.length - 1 || i === data.length - 2) {
        newPaint.classList.add("additional");
      }
    }
  }

  fetch("http://localhost:3000/paintings?_limit=8&_page=1")
    .then((response) => response.json())
    .then((result) => handleData(result));
}

function initSlides() {
  let slides = document.getElementsByClassName("slide");
  for (let i = 0; i < slides.length; i++) {
    let percent = -(i * 100);
    let slide = slides[i];
    slide.style.transform = `translateX(${percent}%)`;
  }
  document.getElementById("left").addEventListener("click", goLeft);
  document.getElementById("right").addEventListener("click", goRight);
  goLeftRight();
}

function goLeft() {
  clearTimeout(timerID);
  if (count === 8) {
    return;
  }
  count++;

  let slides = document.getElementsByClassName("slide");
  for (let slide of slides) {
    let transformOld = Number(extractTransformNum(slide.style.transform));
    let transformNew = transformOld + 100;
    slide.style.transform = `translateX(${transformNew}%)`;
  }
  goLeftRight();
}

function goRight() {
  clearTimeout(timerID);
  if (count === 0) {
    return;
  }
  count--;

  let slides = document.getElementsByClassName("slide");
  for (let slide of slides) {
    let transformOld = Number(extractTransformNum(slide.style.transform));
    let transformNew = transformOld - 100;
    slide.style.transform = `translateX(${transformNew}%)`;
  }
  goLeftRight();
}

function extractTransformNum(transformStr) {
  transformStr = transformStr.substring(11);
  let transformStrLenght = transformStr.length;
  return transformStr.substring(0, transformStrLenght - 2);
}

function goLeftRight() {
  timerID = setTimeout(function () {
    if (left) {
      goLeft();
      if (count === 8) {
        left = false;
      }
    } else {
      goRight();
      if (count === 0) {
        left = true;
      }
    }
  }, 3000);
}
