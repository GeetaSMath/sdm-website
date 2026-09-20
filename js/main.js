// ============================================================
// Main app logic: rendering, cart, checkout, order submission.
// No build step required — plain JS, works by opening index.html
// or hosting the folder as-is.
// ============================================================

const state = {
  cart: JSON.parse(localStorage.getItem("cart") || "{}"), // { productId: qty }
  activeCategory: "all",
  searchTerm: "",
};

const money = (n) => "₹" + Number(n).toLocaleString("en-IN");

// ---------- INIT: fill config-driven text ----------
function initShopInfo() {
  document.title = `${SHOP_CONFIG.shopName} | ${SHOP_CONFIG.address}`;
  document.getElementById("shopNameHeader").textContent = SHOP_CONFIG.shopName;
  document.getElementById("shopTagline").textContent = SHOP_CONFIG.tagline;
  document.getElementById("topbarAddress").textContent = SHOP_CONFIG.address;
  const topbarPhone = document.getElementById("topbarPhone");
  topbarPhone.textContent = SHOP_CONFIG.contactPhone;
  topbarPhone.href = `tel:${SHOP_CONFIG.contactPhone.replace(/\s/g, "")}`;
  document.getElementById("heroAddress").textContent = SHOP_CONFIG.address;
  document.getElementById("minOrderAmount").textContent = money(SHOP_CONFIG.minOrderAmount);
  document.getElementById("footerShopName").textContent = SHOP_CONFIG.shopName;
  document.getElementById("footerShopName2").textContent = SHOP_CONFIG.shopName;
  document.getElementById("footerAddress").textContent = SHOP_CONFIG.address;
  document.getElementById("footerPhone").textContent = SHOP_CONFIG.contactPhone;
  document.getElementById("footerWhatsapp").href = `https://wa.me/${SHOP_CONFIG.whatsappNumber}`;
  document.getElementById("footerYear").textContent = new Date().getFullYear();
}

// ---------- RENDER: categories ----------
function renderCategories() {
  const navEl = document.getElementById("navCategories");
  const gridEl = document.getElementById("categoryGrid");
  const filterEl = document.getElementById("filterBar");

  const allBtn = (label, id) =>
    `<button data-cat="${id}" class="${state.activeCategory === id ? "active" : ""}">${label}</button>`;

  navEl.innerHTML = allBtn("All Products", "all") + CATEGORIES.map(c => allBtn(c.name, c.id)).join("");
  filterEl.innerHTML = navEl.innerHTML;

  gridEl.innerHTML = CATEGORIES.map(c => `
    <div class="category-card" data-cat="${c.id}">
      <span class="icon">${c.icon}</span>
      <span class="name">${c.name}</span>
    </div>
  `).join("");

  document.querySelectorAll("[data-cat]").forEach(el => {
    el.addEventListener("click", () => {
      state.activeCategory = el.dataset.cat;
      document.getElementById("products").scrollIntoView({ behavior: "smooth" });
      renderCategories();
      renderProducts();
    });
  });
}

// ---------- RENDER: products ----------
function renderProducts() {
  const grid = document.getElementById("productGrid");
  const term = state.searchTerm.trim().toLowerCase();

  const list = PRODUCTS.filter(p => {
    const matchesCat = state.activeCategory === "all" || p.category === state.activeCategory;
    const matchesTerm = !term || p.name.toLowerCase().includes(term);
    return matchesCat && matchesTerm;
  });

  document.getElementById("noResults").style.display = list.length ? "none" : "block";

  grid.innerHTML = list.map(p => {
    const qty = state.cart[p.id] || 0;
    const discount = p.mrp > p.price ? Math.round(100 - (p.price / p.mrp) * 100) : 0;
    return `
    <div class="product-card">
      <div class="product-image">🎆</div>
      <div class="product-body">
        <div class="product-name">${p.name}</div>
        <div class="product-unit">${p.unit}</div>
        <div class="product-price">
          <span class="price-now">${money(p.price)}</span>
          ${p.mrp > p.price ? `<span class="price-mrp">${money(p.mrp)}</span><span class="discount-badge">${discount}% OFF</span>` : ""}
        </div>
        <div class="add-cart-row" data-id="${p.id}">
          ${qty === 0
            ? `<button class="add-btn">Add to Cart</button>`
            : `<div class="qty-controls">
                 <button class="dec">−</button>
                 <span>${qty}</span>
                 <button class="inc">+</button>
               </div>`
          }
        </div>
      </div>
    </div>`;
  }).join("");

  grid.querySelectorAll(".add-cart-row").forEach(row => {
    const id = row.dataset.id;
    row.querySelector(".add-btn")?.addEventListener("click", () => changeQty(id, 1));
    row.querySelector(".inc")?.addEventListener("click", () => changeQty(id, 1));
    row.querySelector(".dec")?.addEventListener("click", () => changeQty(id, -1));
  });
}

