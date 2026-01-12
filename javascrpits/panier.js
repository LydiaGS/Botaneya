let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* =====================
   ELEMENTS
===================== */
const cartBtn = document.getElementById("cart-btn");
const cartDrawer = document.getElementById("cart-drawer-overlay");
const cartOverlay = document.getElementById("cart-overlay");
const closeCart = document.getElementById("close-cart");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");

/* =====================
   OUVERTURE / FERMETURE
===================== */
cartBtn?.addEventListener("click", e => {
    e.preventDefault();
    openCart();
});

closeCart?.addEventListener("click", closeCartDrawer);
cartOverlay?.addEventListener("click", closeCartDrawer);

function openCart() {
    cartDrawer.classList.add("active");
    cartOverlay.classList.add("active");
    renderCart();
}

function closeCartDrawer() {
    cartDrawer.classList.remove("active");
    cartOverlay.classList.remove("active");
}

/* =====================
   RENDER PANIER
===================== */
function renderCart() {
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
                    <p class="item-name">${item.name}</p>
                    <p class="item-price">${item.price.toFixed(2)} €</p>
                </div>
                <button class="cart-item-remove" data-index="${index}">✖</button>
            </div>
        `;
    });

    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = cart.length;

    document.querySelectorAll(".cart-item-remove").forEach(btn => {
        btn.addEventListener("click", () => removeItem(btn.dataset.index));
    });
}

/* =====================
   SUPPRESSION
===================== */
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

/* =====================
   AJOUT AU PANIER
===================== */
document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", () => {

        const card = btn.closest(".product-card");
        const image = card.querySelector(".product-image img").src;

        const product = {
            name: btn.dataset.name,
            price: parseFloat(btn.dataset.price),
            image: image
        };

        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));

        openCart();
    });
});

/* =====================
   INIT
===================== */
renderCart();
