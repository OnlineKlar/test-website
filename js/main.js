async function loadContent() {
  try {
    const res = await fetch("/content.json");
    const c = await res.json();
    document.title = c.site.title;
    document.querySelector(".nav__logo").textContent = c.site.title;
    document.querySelector(".hero__title").textContent = c.hero.title;
    document.querySelector(".hero__subtitle").textContent = c.hero.subtitle;
    document.querySelector(".btn--primary").textContent = c.hero.cta;
    document.querySelector(".section-title").textContent = c.leistungen.title;
    const grid = document.getElementById("leistungen-grid");
    grid.innerHTML = c.leistungen.items.map(item =>
      `<div class="card reveal"><div class="card__icon">${item.icon}</div><h3 class="card__title">${item.title}</h3><p class="card__text">${item.text}</p></div>`
    ).join("");
    document.getElementById("kontakt-text").textContent = c.kontakt.text;
    const emailEl = document.getElementById("kontakt-email");
    emailEl.textContent = c.kontakt.email;
    emailEl.href = "mailto:" + c.kontakt.email;
    document.getElementById("footer-title").textContent = c.site.title;
    initObserver();
  } catch(e) { console.error("Content konnte nicht geladen werden", e); }
}

const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 50);
}, { passive: true });

function initObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("visible"), i * 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
}

document.getElementById("year").textContent = new Date().getFullYear();
loadContent();