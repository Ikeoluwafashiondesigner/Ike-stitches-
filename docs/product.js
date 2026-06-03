// ============================================
// PRODUCT.JS
// IKE-STITCHES PRODUCT PAGE SYSTEM
// ============================================


// ============================================
// STYLE DATABASE
// ============================================


  
  
  // ============================================
  // PRODUCT IMAGES
  // ============================================
  
  
  
  // ============================================
  // LOAD PRODUCT PAGE
  // ============================================
  
  function loadProductPage(){

    const key =
    localStorage.getItem("styleKey");
    
    if(!key){
    
    alert("Style not found");
    
    window.location.href =
    "gallery.html";
    
    return;
    
    }
    
    const style =
    allStylesSafe.find(
    item => item.id === key
    );
    
    if(!style){
    
    alert("Style not found");
    
    window.location.href =
    "gallery.html";
    
    return;
    
    }
    
    // NAME
    document.getElementById(
    "selectedStyle"
    ).innerText = style.name;
    
    // PRICE
    document.getElementById(
    "stylePrice"
    ).innerText =
    "₦" + style.price.toLocaleString();
    
    // DESCRIPTION
    document.getElementById(
    "styleDescription"
    ).innerText =
    style.description;
    
    // FABRIC
    document.getElementById(
    "styleFabric"
    ).innerText =
    style.fabric || "Premium Fabric";
    
    // DURATION
    document.getElementById(
    "styleDuration"
    ).innerText =
    style.duration || "3 - 5 Days";
    
    // MAIN IMAGE
    document.getElementById(
    "mainProductImg"
    ).src = style.image;
    
    }
  
  
  // ============================================
  // LOAD PRODUCT IMAGES
  // ============================================
  
  function loadProductImages(key){
  
    const images =
    styleImages[key] || [];
  
    const mainImg =
    document.getElementById("mainProductImg");
  
    // MAIN IMAGE
    if(mainImg && images.length > 0){
  
      mainImg.src = images[0];
  
    }
  
  }
  
  // ============================================
  // CHANGE MAIN IMAGE
  // ============================================
  
  function changeMainImage(img){
  
    const mainImg =
    document.getElementById("mainProductImg");
  
    if(mainImg){
  
      mainImg.src = img;
  
    }
  
  }
  
  
  // ============================================
  // QUANTITY CONTROLS
  // ============================================
  
  function increaseQty(){
  
    const qty =
    document.getElementById("qty");
  
    if(!qty) return;
  
    qty.value =
    parseInt(qty.value || 1) + 1;
  
  }
  
  
  function decreaseQty(){
  
    const qty =
    document.getElementById("qty");
  
    if(!qty) return;
  
    if(parseInt(qty.value) > 1){
  
      qty.value =
      parseInt(qty.value) - 1;
  
    }
  
  }
  
  
  // ============================================
  // ADD CURRENT STYLE TO CART
  // ============================================
  
  function addCurrentStyleToCart(){

    const key =
    localStorage.getItem("styleKey");
    
    const style =
    allStylesSafe.find(
    item => item.id === key
    );
    
    if(!style){
    
    alert("Style not found");
    
    return;
    
    }
    
    const qty =
    parseInt(
    document.getElementById("qty").value
    ) || 1;
    
    let cart =
    JSON.parse(
    localStorage.getItem("cart")
    ) || [];
    
    const existingItem =
    cart.find(
    item => item.id === style.id
    );
    
    if(existingItem){
    
    existingItem.qty += qty;
    
    }
    
    else{
    
    cart.push({
    
    id: style.id,
    name: style.name,
    price: style.price,
    image: style.image,
    qty: qty
    
    });
    
    }
    
    localStorage.setItem(
    "cart",
    JSON.stringify(cart)
    );
    
    toastBox("Added to cart");
    
    updateCartCount();
    
    }
  
  
  // ============================================
  // BUY NOW
  // ============================================
  
  function buyNow(){
  
    addCurrentStyleToCart();
  
    window.location.href =
    "booking.html";
  
  }
  
  
  // ============================================
  // OPEN PRODUCT
  // ============================================
  function openProduct(styleKey){

    localStorage.setItem(
    "styleKey",
    styleKey
    );
    
    window.location.href =
    "product.html";
    
    }
  
  
  // ============================================
  // RELATED PRODUCTS
  // ============================================
  
  function loadRelatedProducts(currentKey){
  
    const container =
    document.getElementById("relatedProducts");
  
    if(!container) return;
  
    container.innerHTML = "";
  
    Object.keys(styleDetails).forEach(key=>{
  
      // SKIP CURRENT
      if(key === currentKey) return;
  
      const style =
      allStyles.find(
      item => item.id === styleKey
      );
  
      const image =
      styleImages[key]
      ? styleImages[key][0]
      : "";
  
      container.innerHTML += `
  
      <div class="related-card">
  
        <img
        src="${image}"
        class="related-img">
  
        <h3>${style.name}</h3>
  
        <p>
        ₦${style.price.toLocaleString()}
        </p>
  
        <button
        onclick="openProduct('${key}')">
  
        View Product
  
        </button>
  
      </div>
  
      `;
  
    });
  
  }
  
  
  // ============================================
  // CART ICON ANIMATION
  // ============================================
  
  function animateCart(){
  
    const cart =
    document.querySelector(".cart-icon");
  
    if(!cart) return;
  
    cart.classList.add("cart-bounce");
  
    setTimeout(()=>{
  
      cart.classList.remove("cart-bounce");
  
    },500);
  
  }
  
  
  // ============================================
  // SAVE LAST VIEWED PRODUCT
  // ============================================
  
  function saveRecentlyViewed(){
  
    const key =
    localStorage.getItem("styleKey");
  
    if(!key) return;
  
    let recent =
    JSON.parse(
      localStorage.getItem("recentProducts")
    ) || [];
  
    // REMOVE DUPLICATE
    recent =
    recent.filter(item=>item !== key);
  
    // ADD NEW
    recent.unshift(key);
  
    // LIMIT
    recent = recent.slice(0,5);
  
    localStorage.setItem(
      "recentProducts",
      JSON.stringify(recent)
    );
  
  }
  
  
  // ============================================
  // LOAD RECENT PRODUCTS
  // ============================================
  
  function loadRecentProducts(){
  
    const container =
    document.getElementById("recentProducts");
  
    if(!container) return;
  
    const recent =
    JSON.parse(
      localStorage.getItem("recentProducts")
    ) || [];
  
    container.innerHTML = "";
  
    recent.forEach(key=>{
  
      if(!styleDetails[key]) return;
  
      const style =
      allStyles.find(
      item => item.id === styleKey
      );
  
      const image =
      styleImages[key]
      ? styleImages[key][0]
      : "";
  
      container.innerHTML += `
  
      <div class="recent-card">
  
        <img
        src="${image}"
        class="recent-img">
  
        <h4>${style.name}</h4>
  
        <button
        onclick="openProduct('${key}')">
  
        View Again
  
        </button>
  
      </div>
  
      `;
  
    });
  
  }
  
  
  // ============================================
  // PRODUCT SHARE
  // ============================================
  
  function shareProduct(){
  
    const styleKey =
    localStorage.getItem("styleKey");
  
    if(!styleKey || !styleDetails[styleKey]){
  
      return;
  
    }
  
    const style =
    allStyles.find(
    item => item.id === styleKey
    );
  
    if(navigator.share){
  
      navigator.share({
  
        title: style.name,
  
        text:
        "Check out this luxury fashion style from IKE-STITCHES",
  
        url: window.location.href
  
      });
  
    }
  
    else{
  
      navigator.clipboard.writeText(
        window.location.href
      );
  
      alert("Product link copied");
  
    }
  
  }
  
  
  
  // ============================================
  // AUTO LOAD
  // ============================================
  
  document.addEventListener(
    "DOMContentLoaded",
    function(){
  
      loadProductPage();
  
      saveRecentlyViewed();
  
      loadRecentProducts();
  
    }
  );
  