// ---------- CART ----------
function changeQty(id, delta) {
  const current = state.cart[id] || 0;
  const next = Math.max(0, current + delta);
  if (next === 0) delete state.cart[id];
  else state.cart[id] = next;
  localStorage.setItem("cart", JSON.stringify(state.cart));
  renderProducts();
  renderCart();
}

function cartEntries() {
  return Object.entries(state.cart).map(([id, qty]) => {
    const product = PRODUCTS.find(p => p.id === id);
    return { product, qty };
  }).filter(e => e.product);
}

function cartTotal() {
  return cartEntries().reduce((sum, e) => sum + e.product.price * e.qty, 0);
}

function renderCart() {
  const items = cartEntries();
  const countEl = document.getElementById("cartCount");
  countEl.textContent = items.reduce((s, e) => s + e.qty, 0);

  const itemsEl = document.getElementById("cartItems");
  itemsEl.innerHTML = items.length
    ? items.map(e => `
      <div class="cart-item" data-id="${e.product.id}">
        <div class="info">
          <div class="name">${e.product.name}</div>
          <div class="price">${money(e.product.price)} × ${e.qty} = ${money(e.product.price * e.qty)}</div>
        </div>
        <div class="qty-controls">
          <button class="dec">−</button>
          <span>${e.qty}</span>
          <button class="inc">+</button>
        </div>
        <button class="remove-btn" title="Remove">🗑</button>
      </div>
    `).join("")
    : `<p style="color:var(--muted);text-align:center;padding:30px 0;">Your cart is empty.</p>`;

  itemsEl.querySelectorAll(".cart-item").forEach(row => {
    const id = row.dataset.id;
    row.querySelector(".inc").addEventListener("click", () => changeQty(id, 1));
    row.querySelector(".dec").addEventListener("click", () => changeQty(id, -1));
    row.querySelector(".remove-btn").addEventListener("click", () => {
      delete state.cart[id];
      localStorage.setItem("cart", JSON.stringify(state.cart));
      renderProducts();
      renderCart();
    });
  });

  const total = cartTotal();
  document.getElementById("cartTotal").textContent = money(total);
  const minNotice = document.getElementById("cartMinNotice");
  const belowMin = total > 0 && total < SHOP_CONFIG.minOrderAmount;
  minNotice.textContent = belowMin
    ? `Add ${money(SHOP_CONFIG.minOrderAmount - total)} more to reach the minimum order of ${money(SHOP_CONFIG.minOrderAmount)}.`
    : "";
  document.getElementById("checkoutBtn").disabled = items.length === 0 || belowMin;
  document.getElementById("checkoutBtn").style.opacity = (items.length === 0 || belowMin) ? 0.5 : 1;
}

// ---------- CART DRAWER / MODALS ----------
function openCart() {
  document.getElementById("cartDrawer").classList.add("open");
  document.getElementById("overlay").classList.add("show");
}
function closeCart() {
  document.getElementById("cartDrawer").classList.remove("open");
  document.getElementById("overlay").classList.remove("show");
}
function openCheckout() {
  const items = cartEntries();
  document.getElementById("orderSummary").innerHTML =
    items.map(e => `<div class="row"><span>${e.product.name} × ${e.qty}</span><span>${money(e.product.price * e.qty)}</span></div>`).join("") +
    `<div class="row" style="font-weight:700;border-top:1px solid var(--border);margin-top:6px;padding-top:6px;"><span>Total</span><span>${money(cartTotal())}</span></div>`;
  closeCart();
  document.getElementById("checkoutOverlay").classList.add("show");
}
function closeCheckout() {
  document.getElementById("checkoutOverlay").classList.remove("show");
}

// ---------- ORDER SUBMISSION ----------
let firebaseDb = null;
function initFirebase() {
  const cfg = SHOP_CONFIG.firebase;
  if (!cfg.apiKey || typeof firebase === "undefined") return;
  try {
    firebase.initializeApp(cfg);
    firebaseDb = firebase.firestore();
  } catch (e) {
    console.warn("Firebase init skipped:", e.message);
  }
}

