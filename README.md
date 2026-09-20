# Shree Suddhrameshwara Crackers — Website

A crackers e-commerce catalog site (styled like bigfestival.in) with cart, checkout,
and real-time order alerts — no paid backend required.

## What's in here

```
index.html        Page structure
css/styles.css     All styling
js/config.js       ← EDIT THIS: shop name, phone, WhatsApp, min order, API keys
js/products.js     ← EDIT THIS: your categories and products
js/main.js         App logic (cart, checkout, order submission) — no edits needed
```

## 1. Run it locally

No build tools needed. Easiest way (avoids browser file:// restrictions):

```
npx serve .
```

then open the printed http://localhost:... address. Or use the VS Code "Live Server" extension.

## 2. Add your real products

Open `js/products.js`. Each product is:

```js
{ id: "p1", category: "sparklers", name: "7cm Electric Sparklers", unit: "Box of 10", mrp: 60, price: 45, image: "placeholder.jpg" }
```

- `id` must be unique.
- `category` must match one of the `id`s in the `CATEGORIES` list at the top of the file.
- `mrp` is the strikethrough price; set it equal to `price` to hide the discount badge.
- Add or remove categories in the `CATEGORIES` array the same way.

## 3. Edit shop details

Open `js/config.js` and fill in `contactEmail` (currently a placeholder). Shop name,
WhatsApp number and address are already set.

## 4. Get order notifications (free, no backend server)

You have two independent pieces — both optional, but recommended to use both:

### A. WhatsApp (already working, zero setup)
Every completed order shows the customer a "Confirm on WhatsApp" button that opens a
pre-filled message to your number. This works immediately, no signup needed.

### B. Email alert via EmailJS (free tier: 200 emails/month)
1. Go to https://www.emailjs.com → Sign up free.
2. Add an Email Service (Gmail is easiest) → note the **Service ID**.
3. Create an Email Template with variables: `{{customer_name}}`, `{{customer_phone}}`,
   `{{customer_address}}`, `{{items}}`, `{{total}}`, `{{notes}}`, `{{to_email}}` → note the **Template ID**.
4. Account → General → copy your **Public Key**.
5. Paste all three into `js/config.js` under `emailjs`.

### C. Order records via Firebase Firestore (free Spark plan)
Keeps a permanent log of every order you can check anytime.
1. Go to https://console.firebase.google.com → Create a project (free).
2. Build → Firestore Database → Create database → Start in **test mode** (fine for a
   small shop; lock it down later with rules if you want).
3. Project settings (gear icon) → General → "Your apps" → Web app (</>) → register it →
   copy the `firebaseConfig` object.
4. Paste those values into `js/config.js` under `firebase`.
5. To view orders: Firebase Console → Firestore Database → `orders` collection.

If you skip A/B/C setup, the site still works fully — cart, checkout and the WhatsApp
confirmation button all function without any keys.

## 5. Deploy for free

Recommended: **Firebase Hosting** (same account as Firestore, free, unlimited-ish
bandwidth on Spark plan, free SSL + custom domain).

```
npm install -g firebase-tools
firebase login
firebase init hosting     # choose your project, public directory = "." , single-page app = No
firebase deploy
```

Alternative (also free, zero config, connect via their website — no CLI needed):
- **Netlify**: drag-and-drop this folder at https://app.netlify.com/drop, or connect your GitHub repo for auto-deploy on every push.
- **GitHub Pages**: repo → Settings → Pages → Deploy from branch → `main` / root.
- **Vercel**: `npx vercel` and follow the prompts.

## Notes

- Crackers sale is regulated (timing, decibel limits, licensing) — check your local
  municipal/PESO rules and add any required disclaimers to the footer.
- Minimum order enforcement is in `js/config.js` (`minOrderAmount`).
