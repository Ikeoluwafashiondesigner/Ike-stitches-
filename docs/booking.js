// ============================================
// BOOKING PAGE SCRIPT
// IKE-STITCHES
// ============================================

// SAFETY CHECK
const allStylesSafe = typeof allStyles !== "undefined" ? allStyles : [];

// ============================================
// LOAD BOOKING ITEMS
// ============================================

function loadBookingItems() {

    const container = document.getElementById("bookingItems");
    if (!container) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    container.innerHTML = "";

    if (cart.length > 0) {

        cart.forEach(item => {

            let gallery = "";

            if (item.images && item.images.length) {
                item.images.forEach(img => {
                    gallery += `<img src="${img}" class="booking-gallery-img" alt="${item.name}">`;
                });
            } else if (item.image) {
                gallery = `<img src="${item.image}" class="booking-gallery-img" alt="${item.name}">`;
            }

            container.innerHTML += `
                <div class="booking-item">
                    <div class="booking-gallery">${gallery}</div>
                    <div class="booking-info">
                        <h3>${item.name}</h3>
                        <p>₦${Number(item.price).toLocaleString()}</p>
                        <p>Qty: ${item.qty}</p>
                        <p>Subtotal: ₦${(item.price * item.qty).toLocaleString()}</p>
                    </div>
                </div>
            `;
        });

        return;
    }

    // SINGLE STYLE
    const styleKey = localStorage.getItem("styleKey");
    const styleName = localStorage.getItem("styleName");
    const styleImg = localStorage.getItem("styleImg");

    if (!styleKey || !styleName || !styleImg) {
        container.innerHTML = `<p>No style selected</p>`;
        return;
    }

    const style = allStylesSafe.find(s => s.id === styleKey);

    if (!style) {
        container.innerHTML = `<p>Style not found</p>`;
        return;
    }

    container.innerHTML = `
        <div class="booking-item">
            <div class="booking-gallery">
                <img src="${styleImg}" class="booking-gallery-img" alt="${styleName}">
            </div>
            <div class="booking-info">
                <h3>${styleName}</h3>
                <p>₦${style.price.toLocaleString()}</p>
                <p>${style.description || ""}</p>
                <p>Fabric: ${style.fabric || "Premium"}</p>
                <p>Duration: ${style.duration || "5 - 7 days"}</p>
            </div>
        </div>
    `;
}

// ============================================
// PAYSTACK PAYMENT (CLEAN)
// ============================================

function payWithPaystack() {

    const email = document.getElementById("email")?.value;
    const quantity = parseInt(document.getElementById("quantity")?.value) || 1;
    const paymentType = document.getElementById("paymentType")?.value || "full";

    if (!email) {
        showToast("Enter email");
        return;
    }

    const styleKey = localStorage.getItem("styleKey");
    const style = allStylesSafe.find(s => s.id === styleKey);

    if (!style) {
        showToast("Style not found");
        return;
    }

    let total = style.price * quantity;

    if (paymentType === "half") {
        total = total / 2;
    }

    const handler = PaystackPop.setup({

        key: "pk_live_xxxxxxxxxxxxxxxxx", // replace with real key

        email: email,
        amount: total * 100,
        currency: "NGN",
        ref: "IKE_" + Date.now(),

        callback: async function (response) {

            try {
        
                const token = localStorage.getItem("token");
        
                if (!token) {
                    showToast("Login required");
                    return;
                }
        
                // 1. VERIFY PAYMENT
                const verify = await fetch("/api/verify-payment", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token
                    },
                    body: JSON.stringify({
                        reference: response.reference
                    })
                });
        
                const verifyData = await verify.json();
        
                if (!verifyData.success) {
                    showToast("Payment failed verification");
                    return;
                }
        
                // 2. SAVE ORDER TO BACKEND
                await saveOrder(response.reference);
        
                // 3. CLEAR CART (IMPORTANT)
                localStorage.removeItem("cart");
        
                // 4. SUCCESS UI
                showSuccessModal();
        
                showToast("Order placed successfully");
        
            } catch (err) {
                console.error(err);
                showToast("Error completing payment");
            }
        }
    });

    handler.openIframe();
}

// ============================================
// TOTAL PRICE
// ============================================

function updateBookingTotal() {

    const quantity = parseInt(document.getElementById("quantity")?.value) || 1;
    const paymentType = document.getElementById("paymentType")?.value || "full";
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;

    if (cart.length > 0) {
        cart.forEach(item => {
            total += Number(item.price) * Number(item.qty || 1);
        });
    } else {

        const styleKey = localStorage.getItem("styleKey");
        const style = allStylesSafe.find(s => s.id === styleKey);

        if (!style) return;

        total = style.price * quantity;
    }

    if (paymentType === "half") {
        total = total / 2;
    }

    const box = document.getElementById("bookingTotal");
    if (box) box.innerText = "₦" + total.toLocaleString();
}

// ============================================
// INIT
// ============================================

document.addEventListener("DOMContentLoaded", () => {

    loadBookingItems();
    updateBookingTotal();

    document.getElementById("quantity")?.addEventListener("input", updateBookingTotal);
    document.getElementById("paymentType")?.addEventListener("change", updateBookingTotal);
});

// ============================================
// COLOR PREVIEW
// ============================================

function showColor() {

    const input = document.getElementById("colorInput");
    const preview = document.getElementById("colorPreview");

    if (input && preview) {
        preview.style.background = input.value;
    }
}

// ============================================
// MODAL
// ============================================

function showSuccessModal() {
    document.getElementById("successModal")?.style.setProperty("display", "flex");
}

function closeSuccessModal() {
    document.getElementById("successModal")?.style.setProperty("display", "none");
}
async function saveOrder(reference) {

    const token = localStorage.getItem("token");

    const styleKey = localStorage.getItem("styleKey");
    const style = allStyles.find(s => s.id === styleKey);

    const quantity = parseInt(document.getElementById("quantity")?.value) || 1;

    const color = document.getElementById("colorInput")?.value;
    const fabric = document.getElementById("fabricType")?.value;

    const bust = document.getElementById("bust")?.value;
    const waist = document.getElementById("waist")?.value;
    const hip = document.getElementById("hip")?.value;
    const length = document.getElementById("length")?.value;

    const res = await fetch("/api/order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
            style: style?.name || "Unknown",
            color,
            fabric,
            qty: quantity,
            measurements: {
                bust,
                waist,
                hip,
                length
            },
            reference
        })
    });

    const data = await res.json();

    console.log("Order saved:", data);
}