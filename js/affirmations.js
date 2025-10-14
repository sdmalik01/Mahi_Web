// affirmations.js
document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("affirmation-list");
  const template = document.getElementById("affirmation-template");
  const searchInput = document.getElementById("affirmation-search");

  const affirmations = [
    "I am calm, capable, and in control.",
    "I deserve peace and happiness.",
    "I can handle whatever comes my way.",
    "I release stress with every exhale.",
    "I am becoming more mindful every day."
  ];

  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

  function render(items) {
    list.innerHTML = "";
    items.forEach(text => {
      const clone = template.content.cloneNode(true);
      const p = clone.querySelector(".text");
      p.textContent = text;

      const favBtn = clone.querySelector(".favorite-btn");
      favBtn.textContent = favorites.includes(text) ? "💖" : "🤍";

      favBtn.addEventListener("click", () => toggleFavorite(text, favBtn));

      list.appendChild(clone);
    });
  }

  function toggleFavorite(text, btn) {
    const index = favorites.indexOf(text);
    if (index > -1) favorites.splice(index, 1);
    else favorites.push(text);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    btn.textContent = favorites.includes(text) ? "💖" : "🤍";
  }

  searchInput?.addEventListener("input", e => {
    const term = e.target.value.toLowerCase();
    const filtered = affirmations.filter(a => a.toLowerCase().includes(term));
    render(filtered);
  });

  render(affirmations);
});
