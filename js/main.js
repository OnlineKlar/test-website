async function loadContent() {
  try {
    const res = await fetch("/content.json");
    const c = await res.json();

    document.title = c.site.title;
    document.querySelector("meta[name=description]").setAttribute("content", c.site.description);
    document.getElementById("nav-logo").textContent = c.site.title;
    document.getElementById("hero-title").textContent = c.hero.title;
    document.getElementById("hero-subtitle").textContent = c.hero.subtitle;
    document.getElementById("hero-cta").textContent = c.hero.cta;
    document.getElementById("leistungen-title").textContent = c.leistungen.title;
    document.getElementById("kontakt-title").textContent = c.kontakt.title;
    document.getElementById("kontakt-text").textContent = c.kontakt.text;
    const emailEl = document.getElementById("kontakt-email");
    emailEl.textContent = c.kontakt.email;
    emailEl.href = "mailto:" + c.kontakt.email;
    document.getElementById("footer-title").textContent = c.site.title;

    const grid = document.getElementById("leistungen-grid");
    grid.innerHTML = c.leistungen.items.map(item =>
      "<div class=\"card reveal\"><div class=\"card__icon\">" + item.icon + "</div><h3 class=\"card__title\">" + item.title + "</h3><p class=\"card__text\">" + item.text + "</p></div>"
    ).join("");

    initObserver();
  } catch(e) {
    console.error("Content laden fehlgeschlagen:", e);
  }
}

const header = document.getElementById("header");
window.addEventListener("scroll", function() {
  header.classList.toggle("scrolled", window.scrollY > 50);
}, { passive: true });

function initObserver() {
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry, i) {
      if (entry.isIntersecting) {
        setTimeout(function() { entry.target.classList.add("visible"); }, i * 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll(".reveal").forEach(function(el) { observer.observe(el); });
}

document.getElementById("year").textContent = new Date().getFullYear();
loadContent();