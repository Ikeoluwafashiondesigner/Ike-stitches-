// ============================================
// GALLERY SCRIPT
// IKE-STITCHES
// ============================================

// ============================================
// STYLE DATABASE
// ============================================

    
    // ============================================
    // STYLE IMAGES
    // ==========================================
    
    // ============================================
    // OPEN PRODUCT PAGE
    // ============================================
    
    function openProduct(styleKey){
        const style =
        allStyles.find(
        item => item.id === styleKey
        );

        localStorage.setItem(
        "styleKey",
        styleKey
        );
        
        window.location.href =
        "product.html";
        
        }
    
    // ============================================
    // UPDATE CART COUNT
    // ============================================
    
    function updateCartCount(){
    
    const cart =
    JSON.parse(
    localStorage.getItem("cart")
    ) || [];
    
    const count =
    document.getElementById("cartCount");
    
    if(!count) return;
    
    // TOTAL QTY
    const totalQty =
    cart.reduce((total,item)=>{
    
    return total +
    Number(item.qty || 1);
    
    },0);
    
    count.innerText = totalQty;
    
    }
    
    // ============================================
    // SEARCH GALLERY
    // ============================================
    
    function searchGallery(){
    
    const input =
    document.getElementById("gallerySearch");
    
    if(!input) return;
    
    const filter =
    input.value.toLowerCase();
    
    const cards =
    document.querySelectorAll(".style-card");    
    cards.forEach(card=>{
    
    const text =
    card.innerText.toLowerCase();
    
    if(text.includes(filter)){
    
    card.style.display = "block";
    
    }
    
    else{
    
    card.style.display = "none";
    
    }
    
    });
    
    }
    
    // ============================================
    // FILTER BY CATEGORY
    // ============================================
    
function filterGallery(category){
    
        const cards =
        document.querySelectorAll(".style-card");
    
    cards.forEach(card=>{
    
    if(
    category === "all"
    ){
    
    card.style.display = "block";
    
    }
    
    else if(
    card.dataset.category === category
    ){
    
    card.style.display = "block";
    
    }
    
    else{
    
    card.style.display = "none";
    
    }
    
    });
    
    }
    
    // ============================================
    // QUICK VIEW
    // ============================================
    
    function quickView(styleKey){
    
    const style =
    allStyles.find(
    item => item.id === styleKey
    );
    
    if(!style) return;
    
    const modal =
    document.getElementById("quickViewModal");
    
    const modalContent =
    document.getElementById("quickViewContent");
    
    if(!modal || !modalContent) return;
    
    modalContent.innerHTML = `
    
    <div class="quick-view-box">
    
    <img
    src="${styleImages[styleKey]}"
    class="quick-view-img">
    
    <div class="quick-view-info">
    
    <h2>${style.name}</h2>
    
    <p class="quick-price">
    ₦${style.price.toLocaleString()}
    </p>
    
    <p>${style.description}</p>
    
    <p>
    Fabric:
    ${style.fabric}
    </p>
    
    <p>
    Duration:
    ${style.duration}
    </p>
    
    <button
    onclick="openProduct('${styleKey}')"
    class="quick-btn">
    
    View Full Details
    
    </button>
    
    </div>
    
    </div>
    
    `;
    
    modal.classList.add("show-modal");
    
    }
    
    // ============================================
    // CLOSE QUICK VIEW
    // ============================================
    
    function closeQuickView(){
    
    const modal =
    document.getElementById("quickViewModal");
    
    if(modal){
    
    modal.classList.remove("show-modal");
    
    }
    
    }
    
    // ============================================
    // TOAST NOTIFICATION
    // ============================================
    
    function showToast(message){
    
    const toast =
    document.getElementById("toast");
    
    if(!toast) return;
    
    toast.innerText = message;
    
    toast.classList.add("show-toast");
    
    setTimeout(()=>{
    
    toast.classList.remove("show-toast");
    
    },3000);
    
    }
    
    // ============================================
    // LOAD PAGE
    // ============================================
    
    document.addEventListener(
    "DOMContentLoaded",
    function(){
    
    // UPDATE CART
    updateCartCount();
    
    // SEARCH
    const searchInput =
    document.getElementById("gallerySearch");
    
    if(searchInput){
    
    searchInput.addEventListener(
    "keyup",
    searchGallery
    );
    
    }
    
    // CLOSE MODAL ON OUTSIDE CLICK
    const modal =
    document.getElementById("quickViewModal");
    
    if(modal){
    
    modal.addEventListener(
    "click",
    function(e){
    
    if(e.target === modal){
    
    closeQuickView();
    
    }
    
    }
    );
    
    }
    
    }
    );
function loadGallery(styles){

        const galleryGrid =
        document.querySelector(".gallery-grid");
        
        if(!galleryGrid) return;
        
        galleryGrid.innerHTML = "";
    
    styles.forEach(style=>{
    
    galleryGrid.innerHTML += `
    
    <div class="style-card"
    data-category="${style.category}">    
    ${style.badge ? `
    <div class="card-badge">
    ${style.badge}
    </div>
    ` : ""}
    
    <img
    src="${style.image}"
    alt="${style.name}"
    class="clickable-style"
    onclick="openProduct('${style.id}')">
    
    <div class="style-content">
    
    <h3>${style.name}</h3>
    
    <p>${style.description}</p>
    
    <div class="price-row">
    
    <span class="price">
    ₦${style.price.toLocaleString()}
    </span>
    
    <span class="rating">
    <i class="fas fa-star"></i>
    ${style.rating}
    </span>
    
    </div>
    
    <div class="card-actions">
    
    <button class="btn"
    onclick="openProduct('${style.id}')">
    
    View Details
    
    </button>
    
    <button class="cart-btn"
    onclick="addToCart('${style.id}')">
    
    <i class="fas fa-cart-plus"></i>
    
    </button>
    
    </div>
    
    </div>
    
    </div>
    
    `;
    
    });
    
    }
    
    loadGallery(allStyles);
    function openQuickView(
        image,
        title,
        price
        ){
        
        document.getElementById(
        "quickViewImg"
        ).src = image;
        
        document.getElementById(
        "quickViewTitle"
        ).textContent = title;
        
        document.getElementById(
        "quickViewPrice"
        ).textContent = price;
        
        document.getElementById(
        "quickViewModal"
        ).style.display = "flex";
        
        }
        
        document
        .getElementById("closeQuickView")
        .addEventListener("click",()=>{
        
        document
        .getElementById("quickViewModal")
        .style.display="none";
        
    });