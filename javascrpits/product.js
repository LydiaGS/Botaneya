let cart = [];

const cartBtn = document.getElementById("cart-btn");
const cartDrawer = document.getElementById("cart-drawer");
const cartOverlay = document.getElementById("cart-overlay");
const closeCart = document.getElementById("close-cart");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");

cartBtn.onclick = () => {
    cartDrawer.classList.add("open");
    cartOverlay.classList.add("open");
};

closeCart.onclick = closeCartDrawer;
cartOverlay.onclick = closeCartDrawer;

function closeCartDrawer() {
    cartDrawer.classList.remove("open");
    cartOverlay.classList.remove("open");
}

document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", () => {
        const name = btn.dataset.name;
        const price = parseFloat(btn.dataset.price);

        cart.push({ name, price });
        updateCart();
    });
});

function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;

        cartItems.innerHTML += `
            <div class="cart-item">
                <span>${item.name}</span>
                <span>
                    ${item.price.toFixed(2)} €
                    <button onclick="removeItem(${index})">✖</button>
                </span>
            </div>
        `;
    });

    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = cart.length;
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}
