async function loadMyOrders() {

    const container = document.getElementById("ordersContainer");
    if (!container) return;

    const token = localStorage.getItem("token");

    if (!token) {
        container.innerHTML = "<p>Please login</p>";
        return;
    }
    if (!Array.isArray(orders)) {
        container.innerHTML = "<p>Error loading orders</p>";
        return;
    }

    try {

        const res = await fetch("/api/my-orders", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const orders = await res.json();

        console.log("Orders Response:", orders);
        if (orders.length === 0) {
            container.innerHTML = `
                <div class="empty-dashboard">
                    <h2>No Orders Yet 📦</h2>
                    <p>You haven't placed any order yet.</p>
                    <a href="styles.html" class="btn">Start Booking</a>
                </div>
            `;
            return;
        }

        container.innerHTML = "";

        orders.forEach(order => {

            container.innerHTML += `
                <div class="order-card">

                    <h3>${order.style}</h3>

                    <p><b>Price:</b> ₦${order.price.toLocaleString()}</p>

                    <p><b>Qty:</b> ${order.qty}</p>

                    <p><b>Status:</b> ${order.status}</p>

                    <p><b>Color:</b> ${order.color || "N/A"}</p>

                    <p><b>Fabric:</b> ${order.fabric || "N/A"}</p>

                    <p><b>Reference:</b> ${order.reference || "N/A"}</p>

                    <p><b>Date:</b> ${new Date(order.date).toLocaleDateString()}</p>

                </div>
            `;
        });

    } catch (err) {
        console.error(err);
        container.innerHTML = "<p>Error loading orders</p>";
    }
}

document.addEventListener("DOMContentLoaded", loadMyOrders);