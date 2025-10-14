// resources.js
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("resources-list");

  const resources = [
    {
      title: "Managing Anxiety in Daily Life",
      link: "https://www.mind.org.uk/information-support/types-of-mental-health-problems/anxiety/",
      desc: "Simple techniques to manage daily anxiety."
    },
    {
      title: "5-Minute Meditation for Beginners",
      link: "https://www.youtube.com/watch?v=inpok4MKVLM",
      desc: "Guided video to help you start meditation."
    },
    {
      title: "Government Mental Health Helplines (India)",
      link: "https://www.nhp.gov.in/helpline-services",
      desc: "Verified list of national and regional helplines."
    }
  ];

  container.innerHTML = resources.map(r => `
    <article class="resource">
      <h3><a href="${r.link}" target="_blank">${r.title}</a></h3>
      <p>${r.desc}</p>
    </article>
  `).join("");
});
