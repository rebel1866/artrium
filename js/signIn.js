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
  }
  return { init: init };
})();
