// collapse.js - Material Tailwind HTML Component
// Version: latest (offline copy)
// Handles collapse and expand behavior for elements with data attributes

(function () {
  "use strict";

  const getCollapseElements = () =>
    document.querySelectorAll("[data-collapse-target]");

  function toggleCollapse(element) {
    const targetId = element.getAttribute("data-collapse-target");
    const target = document.getElementById(targetId);

    if (!target) return;

    const isOpen = target.classList.contains("open");

    if (isOpen) {
      target.classList.remove("open");
      target.style.height = target.scrollHeight + "px";
      requestAnimationFrame(() => {
        target.style.height = "0px";
      });
      setTimeout(() => {
        target.style.display = "none";
      }, 300);
    } else {
      target.style.display = "block";
      const height = target.scrollHeight + "px";
      target.style.height = "0px";
      requestAnimationFrame(() => {
        target.classList.add("open");
        target.style.height = height;
      });
      setTimeout(() => {
        target.style.height = "auto";
      }, 300);
    }
  }

  function handleClick(event) {
    const element = event.target.closest("[data-collapse-target]");
    if (!element) return;
    event.preventDefault();
    toggleCollapse(element);
  }

  document.addEventListener("click", handleClick);

  // Initialize open items on load
  window.addEventListener("DOMContentLoaded", () => {
    const collapses = getCollapseElements();
    collapses.forEach((element) => {
      const targetId = element.getAttribute("data-collapse-target");
      const target = document.getElementById(targetId);
      if (target && target.classList.contains("open")) {
        target.style.display = "block";
        target.style.height = "auto";
      } else if (target) {
        target.style.display = "none";
        target.style.height = "0px";
      }
    });
  });
})();
