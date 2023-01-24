let slideAnimation = (function () {
    
    let count = 0;
    let left = true;
    let timerID;


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

    return {
        initSlides: initSlides
    }
})();