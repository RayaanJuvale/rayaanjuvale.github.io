/* Scroll-reactive touches for rayaanjuvale.github.io */
(function () {
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* --- scroll progress bar --- */
  var bar = document.createElement("div");
  bar.className = "scroll-progress";
  document.body.appendChild(bar);

  /* --- nav shadow on scroll --- */
  var nav = document.querySelector(".nav");

  function onScroll() {
    var doc = document.documentElement;
    var max = doc.scrollHeight - doc.clientHeight;
    bar.style.width = (max > 0 ? (doc.scrollTop / max) * 100 : 0) + "%";
    if (nav) nav.classList.toggle("nav-scrolled", doc.scrollTop > 10);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (reduceMotion) return; /* skip animations below */

  /* --- reveal on scroll --- */
  var targets = document.querySelectorAll(
    "section h2, .card, .project-card, .skill-card, .contact-item");
  targets.forEach(function (el, i) {
    el.classList.add("reveal");
    /* small stagger within grids so cards cascade */
    el.style.transitionDelay = (i % 3) * 80 + "ms";
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  targets.forEach(function (el) { observer.observe(el); });

  /* --- active nav link tracking (index page sections) --- */
  var sections = document.querySelectorAll("section[id]");
  if (sections.length) {
    var links = document.querySelectorAll('.nav-links a[href*="#"]');
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle(
            "active",
            a.getAttribute("href").indexOf("#" + entry.target.id) !== -1);
        });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }
})();
