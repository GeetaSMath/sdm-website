// ============================================================
// SHOP CONFIG — edit this file to make the site yours.
// Everything a non-developer needs to change lives here.
// ============================================================
const SHOP_CONFIG = {
  // --- Business identity ---
  shopName: "Shree Siddharameshwar Crackers",
  tagline: "Quality Crackers, Festival Joy Delivered",
  whatsappNumber: "919036994562",        // format: country code + number, no + or spaces
  contactPhone: "+91 90369 94562",       // display number
  contactEmail: "shreebiradar64@gmail.com",
  address: "Sindagi, Karnataka",
  instagramUrl: "",                      // optional
  facebookUrl: "",                       // optional

  // --- Ordering rules ---
  minOrderAmount: 2000,                  // minimum cart value to allow checkout

  // --- EmailJS (free, no backend needed) ---
  // Sign up at https://www.emailjs.com, create a service + template,
  // then paste the 3 IDs below. See README.md "Order Notifications" section.
  emailjs: {
    serviceId: "",
    templateId: "",
    publicKey: "",
  },

  // --- Firebase (free Firestore, stores every order for your records) ---
  // Create a project at https://console.firebase.google.com, enable Firestore,
  // then paste the config object it gives you. See README.md "Database Setup".
  firebase: {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
  },
};
