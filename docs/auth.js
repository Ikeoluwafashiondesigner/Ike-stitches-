// ============================================
// AUTH.JS
// IKE-STITCHES AUTH SYSTEM
// ============================================


// ============================================
// LOGIN
// ============================================
// ============================================
// TOAST NOTIFICATION
// ============================================

function showToast(message,type="success"){

  const toastBox =
  document.getElementById("toastBox");
  
  if(!toastBox) return;
  
  const toast =
  document.createElement("div");
  
  toast.classList.add("toast");
  
  toast.classList.add(type);
  
  toast.innerHTML = `
  ${message}
  `;
  
  toastBox.appendChild(toast);
  
  // REMOVE AFTER 4 SECONDS
  
  setTimeout(()=>{
  
  toast.remove();
  
  },4000);
  
  }
  async function login() {

    const loginBtn =
    document.getElementById("loginBtn");
  
    startButtonLoading(
      loginBtn,
      "Logging in..."
    );
  
    const email =
    document.getElementById("email")?.value.trim();
  
    const password =
    document.getElementById("password")?.value.trim();
  
    if(!email || !password){
  
      showToast(
        "Enter email and password",
        "error"
      );
  
      stopButtonLoading(loginBtn);
  
      return;
    }
  
    try{
  
      const res = await fetch(
        "http://localhost:3000/api/login",
        {
          method:"POST",
  
          headers:{
            "Content-Type":"application/json"
          },
  
          body:JSON.stringify({
            email,
            password
          })
        }
      );
  
      const data = await res.json();
  
      if(res.ok && data.token){
  
        localStorage.setItem(
          "token",
          data.token
        );
  
        localStorage.setItem(
          "userEmail",
          email
        );
  
        showToast(
          "Login successful",
          "success"
        );
  
        setTimeout(()=>{
  
          window.location.href =
          "homepage.html";
  
        },1500);
  
      }else{
  
        showToast(
          data.message || "Login failed",
          "error"
        );
  
        stopButtonLoading(loginBtn);
  
      }
  
    }catch(err){
  
      console.log(err);
  
      showToast(
        "Server error",
        "error"
      );
  
      stopButtonLoading(loginBtn);
  
    }
  
}
  
  
  // ============================================
  // REGISTER
  // ============================================
async function register() {

    const registerBtn =
    document.getElementById("registerBtn");
  
    startButtonLoading(
      registerBtn,
      "Registering..."
    );
  
    const name =
    document.getElementById("name")?.value.trim();
  
    const email =
    document.getElementById("email")?.value.trim();
  
    const password =
    document.getElementById("password")?.value.trim();
  
    if(!name || !email || !password){
  
      showToast(
        "Fill all fields",
        "error"
      );
  
      stopButtonLoading(registerBtn);
  
      return;
    }
  
    if(password.length < 6){
  
      showToast(
        "Password must be at least 6 characters",
        "error"
      );
  
      stopButtonLoading(registerBtn);
  
      return;
    }
  
    try{
  
      const res = await fetch(
        "http://localhost:3000/api/register",
        {
          method:"POST",
  
          headers:{
            "Content-Type":"application/json"
          },
  
          body:JSON.stringify({
            name,
            email,
            password
          })
        }
      );
  
      const data = await res.json();
  
      if(res.ok){
  
        showToast(
          "Registration successful",
          "success"
        );
  
        setTimeout(()=>{
  
          window.location.href =
          "login.html";
  
        },1500);
  
      }else{
  
        showToast(
          data.message || "Registration failed",
          "error"
        );
  
        stopButtonLoading(registerBtn);
  
      }
  
    }catch(err){
  
      console.log(err);
  
      showToast(
        "Server error",
        "error"
      );
  
      stopButtonLoading(registerBtn);
  
    }
  
}
  
  
  // ============================================
  // RESET PASSWORD
  // ============================================
  
