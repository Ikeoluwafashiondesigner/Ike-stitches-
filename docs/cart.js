// ============================================
// CART SCRIPT
// IKE-STITCHES
// ============================================

// ============================================
// OPEN / CLOSE CART
// ============================================

function toggleCart(){

    const cartSidebar =
    document.getElementById("cartSidebar");
    
    if(!cartSidebar) return;
    
    cartSidebar.classList.toggle("show");
    
    document.body.classList.toggle(
    "cart-open"
    );
    
    // LOAD ITEMS
    loadCartItems();
    
    }
    
    // ============================================
    // LOAD CART ITEMS
    // ============================================
    
    function loadCartItems(){
    
    const cartItems =
    document.getElementById("cartItems");
    
    if(!cartItems) return;
    
    // GET CART
    let cart =
    JSON.parse(
    localStorage.getItem("cart")
    ) || [];
    
    // ============================================
    // EMPTY CART
    // ============================================
    
    if(cart.length === 0){
    
    cartItems.innerHTML = `
    
    <div class="empty-cart-box">
    
    <p class="empty-cart-text">
    Your cart is empty
    </p>
    
    <a
    href="gallery.html"
    class="continue-shopping">
    
    Continue Shopping
    
    </a>
    
    </div>
    
    `;
    
    updateCartSummary();
    
    return;
    
    }
    
    // ============================================
    // LOAD ITEMS
    // ============================================
    
    let html = "";
    
    cart.forEach((item,index)=>{
    
    const subtotal =
    item.price * item.qty;
    
    html += `
    
    <div class="cart-item">
    
    <div class="cart-item-image">
    
    <img
    src="${
    item.image ||
    (item.images
    ? item.images[0]
    : "")
    }"
    alt="${item.name}">
    
    </div>
    
    <div class="cart-item-info">
    
    <h3>${item.name}</h3>
    
    <p class="cart-price">
    ₦${item.price.toLocaleString()}
    </p>
    
    <div class="cart-qty-controls">
    
    <button
    onclick="decreaseCartQty(${index})">
    
    −
    
    </button>
    
    <span>${item.qty}</span>
    
    <button
    onclick="increaseCartQty(${index})">
    
    +
    
    </button>
    
    </div>
    
    <p class="cart-subtotal">
    
    Subtotal:
    ₦${subtotal.toLocaleString()}
    
    </p>
    
    </div>
    
    <button
    class="remove-cart-btn"
    onclick="removeCartItem(${index})">
    
    ✖
    
    </button>
    
    </div>
    
    `;
    
    });
    
    cartItems.innerHTML = html;
    
    // UPDATE SUMMARY
    updateCartSummary();
    
    }
    
    // ============================================
    // UPDATE CART SUMMARY
    // ============================================
    
    function updateCartSummary(){
    
    const cart =
    JSON.parse(
    localStorage.getItem("cart")
    ) || [];
    
    // TOTAL ITEMS
    const totalItems =
    cart.reduce((total,item)=>{
    
    return total +
    Number(item.qty || 1);
    
    },0);
    
    // TOTAL PRICE
    const totalPrice =
    cart.reduce((total,item)=>{
    
    return total +
    (item.price * item.qty);
    
    },0);
    
    // UPDATE COUNT
    const cartCount =
    document.getElementById("cartCount");
    
    if(cartCount){
    
    cartCount.innerText = totalItems;
    
    }
    
    // UPDATE TOTAL
    const cartTotal =
    document.getElementById("cartTotal");
    
    if(cartTotal){
    
    cartTotal.innerText =
    "₦" + totalPrice.toLocaleString();
    
    }
    
    }
    
    // ============================================
    // INCREASE QTY
    // ============================================
    
    function increaseCartQty(index){
    
    let cart =
    JSON.parse(
    localStorage.getItem("cart")
    ) || [];
    
    if(!cart[index]) return;
    
    cart[index].qty += 1;
    
    // SAVE
    localStorage.setItem(
    "cart",
    JSON.stringify(cart)
    );
    
    // RELOAD
    loadCartItems();
    
    }
    
    // ============================================
    // DECREASE QTY
    // ============================================
    
    function decreaseCartQty(index){
    
    let cart =
    JSON.parse(
    localStorage.getItem("cart")
    ) || [];
    
    if(!cart[index]) return;
    
    // MINIMUM 1
    if(cart[index].qty > 1){
    
    cart[index].qty -= 1;
    
    }
    
    // SAVE
    localStorage.setItem(
    "cart",
    JSON.stringify(cart)
    );
    
    // RELOAD
    loadCartItems();
    
    }
    
    // ============================================
    // REMOVE ITEM
    // ============================================
    
    function removeCartItem(index){
    
    let cart =
    JSON.parse(
    localStorage.getItem("cart")
    ) || [];
    
    if(!cart[index]) return;
    
    // REMOVE
    cart.splice(index,1);
    
    // SAVE
    localStorage.setItem(
    "cart",
    JSON.stringify(cart)
    );
    
    // UPDATE
    loadCartItems();
    
    showCartToast(
    "Item removed from cart"
    );
    
    }
    
    // ============================================
    // CLEAR CART
    // ============================================
    
    function clearCart(){
    
    const confirmClear =
    confirm(
    "Clear all cart items?"
    );
    
    if(!confirmClear) return;
    
    // CLEAR
    localStorage.removeItem("cart");
    
    // RELOAD
    loadCartItems();
    
    showCartToast(
    "Cart cleared"
    );
    
    }
    
    // ============================================
    // GO TO BOOKING
    // ============================================
    
    function goToBooking(){
    
    const cart =
    JSON.parse(
    localStorage.getItem("cart")
    ) || [];
    
    // EMPTY CHECK
    if(cart.length === 0){
    
    alert("Your cart is empty");
    
    return;
    
    }
    
    window.location.href =
    "booking.html";
    
    }
    
    // ============================================
    // TOAST NOTIFICATION
    // ============================================
    
    function showCartToast(message){
    
    const toast =
    document.getElementById("cartToast");
    
    if(!toast) return;
    
    toast.innerText = message;
    
    toast.classList.add("show-cart-toast");
    
    setTimeout(()=>{
    
    toast.classList.remove(
    "show-cart-toast"
    );
    
    },3000);
    
    }
    
    // ============================================
    // SAVE CART ITEM
    // ============================================
    
    function addToCart(styleKey){

        const style =
        allStyles.find(
        item => item.id === styleKey
        );
        
        if(!style){
        
        alert("Style not found");
        return;
        
        }
        
        let cart =
        JSON.parse(
        localStorage.getItem("cart")
        ) || [];
        
        const existingItem =
        cart.find(
        item => item.id === style.id
        );
        
        if(existingItem){
        
        existingItem.qty += 1;
        
        }
        
        else{
        
        cart.push({
        
        id: style.id,
        name: style.name,
        price: style.price,
        image: style.image,
        qty:1
        
        });
        
        }
        
        localStorage.setItem(
        "cart",
        JSON.stringify(cart)
        );
        
        updateCartCount();
        
        showToast(
        style.name + " added to cart"
        );
        
    }
    
    // ============================================
    // PAGE LOAD
    // ============================================
    
    document.addEventListener(
    "DOMContentLoaded",
    function(){
    
    // LOAD SUMMARY
    updateCartSummary();
    
    // LOAD CART ITEMS
    loadCartItems();
    
    }
    );
    const styleCount =
    document.getElementById("styleCount");
    
    if(styleCount){
    
      styleCount.innerText =
      allStyles.length + " Styles";
    
    }
// ============================================
// UPDATE BOOKING TOTAL
// ============================================

