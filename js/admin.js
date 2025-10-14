// admin.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("admin-login");
  const statsBox = document.getElementById("stats");
  const feedbackList = document.getElementById("feedback-list");

  // Admin login
  if (form) {
    form.addEventListener("submit", async e => {
      e.preventDefault();
      const data = new FormData(form);

      const res = await fetch("php/login.php", { method: "POST", body: data });
      const text = await res.text();

      if (text.includes("success")) {
        window.location.href = "admin-dashboard.html";
      } else {
        alert("Invalid username or password");
      }
    });
  }

  // Dashboard stats
  if (statsBox) {
    fetch("php/get-data.php")
      .then(r => r.json())
      .then(data => {
        statsBox.innerHTML = `
          <p>Affirmations: ${data.affirmations}</p>
          <p>Resources: ${data.resources}</p>
          <p>Feedback messages: ${data.feedback}</p>
        `;
      })
      .catch(() => {
        statsBox.textContent = "Error loading stats.";
      });
  }

  // Feedback list
  if (feedbackList) {
    fetch("php/get-data.php?type=feedback")
      .then(r => r.json())
      .then(data => {
        feedbackList.innerHTML = data.map(f => `
          <article class="feedback">
            <h4>${f.name} <small>${f.email}</small></h4>
            <p>${f.message}</p>
          </article>
        `).join("");
      })
      .catch(() => {
        feedbackList.textContent = "Unable to load feedback.";
      });
  }
});
