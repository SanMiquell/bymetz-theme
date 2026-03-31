// assets/bymetz-menu-fix.js
document.addEventListener("DOMContentLoaded", () => {
  // Alleen desktop muis (geen touch)
  const isDesktopHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!isDesktopHover) return;

  const header = document.querySelector("header");
  if (!header) return;

  // Veel Shopify themes (incl. framework themes) gebruiken <details> voor dropdowns
  const dropdowns = header.querySelectorAll("details");
  if (!dropdowns.length) return;

  dropdowns.forEach((details) => {
    const summary = details.querySelector("summary");
    if (!summary) return;

    let closeTimer = null;

    const openNow = () => {
      if (closeTimer) clearTimeout(closeTimer);
      details.open = true;
      details.setAttribute("data-hover-open", "true");
    };

    const closeLater = (delay = 220) => {
      if (closeTimer) clearTimeout(closeTimer);
      closeTimer = setTimeout(() => {
        // Sluit niet als er focus in het menu zit (toetsenbord)
        if (details.contains(document.activeElement)) return;
        details.open = false;
        details.removeAttribute("data-hover-open");
      }, delay);
    };

    // Hover op hele details houdt open (niet alleen summary)
    details.addEventListener("mouseenter", openNow);
    details.addEventListener("mouseleave", () => closeLater(260));

    // Extra: als je richting dropdown beweegt en per ongeluk de summary “verlaat”
    summary.addEventListener("mouseenter", openNow);
    summary.addEventListener("mouseleave", () => closeLater(260));

    // Toetsenbordvriendelijk
    details.addEventListener("focusin", openNow);
    details.addEventListener("focusout", () => closeLater(320));
  });
});