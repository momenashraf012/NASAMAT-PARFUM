/* نَسَمَات — Landing Page interactions */
(function () {
  "use strict";

  /* ---- Products (shared bottle, scent-coded tint) ---- */
  var PRODUCTS = [
    { ar: "عود رويال", fam: "Eau de Parfum", notes: "عود · زعفران · عنبر", price: "١٢٥٠", tag: "الأكثر مبيعًا", tint: "#B68A35", op: .34 },
    { ar: "ورد دمشقي", fam: "Eau de Parfum", notes: "ورد دمشقي · مسك · عسل", price: "١١٠٠", tag: "", tint: "#B5687A", op: .4 },
    { ar: "مسك نوار", fam: "Eau de Parfum", notes: "مسك أبيض · فانيليا · أرز", price: "٩٨٠", tag: "جديد", tint: "#9A8A6E", op: .34 },
    { ar: "عنبر وعود", fam: "Extrait de Parfum", notes: "عنبر · عود · أرز", price: "١٣٥٠", tag: "", tint: "#A6642B", op: .4 },
    { ar: "ليل", fam: "Eau de Parfum", notes: "بخور · جلد · باتشولي", price: "١٢٠٠", tag: "", tint: "#3A3550", op: .46 },
    { ar: "نسمة", fam: "Eau de Toilette", notes: "نيرولي · حمضيات · مسك", price: "٨٩٠", tag: "", tint: "#C9A94E", op: .34 }
  ];

  var host = document.getElementById("products");
  if (host) {
    PRODUCTS.forEach(function (p, i) {
      var card = document.createElement("article");
      card.className = "product reveal";
      card.setAttribute("data-d", String((i % 3) + 1));
      card.innerHTML =
        '<div class="ph">' +
          (p.tag ? '<span class="tag">' + p.tag + "</span>" : "") +
          '<img src="assets/bottle-shot.png" alt="عطر ' + p.ar + '" />' +
          '<span class="ph-tint"></span>' +
        "</div>" +
        '<div class="body">' +
          '<div class="nm">' + p.ar + "</div>" +
          '<div class="fam">' + p.fam + "</div>" +
          '<div class="nt">' + p.notes + "</div>" +
          '<div class="foot">' +
            '<div class="price">' + p.price + ' <span class="ml">جنيه · ٥٠ml</span></div>' +
            '<span class="add">أضف <span>←</span></span>' +
          "</div>" +
        "</div>";
      var tint = card.querySelector(".ph-tint");
      tint.style.cssText =
        "position:absolute;inset:0;z-index:1;mix-blend-mode:color;pointer-events:none;" +
        "background:" + p.tint + ";opacity:" + p.op + ";";
      host.appendChild(card);
    });
  }

  /* ---- Header shadow on scroll ---- */
  var header = document.getElementById("header");
  function onScroll() {
    if (window.scrollY > 8) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Scroll reveal (with guaranteed fallback) ---- */
  var reveals = document.querySelectorAll(".reveal");
  function revealAll() {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }
  if ("IntersectionObserver" in window) {
    var seen = 0;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); seen++; }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
    // Safety net: if IO never fires (some embedded/preview environments),
    // reveal everything so content is never stuck hidden.
    setTimeout(function () {
      if (seen === 0) revealAll();
    }, 700);
  } else {
    revealAll();
  }

  /* ---- Newsletter ---- */
  var form = document.getElementById("newsForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = document.getElementById("newsOk");
      var email = document.getElementById("newsEmail");
      ok.textContent = "شكرًا لك — وصلتنا بياناتك. ترقّب نَسمتنا القادمة.";
      email.value = "";
    });
  }

  /* ---- Mobile menu ---- */
  var toggle = document.getElementById("menuToggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var nav = document.querySelector(".nav");
      var open = nav.style.display === "flex";
      if (open) {
        nav.style.cssText = "";
      } else {
        nav.style.cssText =
          "display:flex;position:absolute;top:78px;inset-inline:0;flex-direction:column;" +
          "background:var(--ivory);padding:20px 32px;gap:18px;border-bottom:1px solid var(--border);" +
          "box-shadow:var(--shadow-md);z-index:60;";
      }
    });
    document.querySelectorAll(".nav a").forEach(function (a) {
      a.addEventListener("click", function () {
        if (window.innerWidth <= 760) document.querySelector(".nav").style.cssText = "";
      });
    });
  }
})();
