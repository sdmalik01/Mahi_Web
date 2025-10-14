// contact.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");

  if (!form) return;

  form.addEventListener("submit", async e => {
    e.preventDefault();
    const data = new FormData(form);
    const status = document.createElement("p");
    status.classList.add("muted");

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: data
      });

      if (res.ok) {
        status.textContent = "✅ Message sent successfully!";
        form.reset();
      } else {
        status.textContent = "⚠️ Error sending message.";
      }
    } catch {
      status.textContent = "⚠️ Connection error. Try again later.";
    }

    form.appendChild(status);
  });
});
