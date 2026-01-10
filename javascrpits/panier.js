let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartBody = document.getElementById("cart-body");
const cartTotal = document.getElementById("cart-total");
const emptyCart = document.getElementById("empty-cart");
const cartTable = document.getElementById("cart-table");
const cartSummary = document.getElementById("cart-summary");

function renderCart() {
    cartBody.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartTable.style.display = "none";
        cartSummary.style.display = "none";
        emptyCart.style.display = "block";
        return;
    }

    cart.forEach((item, index) => {
        total += item.price;

        cartBody.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.price.toFixed(2)} €</td>
                <td>
                    <button class="remove-btn" onclick="removeItem(${index})">✖</button>
                </td>
            </tr>
        `;
    });

    cartTotal.textContent = total.toFixed(2);
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

renderCart();
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");

const cartBtn = document.getElementById("cart-btn");
const cartDrawer = document.getElementById("cart-drawer");
const cartOverlay = document.getElementById("cart-overlay");
const closeCart = document.getElementById("close-cart");

cartBtn.onclick = (e) => {
    e.preventDefault();
    cartDrawer.classList.add("open");
    cartOverlay.classList.add("open");
    renderMiniCart();
};

closeCart.onclick = closeMiniCart;
cartOverlay.onclick = closeMiniCart;

function closeMiniCart() {
    cartDrawer.classList.remove("open");
    cartOverlay.classList.remove("open");
}

function renderMiniCart() {
    cartItems.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Panier vide</p>";
        cartTotal.textContent = "0.00";
        cartCount.textContent = "0";
        return;
    }

    cart.forEach((item, index) => {
        total += item.price;

        cartItems.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <p><strong>${item.name}</strong></p>
                    <p>${item.price.toFixed(2)} €</p>
                </div>
                <button class="cart-item-remove" onclick="removeFromMiniCart(${index})">✖</button>
            </div>
        `;
    });

    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = cart.length;
}

function removeFromMiniCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderMiniCart();
}

