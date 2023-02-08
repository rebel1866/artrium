let signIn = (function () {
  const signInHTML =
    ' <h1>SIGN IN</h1><div id="close">+</div>  <div id="loginDiv"><input id="login" autocomplete="off" type="text" placeholder="Login" /></div><div id="passwordDiv"><input id="password" type="password"  placeholder="Password"/></div>  <a href="#">Forgot password?</a><br />  <div id="signInBtn"><button id="doSignIn">Sign in</button></div>';

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
  }
  return { init: init };
})();
