const body = document.body;
const navToggle = document.querySelector(".nav-toggle");
const menuLinks = document.querySelectorAll("[data-section-link]");
const sections = document.querySelectorAll("[data-section]");

navToggle.addEventListener("click", () => {
  const open = body.classList.toggle("menu-open");
  navToggle.setAttribute("aria-expanded", String(open));
});

menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    body.classList.remove("menu-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    menuLinks.forEach((link) => {
      link.parentElement.classList.toggle("active", link.dataset.sectionLink === entry.target.dataset.section);
    });
  });
}, { rootMargin: "-30% 0px -60%", threshold: 0 });

sections.forEach((section) => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver((entries) => {
  const visibleEntries = entries
    .filter((entry) => entry.isIntersecting)
    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

  visibleEntries.forEach((entry, index) => {
    entry.target.style.setProperty("--reveal-delay", `${index * 130}ms`);
    entry.target.classList.add("visible");
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.08 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const tabButtons = document.querySelectorAll("[data-publication-tab]");
const tabPanels = document.querySelectorAll("[data-publication-panel]");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.dataset.publicationTab;
    tabButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-selected", String(active));
    });
    tabPanels.forEach((panel) => {
      const active = panel.dataset.publicationPanel === selected;
      panel.classList.toggle("active", active);
      panel.hidden = !active;
    });
  });
});

const wechatTrigger = document.querySelector(".wechat-trigger");
const wechatDialog = document.querySelector(".wechat-dialog");
const wechatClose = document.querySelector(".wechat-close");

wechatTrigger.addEventListener("click", () => wechatDialog.showModal());
wechatClose.addEventListener("click", () => wechatDialog.close());
wechatDialog.addEventListener("click", (event) => {
  if (event.target === wechatDialog) wechatDialog.close();
});
