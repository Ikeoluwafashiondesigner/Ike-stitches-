// ============================================
// MOBILE MENU
// ============================================

function toggleMenu(){

    const menu =
    document.getElementById("mobileMenu");
    
    if(menu){
    menu.classList.toggle("show");
    }
    
    }
    
    // ============================================
    // THEME SWITCHER
    // ============================================
    
    function toggleThemeMenu(){
    
    const themeOptions =
    document.getElementById("themeOptions");
    
    if(themeOptions){
    themeOptions.classList.toggle("show-theme");
    }
    
    }
    
    function setTheme(mode){
    
    document.body.className = mode;
    
    localStorage.setItem("theme",mode);
    
    const themeOptions =
    document.getElementById("themeOptions");
    
    if(themeOptions){
    themeOptions.classList.remove("show-theme");
    }
    
    }
    
    // ============================================
    // LOAD SAVED THEME
    // ============================================
    
    document.addEventListener(
    "DOMContentLoaded",
    function(){
    
    const savedTheme =
    localStorage.getItem("theme") || "light";
    
    document.body.className = savedTheme;
    
    }
    );
    
    // ============================================
    // ACCORDIONS
    // ============================================
    
    document.addEventListener(
    "DOMContentLoaded",
    function(){
    
    const accordions =
    document.querySelectorAll(".accordion button");
    
    accordions.forEach(btn=>{
    
    btn.addEventListener("click",function(){
    
    this.nextElementSibling
    .classList.toggle("show");
    
    });
    
    });
    
    }
    );
    
    // ============================================
    // NAV DROPDOWN
    // ============================================
    
    document.addEventListener(
    "DOMContentLoaded",
    function(){
    
    document.querySelectorAll(".nav-drop-btn")
    .forEach(btn=>{
    
    btn.addEventListener("click",function(){
    
    this.parentElement
    .classList.toggle("active");
    
    });
    
    });
    
    }
    );
    
    // ============================================
    // HERO SLIDER
    // ============================================
    
    document.addEventListener(
    "DOMContentLoaded",
    function(){
    
    const slides =
    document.querySelectorAll(".slide");
    
    if(slides.length > 0){
    
    let currentSlide = 0;
    
    function showSlides(){
    
    slides.forEach(slide=>{
    slide.classList.remove("active");
    });
    
    currentSlide++;
    
    if(currentSlide > slides.length){
    currentSlide = 1;
    }
    
    slides[currentSlide - 1]
    .classList.add("active");
    
    }
    
    showSlides();
    
    setInterval(showSlides,3000);
    
    }
    
    }
    );
    document.addEventListener("click", function (e) {
        const menu = document.getElementById("mobileMenu");
        const icon = document.querySelector(".menu-icon");
      
        if (!menu.contains(e.target) && !icon.contains(e.target)) {
          menu.classList.remove("show");
        }
      });