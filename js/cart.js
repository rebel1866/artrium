let cart = (function () {

  let car = '<div class="cartItem cartEl"><img class="cartImage cartEl" src="|imgPath|" ><div class="cartTitle cartEl cartHeader">|name|</div> <div class="cartAuthor cartEl cartHeader">|author|</div><div class="cartPrice cartEl cartHeader">|price|$</div></div>';
  
  function init() {
    document.getElementById("cartForm").style.display = "none";
    document.getElementById("cart").addEventListener("mouseover", () => {
      document.getElementById("cartForm").style.display = "block";
    });
    document.getElementById("cart").addEventListener("mouseout", (e) => {
      if (e.relatedTarget.getAttribute("id") !== "cartForm" && !e.relatedTarget.classList.contains('cartItem')) {
        document.getElementById("cartForm").style.display = "none";
      }
    });
    document.getElementById("cartForm").addEventListener("mouseout", (e) => {
      if ( e.relatedTarget !== null && !e.relatedTarget.classList.contains('cartEl')) {
      document.getElementById("cartForm").style.display = "none";
      }
    });
    render();
  }


 function render(){
  let obj = {name:'The scream of the butterfly',author:'Vincent van gogh',price:1200, img:'img/3.jpeg'}
  let rootElement = document.getElementById('cartForm');
  rootElement.innerHTML = "";
  
  let elementPattern = car;
 elementPattern  = elementPattern.replace('|name|',obj.name);
 elementPattern =  elementPattern.replace('|price|',obj.price);
 elementPattern = elementPattern.replace('|imgPath|',obj.img);
 elementPattern = elementPattern.replace('|author|',obj.author);

  for(let i=0; i<3; i++){
    rootElement.innerHTML = rootElement.innerHTML + elementPattern;
  }
  rootElement.innerHTML = rootElement.innerHTML + '<button id="getAll" class="cartEl">GET IT ALL!</button>';
 }

  return { init: init };
})();
