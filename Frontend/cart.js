<script src="config.js"></script>
const CART_API = CONFIG.CART_SERVICE + '/cart';

async function loadCart() {
    try {
        const res = await fetch(`${CART_API}/`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        });

        const data = await res.json();

        console.log('Cart API response:', data); // ✅ DEBUG

        const container = document.getElementById('cartItems');
        const totalEl = document.getElementById('total');

        container.innerHTML = '';

        if (!data.items || !Array.isArray(data.items)) {
            console.error('Invalid data format:', data);
            return;
        }

       data.items.forEach(item => {
    container.innerHTML += `
        <tr>
            <td>${item.name}</td>

            <td>₹${item.price}</td>

            <!-- ✅ Quantity with buttons -->
            <td>
                <button onclick="updateQty(${item.id}, 'decrease')">➖</button>
                <span style="margin: 0 10px;">${item.quantity}</span>
                <button onclick="updateQty(${item.id}, 'increase')">➕</button>
            </td>

            <td>₹${item.subtotal}</td>

            <td>
                <button onclick="removeItem(${item.id})">❌</button>
            </td>
        </tr>
    `;
});
    } catch (err) {
        console.error('❌ Cart load error:', err);
    }
}
async function updateQty(id, action) {
    try {
        await fetch(`http://127.0.0.1:8003/api/cart/update/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
            body: JSON.stringify({ action })
        });

        loadCart(); // 🔄 refresh

    } catch (err) {
        console.error('Update error:', err);
    }
}