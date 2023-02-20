let signIn = (function () {
  const signInHTML =
    '<div id="sHeader"><div id="center"></div></div> <h1>SIGN IN</h1><div id="close">+</div>  <div id="loginDiv"><input id="login" autocomplete="off" type="text" placeholder="Login" /></div><div id="passwordDiv"><input id="password" type="password"  placeholder="Password"/></div>  <a href="#">Forgot password?</a><br />  <div id="signInBtn"><button id="doSignIn">Sign in</button></div>';

  let isPressed = false;

  function init() {
    document.getElementById("signinF").innerHTML = signInHTML;

    document.getElementById("signinBtn").addEventListener("click", () => {
      document.getElementById("signinF").style.display = "";
    });
    document.getElementById("close").addEventListener("click", () => {
      document.getElementById("signinF").style.display = "none";
    });
    document.getElementById("doSignIn").addEventListener("click", () => {
      let login = document.getElementById("login");
      let password = document.getElementById("password");
      if (login.value === "") {
        login.style.border = "3px solid red";
        login.placeholder = "This field can't be empty";
      }
      if (password.value === "") {
        password.style.border = "3px solid red";
        password.placeholder = "This field can't be empty";
      }
    });
    document.getElementById("login").addEventListener("focus", () => {
      let login = document.getElementById("login");
      login.style.border = "";
      login.placeholder = "Login";
    });

    document.getElementById("password").addEventListener("focus", () => {
      let password = document.getElementById("password");
      password.style.border = "";
      password.placeholder = "Password";
    });
    initMove();
  }

  let dif1 = 0;
  let dif2 = 0;

  function initMove() {
    document.addEventListener("mousedown", (e) => {
      let signIn = document.getElementById("sHeader");
      let x = signIn.getBoundingClientRect().x;
      let y = signIn.getBoundingClientRect().y;
      let z = x + signIn.getBoundingClientRect().width;
      let w = y + signIn.getBoundingClientRect().height;
      let mouseX = e.clientX;
      let mouseY = e.clientY;

      if (x === 0) {
        return;
      }

      if (mouseX > x && mouseY > y && z > mouseX && w > mouseY) {
        let xx = e.pageX;
        let yy = e.pageY;

        let el = document.getElementById("center");
        let a = el.getBoundingClientRect().left;
        let b = el.getBoundingClientRect().top;
        dif1 = a - xx;
        dif2 = b - yy;
        isPressed = true;
      }
    });
    document.addEventListener("mouseup", () => {
      isPressed = false;
    });

    document.addEventListener("mousemove", (e) => {
      let xx = e.pageX;
      let yy = e.pageY;
      if (isPressed) {
        console.log(dif2);
        console.log(dif1);
        let res1 = yy + dif2 + "px";
        let res2 = xx + dif1 + "px";
        document.getElementById("signinF").style.top = res1;
        document.getElementById("signinF").style.left = res2;
      }
    });
  }

  return { init: init };
})();
