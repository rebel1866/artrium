document.addEventListener("DOMContentLoaded", init);
let count = 0;
let left = true;

function init() {
  let btn = document.getElementById("btn");
  let btnR = document.getElementById("btnR");

  document.getElementById("second").style.transform = "translateX(-100%)";
  document.getElementById("first").style.transform = "translateX(-200%)";
  document.getElementById("third").style.transform = "translateX(0%)";

  function goLeft() {
    if (count === 2) {
      return;
    }
    count++;
    let thirdEl = document.getElementById("third");
    let secEl = document.getElementById("second");
    let firstEl = document.getElementById("first");

    let third = thirdEl.style.transform;
    let second = secEl.style.transform;
    let first = firstEl.style.transform;

    let transformThird = Number(extractTransformNum(third));
    let transformSecond = Number(extractTransformNum(second));
    let transformFirst = Number(extractTransformNum(first));

    let newTransformThird = transformThird + 100;
    let newTransformSec = transformSecond + 100;
    let newTransformFir = transformFirst + 100;

    firstEl.style.transform = "translateX(" + newTransformFir + "%)";
    secEl.style.transform = "translateX(" + newTransformSec + "%)";
    thirdEl.style.transform = "translateX(" + newTransformThird + "%)";
  }
  function goRight() {
    if (count === 0) {
      return;
    }
    count--;
    let thirdEl = document.getElementById("third");
    let secEl = document.getElementById("second");
    let firstEl = document.getElementById("first");

    let third = thirdEl.style.transform;
    let second = secEl.style.transform;
    let first = firstEl.style.transform;

    let transformThird = Number(extractTransformNum(third));
    let transformSecond = Number(extractTransformNum(second));
    let transformFirst = Number(extractTransformNum(first));

    let newTransformThird = transformThird - 100;
    let newTransformSec = transformSecond - 100;
    let newTransformFir = transformFirst - 100;

    firstEl.style.transform = "translateX(" + newTransformFir + "%)";
    secEl.style.transform = "translateX(" + newTransformSec + "%)";
    thirdEl.style.transform = "translateX(" + newTransformThird + "%)";
  }

  btn.addEventListener("click", goLeft);
  btnR.addEventListener("click", goRight);
  goLeftRight();

  function goLeftRight() {
    setInterval(function () {
      if (left) {
        goLeft();
        if (count === 2) {
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

  function extractTransformNum(transformStr) {
    transformStr = transformStr.substring(11);
    let transformStrLenght = transformStr.length;
    return transformStr.substring(0, transformStrLenght - 2);
  }
}
