let tabs = (function () {

    function buildTabs() {
        let handle = function () {
            let timeFunc = makeEaseOut(pow8Func);
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

                    callAnimates(toEf, toPeople, toPartners, from, timeFunc);
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
        let isEx = false;
        document.getElementById("n3").addEventListener("click", function () {
            if (isEx) {
                return;
            }
            document.getElementById('title3').classList.add('resize');
            setTimeout(function () {
                document.getElementById('title3').classList.remove('resize');
            }, 1000)
            isEx = true;
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

    function pow8Func(timeFraction) {
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

    function callAnimates(toEf, toPeople, toPartners, from, timeFunc) {
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
    }

    return {
        buildTabs: buildTabs
    }

})();