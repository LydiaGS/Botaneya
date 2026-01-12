/* =========================
   PANIER GLOBAL
========================= */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* =========================
   COMPTEUR PANIER (HEADER)
========================= */
const cartCount = document.getElementById("cart-count");

function updateCartCount() {
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

/* =========================
   MINI PANIER (DRAWER)
========================= */
const cartBtn = document.getElementById("cart-btn");
const cartDrawer = document.getElementById("cart-drawer");
const cartOverlay = document.getElementById("cart-overlay");
const closeCart = document.getElementById("close-cart");
const cartItems = document.getElementById("cart-items");
const cartTotalMini = document.getElementById("cart-total");

if (cartBtn) {
    cartBtn.addEventListener("click", (e) => {
        e.preventDefault();
        cartDrawer.classList.add("open");
        cartOverlay.classList.add("open");
        renderMiniCart();
    });
}

if (closeCart) closeCart.addEventListener("click", closeMiniCart);
if (cartOverlay) cartOverlay.addEventListener("click", closeMiniCart);

function closeMiniCart() {
    cartDrawer.classList.remove("open");
    cartOverlay.classList.remove("open");
}

function renderMiniCart() {
    if (!cartItems) return;

    cartItems.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Panier vide</p>";
        cartTotalMini.textContent = "0.00";
        updateCartCount();
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
                <button class="cart-item-remove" onclick="removeItem(${index})">✖</button>
            </div>
        `;
    });

    cartTotalMini.textContent = total.toFixed(2);
    updateCartCount();
}

/* =========================
   PAGE PANIER
========================= */
const cartBody = document.getElementById("cart-body");
const cartSummary = document.getElementById("cart-summary");
const emptyCart = document.getElementById("empty-cart");
const cartTable = document.querySelector(".cart-table");
const cartTotalPage = document.querySelector(".cart-summary #cart-total");

function renderCartPage() {
    if (!cartBody) return;

    cartBody.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartTable.style.display = "none";
        cartSummary.style.display = "none";
        emptyCart.style.display = "block";
        return;
    }

    cartTable.style.display = "table";
    cartSummary.style.display = "block";
    emptyCart.style.display = "none";

    cart.forEach((item, index) => {
        total += item.price;

        cartBody.innerHTML += `
            <tr>
                <td><img src="${item.image}" style="width:70px"></td>
                <td>${item.name}</td>
                <td>${item.price.toFixed(2)} €</td>
                <td>
                    <button class="remove-btn" onclick="removeItem(${index})">✖</button>
                </td>
            </tr>
        `;
    });

    cartTotalPage.textContent = total.toFixed(2);
}

/* =========================
   SUPPRESSION PRODUIT
========================= */
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderMiniCart();
    renderCartPage();
}

/* =========================
   AJOUT AU PANIER
========================= */
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
        const product = {
            name: button.dataset.name,
            price: parseFloat(button.dataset.price),
            image: button.dataset.image
        };

        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));

        updateCartCount();
        renderMiniCart();
    });
});

/* =========================
   INITIALISATION
========================= */
updateCartCount();
renderMiniCart();
renderCartPage();