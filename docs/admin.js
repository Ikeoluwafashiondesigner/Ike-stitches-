async function checkAdmin() {

    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "login.html";
        return;
    }

    const res = await fetch("https://ike-elite-backend.onrender.com/api/me", {
        headers: {
            Authorization: "Bearer " + token
        }
    });

    const user = await res.json();

    if (!user.isAdmin) {
        alert("Access denied 🚫");
        window.location.href = "homepage.html";
    }
}

checkAdmin();
function loadOrders() {

    const token = localStorage.getItem("token");

    fetch("https://ike-elite-backend.onrender.com/api/admin/orders", {
        headers: {
            Authorization: "Bearer " + token
        }
    })
    .then(res => res.json())
    .then(orders => {

        const container = document.getElementById("orders");
        container.innerHTML = "";

        if (!orders.length) {
            container.innerHTML = "<p>No orders yet 📦</p>";
            return;
        }

        orders.forEach(order => {

            container.innerHTML += `
                <div class="order-card">

                    <h3>${order.style}</h3>

                    <p>₦${order.price}</p>
                    <p>Qty: ${order.qty}</p>

                    <p>Status: <b>${order.status}</b></p>

                    <button onclick="updateStatus('${order._id}', 'processing')">Processing</button>
                    <button onclick="updateStatus('${order._id}', 'completed')">Completed</button>

                </div>
            `;
        });

    });
}
function updateStatus(id, status) {

    const token = localStorage.getItem("token");

    fetch(`https://ike-elite-backend.onrender.com/api/order/${id}/status`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({ status })
    })
    .then(res => res.json())
    .then(() => {
        alert("Status updated");
        loadOrders();
    });
}
function loadStats() {

    const token = localStorage.getItem("token");

    fetch("https://ike-elite-backend.onrender.com/api/admin/stats", {
        headers: {
            Authorization: "Bearer " + token
        }
    })
    .then(res => res.json())
    .then(data => {

        document.getElementById("totalOrders").innerText =
            "Orders: " + data.totalOrders;

        document.getElementById("totalRevenue").innerText =
            "Revenue: ₦" + data.totalRevenue.toLocaleString();

        document.getElementById("pending").innerText =
            "Pending: " + data.pending;

        document.getElementById("completed").innerText =
            "Completed: " + data.completed;
    });
}
document.addEventListener("DOMContentLoaded", () => {
    loadStats();
    loadOrders();
});