async function resetPassword(){

    const resetBtn =
    document.getElementById("resetBtn");
  
    startButtonLoading(
      resetBtn,
      "Sending..."
    );
  
    const email =
    document.getElementById("resetEmail")?.value.trim();
  
    if(!email){
  
      showToast(
        "Enter your email",
        "error"
      );
  
      stopButtonLoading(resetBtn);
  
      return;
    }
  
    try{
  
      const res = await fetch(
        "http://localhost:3000/api/reset-password",
        {
          method:"POST",
  
          headers:{
            "Content-Type":"application/json"
          },
  
          body:JSON.stringify({
            email
          })
        }
      );
  
      const data = await res.json();
  
      showToast(
        data.message,
        "success"
      );
  
      stopButtonLoading(resetBtn);
  
    }catch(err){
  
      console.log(err);
  
      showToast(
        "Server error",
        "error"
      );
  
      stopButtonLoading(resetBtn);
  
    }
  
}
  
  
  // ============================================
  // LOGOUT
  // ============================================
  
  function logout(){
  
    localStorage.removeItem("token");
  
    showToast("Logout successful");

    setTimeout(()=>{
    
    window.location.href =
    "homepage.html";
    
    },1500);
  
  }
  
  
  // ============================================
  // CHECK LOGIN STATUS
  // ============================================
  
  function checkAuthUI(){
  
    const token =
    localStorage.getItem("token");
  
    const loginBtns =
    document.querySelectorAll(".login-btn");
  
    const registerBtns =
    document.querySelectorAll(".register-btn");
  
    const logoutBtns =
    document.querySelectorAll(".logout-btn");
  
    // USER LOGGED IN
    if(token){
  
      loginBtns.forEach(btn=>{
        btn.style.display = "none";
      });
  
      registerBtns.forEach(btn=>{
        btn.style.display = "none";
      });
  
      logoutBtns.forEach(btn=>{
        btn.style.display = "flex";
      });
  
    }
  
    // USER NOT LOGGED IN
    else{
  
      loginBtns.forEach(btn=>{
        btn.style.display = "flex";
      });
  
      registerBtns.forEach(btn=>{
        btn.style.display = "flex";
      });
  
      logoutBtns.forEach(btn=>{
        btn.style.display = "none";
      });
  
    }
  
  }
  
  
  // ============================================
  // PROTECT DASHBOARD
  // ============================================
  
  function protectDashboard(){
  
    const token =
    localStorage.getItem("token");
  
    if(
      !token &&
      window.location.href.includes("dashboard")
    ){
  
      showToast("Please login first");
  
      window.location.href =
      "login.html";
  
    }
  
  }
  
  
  // ============================================
  // BLOCK LOGIN/REGISTER PAGE
  // ============================================
  
  function preventAuthPages(){
  
    const token =
    localStorage.getItem("token");
  
    if(
      token &&
      (
        window.location.href.includes("login") ||
        window.location.href.includes("register")
      )
    ){
  
      window.location.href =
      "homepage.html";
  
    }
  
  }
  
  
  // ============================================
  // LOAD USER INFO
  // ============================================
  
  function loadUserInfo(){
  
    const email =
    localStorage.getItem("userEmail");
  
    const emailBox =
    document.getElementById("loggedUserEmail");
  
    if(email && emailBox){
  
      emailBox.innerText = email;
  
    }
  
  }
  
  
  // ============================================
  // AUTO LOAD
  // ============================================
  
  document.addEventListener(
    "DOMContentLoaded",
    function(){
  
      checkAuthUI();
  
      protectDashboard();
  
      preventAuthPages();
  
      loadUserInfo();
  
    }
  );
  
  
  // ============================================
  // ENTER KEY LOGIN SUPPORT
  // ============================================
  
  document.addEventListener(
    "keydown",
    function(e){
  
      if(e.key === "Enter"){
  
        if(document.getElementById("password")){
  
          const loginPage =
          window.location.href.includes("login");
  
          const registerPage =
          window.location.href.includes("register");
  
          if(loginPage){
  
            login();
  
          }
  
          if(registerPage){
  
            register();
  
          }
  
        }
  
      }
  
    }
  );
  
  
  // ============================================
  // SHOW / HIDE PASSWORD
  // ============================================
  
  function togglePassword(inputId){
  
    const input =
    document.getElementById(inputId);
  
    if(!input) return;
  
    if(input.type === "password"){
  
      input.type = "text";
  
    }else{
  
      input.type = "password";
  
    }
  }
// ============================================
// BUTTON LOADING
// ============================================

function startButtonLoading(button,text="Processing..."){

  if(!button) return;
  
  button.dataset.originalText =
  button.innerHTML;
  
  button.innerHTML = `
  <span class="spinner"></span>
  ${text}
  `;
  
  button.classList.add("btn-loading");
  
  button.disabled = true;
  
  }
  
  function stopButtonLoading(button){
  
  if(!button) return;
  
  button.innerHTML =
  button.dataset.originalText;
  
  button.classList.remove("btn-loading");
  
  button.disabled = false;
  
}