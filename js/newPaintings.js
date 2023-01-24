let newPaintings = (function () {

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
    return {
        buildNewPaintings: buildNewPaintings
    }

})();