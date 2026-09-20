// ============================================================
// Admin order dashboard. Requires Firebase config + a Firebase
// Authentication user set up — see README.md "Admin Dashboard".
// ============================================================

if (!SHOP_CONFIG.firebase.apiKey) {
  document.getElementById("loginError").textContent =
    "Firebase isn't configured yet in js/config.js — see README.md.";
} else {
  firebase.initializeApp(SHOP_CONFIG.firebase);
}

const auth = SHOP_CONFIG.firebase.apiKey ? firebase.auth() : null;
const db = SHOP_CONFIG.firebase.apiKey ? firebase.firestore() : null;
const money = (n) => "₹" + Number(n).toLocaleString("en-IN");

document.getElementById("dashTitle").textContent = `${SHOP_CONFIG.shopName} — Orders`;

document.getElementById("loginBtn").addEventListener("click", async () => {
  const email = document.getElementById("adminEmail").value.trim();
  const password = document.getElementById("adminPassword").value;
  const errEl = document.getElementById("loginError");
  errEl.textContent = "";
  if (!auth) return;
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (e) {
    errEl.textContent = "Login failed: " + e.message;
  }
});

document.getElementById("logoutBtn").addEventListener("click", () => auth && auth.signOut());

if (auth) {
  auth.onAuthStateChanged((user) => {
    document.getElementById("loginView").style.display = user ? "none" : "block";
    document.getElementById("dashboardView").style.display = user ? "block" : "none";
    if (user) subscribeToOrders();
  });
}

let unsubscribe = null;
function subscribeToOrders() {
  if (unsubscribe) unsubscribe();
  unsubscribe = db.collection("orders").orderBy("createdAt", "desc").onSnapshot((snapshot) => {
    const listEl = document.getElementById("orderList");
    const emptyEl = document.getElementById("emptyState");

    if (snapshot.empty) {
      listEl.innerHTML = "";
      emptyEl.style.display = "block";
      return;
    }
    emptyEl.style.display = "none";

    listEl.innerHTML = snapshot.docs.map(doc => {
      const o = doc.data();
      const status = o.status || "new";
      const itemsHtml = (o.items || []).map(i => `<div>${i.name} × ${i.qty} — ${money(i.lineTotal)}</div>`).join("");
      const date = o.createdAt ? new Date(o.createdAt).toLocaleString("en-IN") : "";
      return `
        <div class="order-card">
          <div class="order-top">
            <span class="cust">${o.name} — ${o.phone}</span>
            <span class="date">${date}</span>
          </div>
          <div class="order-items">${itemsHtml}</div>
          <div class="contact-line">📍 ${o.address}${o.notes ? " · Note: " + o.notes : ""}</div>
          <div class="order-bottom">
            <span class="order-total">${money(o.total)}</span>
            <select class="status-select status-${status}" data-id="${doc.id}">
              <option value="new" ${status === "new" ? "selected" : ""}>New</option>
              <option value="packed" ${status === "packed" ? "selected" : ""}>Packed</option>
              <option value="delivered" ${status === "delivered" ? "selected" : ""}>Delivered</option>
              <option value="cancelled" ${status === "cancelled" ? "selected" : ""}>Cancelled</option>
            </select>
          </div>
        </div>`;
    }).join("");

    listEl.querySelectorAll(".status-select").forEach(sel => {
      sel.addEventListener("change", async (e) => {
        await db.collection("orders").doc(e.target.dataset.id).update({ status: e.target.value });
      });
    });
  });
}
