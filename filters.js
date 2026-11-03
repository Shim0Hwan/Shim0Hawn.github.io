"use strict";

const filters = document.querySelector(".filters");
const cards = [...document.querySelectorAll(".project-card")];
const status = document.querySelector("#filter-status");

filters.hidden = false;
filters.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-filter]");
  if (!button) return;
  const category = button.dataset.filter;
  for (const card of cards) {
    card.hidden = category !== "all" && card.dataset.category !== category;
  }
  for (const item of filters.querySelectorAll("button")) {
    item.setAttribute("aria-pressed", String(item === button));
  }
  status.textContent = `${button.textContent} · 포맷 ${cards.filter((card) => !card.hidden).length}개 · 등록 작업물 0개`;
});
