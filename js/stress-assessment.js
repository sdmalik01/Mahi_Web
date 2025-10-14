// stress-assessment.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("stress-quiz");
  const resultBox = document.getElementById("quiz-result");
  const resetBtn = document.getElementById("quiz-reset");

  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();
    let score = 0;

    // Sum all select values
    new FormData(form).forEach(value => {
      score += parseInt(value);
    });

    let message = "";
    if (score <= 3) message = "✅ Low stress level. Keep up healthy habits!";
    else if (score <= 6) message = "⚠️ Moderate stress. Take short breaks and breathe.";
    else message = "🚨 High stress level. Try meditation or reach out for support.";

    resultBox.innerHTML = `<h3>Your Result</h3><p>${message}</p>`;
    resultBox.classList.remove("hidden");
    window.scrollTo({ top: resultBox.offsetTop, behavior: "smooth" });
  });

  resetBtn?.addEventListener("click", () => {
    form.reset();
    resultBox.classList.add("hidden");
  });
});
