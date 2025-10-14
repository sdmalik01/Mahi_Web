// meditation.js
document.addEventListener("DOMContentLoaded", () => {
  const circle = document.getElementById("breath-circle");
  const startBtn = document.getElementById("start-breath");
  const stopBtn = document.getElementById("stop-breath");
  let interval;

  function startBreathing() {
    if (!circle) return;
    circle.classList.add("breathe");
    interval = setInterval(() => {
      circle.classList.toggle("breathe");
    }, 8000); // 4s inhale + 4s exhale
  }

  function stopBreathing() {
    if (!circle) return;
    circle.classList.remove("breathe");
    clearInterval(interval);
  }

  startBtn?.addEventListener("click", startBreathing);
  stopBtn?.addEventListener("click", stopBreathing);
});
