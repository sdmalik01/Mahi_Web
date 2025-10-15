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
// MindEase - Resources Management

let allResources = [];
let currentResourceFilter = 'all';

// Load resources when page loads
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('resourcesGrid')) {
        loadResources();
    }
});

// Load resources from database
function loadResources() {
    showLoading(document.getElementById('resourcesGrid'));
    
    fetch('php/get-data.php?type=resources')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                allResources = data.data;
                displayResources();
            } else {
                document.getElementById('resourcesGrid').innerHTML = 
                    '<p class="empty-message">Failed to load resources</p>';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('resourcesGrid').innerHTML = 
                '<p class="empty-message">Error loading resources</p>';
        });
}

// Display resources
function displayResources() {
    const grid = document.getElementById('resourcesGrid');
    
    // Filter resources
    let filtered = currentResourceFilter === 'all' 
        ? allResources 
        : allResources.filter(resource => resource.type === currentResourceFilter);
    
    if (filtered.length === 0) {
        grid.innerHTML = '<p class="empty-message">No resources found</p>';
        return;
    }
    
    grid.innerHTML = '';
    
    filtered.forEach(resource => {
        const card = document.createElement('div');
        card.className = 'resource-card';
        
        const typeIcon = resource.type === 'article' ? '📄' : '🎥';
        const typeText = resource.type === 'article' ? 'Article' : 'Video';
        
        card.innerHTML = `
            <span class="resource-type">${typeIcon} ${typeText}</span>
            <h3>${resource.title}</h3>
            <p>${resource.description}</p>
            <a href="${resource.url}" target="_blank" rel="noopener noreferrer" class="resource-link">
                View Resource →
            </a>
        `;
        
        grid.appendChild(card);
    });
}

// Filter resources
function filterResources(type) {
    currentResourceFilter = type;
    
    // Update active filter tab
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
    
    displayResources();
}