function initEmailJs() {
  if (SHOP_CONFIG.emailjs.publicKey && typeof emailjs !== "undefined") {
    emailjs.init({ publicKey: SHOP_CONFIG.emailjs.publicKey });
  }
}

async function saveOrderToFirestore(order) {
  if (!firebaseDb) return;
  try {
    await firebaseDb.collection("orders").add({ ...order, createdAt: new Date().toISOString() });
  } catch (e) {
    console.warn("Order not saved to Firestore (check config):", e.message);
  }
}

async function sendOrderEmail(order) {
  const cfg = SHOP_CONFIG.emailjs;
  if (!cfg.serviceId || typeof emailjs === "undefined") return;
  const itemsText = order.items.map(i => `${i.name} x${i.qty} = ${money(i.lineTotal)}`).join("\n");
  try {
    await emailjs.send(cfg.serviceId, cfg.templateId, {
      shop_name: SHOP_CONFIG.shopName,
      customer_name: order.name,
      customer_phone: order.phone,
      customer_address: order.address,
      notes: order.notes || "-",
      items: itemsText,
      total: money(order.total),
      to_email: SHOP_CONFIG.contactEmail,
    });
  } catch (e) {
    console.warn("Order email not sent (check EmailJS config):", e.message);
  }
}

function buildWhatsappLink(order) {
  const lines = [
    `New order from ${order.name} (${order.phone})`,
    ``,
    ...order.items.map(i => `${i.name} x${i.qty} - ${money(i.lineTotal)}`),
    ``,
    `Total: ${money(order.total)}`,
    `Address: ${order.address}`,
    order.notes ? `Notes: ${order.notes}` : "",
  ].filter(Boolean);
  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${SHOP_CONFIG.whatsappNumber}?text=${text}`;
}

async function handleCheckoutSubmit(e) {
  e.preventDefault();
  const items = cartEntries();
  if (!items.length) return;

  const order = {
    name: document.getElementById("custName").value.trim(),
    phone: document.getElementById("custPhone").value.trim(),
    address: document.getElementById("custAddress").value.trim(),
    notes: document.getElementById("custNotes").value.trim(),
    items: items.map(e => ({ id: e.product.id, name: e.product.name, qty: e.qty, price: e.product.price, lineTotal: e.product.price * e.qty })),
    total: cartTotal(),
  };

  // Open synchronously (same click gesture) so browsers don't block the popup.
  window.open(buildWhatsappLink(order), "_blank");

  const placeBtn = document.getElementById("placeOrderBtn");
  placeBtn.disabled = true;
  placeBtn.textContent = "Placing order...";

  await Promise.all([saveOrderToFirestore(order), sendOrderEmail(order)]);

  placeBtn.disabled = false;
  placeBtn.textContent = "Place Order";

  closeCheckout();
  document.getElementById("successOverlay").classList.add("show");

  state.cart = {};
  localStorage.removeItem("cart");
  renderProducts();
  renderCart();
  document.getElementById("checkoutForm").reset();
}

// ---------- EVENT WIRING ----------
function wireEvents() {
  document.getElementById("cartBtn").addEventListener("click", openCart);
  document.getElementById("closeCart").addEventListener("click", closeCart);
  document.getElementById("overlay").addEventListener("click", closeCart);
  document.getElementById("checkoutBtn").addEventListener("click", openCheckout);
  document.getElementById("closeCheckout").addEventListener("click", closeCheckout);
  document.getElementById("checkoutOverlay").addEventListener("click", (e) => {
    if (e.target.id === "checkoutOverlay") closeCheckout();
  });
  document.getElementById("checkoutForm").addEventListener("submit", handleCheckoutSubmit);
  document.getElementById("closeSuccess").addEventListener("click", () => {
    document.getElementById("successOverlay").classList.remove("show");
  });
  document.getElementById("searchInput").addEventListener("input", (e) => {
    state.searchTerm = e.target.value;
    renderProducts();
  });
}

// ---------- BOOT ----------
document.addEventListener("DOMContentLoaded", () => {
  initShopInfo();
  initFirebase();
  initEmailJs();
  renderCategories();
  renderProducts();
  renderCart();
  wireEvents();
});
