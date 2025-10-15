// MindEase - Affirmations Management

let allAffirmations = [];
let favorites = [];
let currentFilter = 'all';

// Load data when page loads
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('affirmationsGrid')) {
        loadFavorites();
        loadAffirmations();
        displayDailyAffirmation();
    }
});

// Load affirmations from database
function loadAffirmations() {
    showLoading(document.getElementById('affirmationsGrid'));
    
    fetch('php/get-data.php?type=affirmations')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                allAffirmations = data.data;
                displayAffirmations();
            } else {
                document.getElementById('affirmationsGrid').innerHTML = 
                    '<p class="empty-message">Failed to load affirmations</p>';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('affirmationsGrid').innerHTML = 
                '<p class="empty-message">Error loading affirmations</p>';
        });
}

// Display affirmations
function displayAffirmations() {
    const grid = document.getElementById('affirmationsGrid');
    
    // Filter affirmations
    let filtered = currentFilter === 'all' 
        ? allAffirmations 
        : allAffirmations.filter(aff => aff.category === currentFilter);
    
    if (filtered.length === 0) {
        grid.innerHTML = '<p class="empty-message">No affirmations found in this category</p>';
        return;
    }
    
    grid.innerHTML = '';
    
    filtered.forEach(affirmation => {
        const isFavorite = favorites.some(fav => fav.id === affirmation.id);
        
        const card = document.createElement('div');
        card.className = 'affirmation-item';
        card.innerHTML = `
            <button class="favorite-btn ${isFavorite ? 'favorited' : ''}" 
                    onclick="toggleFavorite(${affirmation.id}, '${escapeHtml(affirmation.affirmation_text)}', this)">
                ${isFavorite ? '⭐' : '☆'}
            </button>
            <p class="affirmation-text">${affirmation.affirmation_text}</p>
            <span class="category-tag">${affirmation.category}</span>
        `;
        
        grid.appendChild(card);
    });
}

// Display daily affirmation
function displayDailyAffirmation() {
    if (allAffirmations.length === 0) {
        // If not loaded yet, try loading
        fetch('php/get-data.php?type=affirmations')
            .then(response => response.json())
            .then(data => {
                if (data.success && data.data.length > 0) {
                    allAffirmations = data.data;
                    showRandomAffirmation();
                }
            });
    } else {
        showRandomAffirmation();
    }
}

function showRandomAffirmation() {
    const randomIndex = Math.floor(Math.random() * allAffirmations.length);
    const affirmation = allAffirmations[randomIndex];
    
    const dailyCard = document.getElementById('dailyAffirmation');
    if (dailyCard && affirmation) {
        dailyCard.querySelector('.affirmation-text').textContent = affirmation.affirmation_text;
    }
}

function refreshDailyAffirmation() {
    showRandomAffirmation();
    animateElement(document.getElementById('dailyAffirmation'), 'fade-in');
}

// Filter affirmations
function filterAffirmations(category) {
    currentFilter = category;
    
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    displayAffirmations();
}

// Add new affirmation
function addAffirmation() {
    const textarea = document.getElementById('newAffirmationText');
    const text = textarea.value.trim();
    
    if (!text) {
        showToast('Please write an affirmation', 'warning');
        return;
    }
    
    const formData = new FormData();
    formData.append('affirmation_text', text);
    formData.append('category', 'general');
    
    fetch('php/add-affirmation.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showToast('Affirmation added successfully!', 'success');
            textarea.value = '';
            loadAffirmations(); // Reload affirmations
        } else {
            showToast(data.message || 'Failed to add affirmation', 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showToast('Error adding affirmation', 'error');
    });
}

// Toggle favorite
function toggleFavorite(id, text, btn) {
    const isFavorite = btn.classList.contains('favorited');
    
    if (isFavorite) {
        // Remove from favorites
        favorites = favorites.filter(fav => fav.id !== id);
        btn.classList.remove('favorited');
        btn.textContent = '☆';
        showToast('Removed from favorites', 'success');
    } else {
        // Add to favorites
        favorites.push({ id: id, text: text });
        btn.classList.add('favorited');
        btn.textContent = '⭐';
        showToast('Added to favorites', 'success');
    }
    
    saveFavorites();
    displayFavorites();
}

// Save favorites to localStorage
function saveFavorites() {
    localStorage.setItem('mindease_favorites', JSON.stringify(favorites));
}

// Load favorites from localStorage
function loadFavorites() {
    const saved = localStorage.getItem('mindease_favorites');
    if (saved) {
        favorites = JSON.parse(saved);
        displayFavorites();
    }
}

// Display favorites
function displayFavorites() {
    const grid = document.getElementById('favoritesGrid');
    
    if (favorites.length === 0) {
        grid.innerHTML = '<p class="empty-message">No favorites yet. Click the star icon to save affirmations!</p>';
        return;
    }
    
    grid.innerHTML = '';
    
    favorites.forEach(fav => {
        const card = document.createElement('div');
        card.className = 'affirmation-item';
        card.innerHTML = `
            <button class="favorite-btn favorited" onclick="removeFavorite(${fav.id})">⭐</button>
            <p class="affirmation-text">${fav.text}</p>
        `;
        
        grid.appendChild(card);
    });
}

// Remove from favorites
function removeFavorite(id) {
    favorites = favorites.filter(fav => fav.id !== id);
    saveFavorites();
    displayFavorites();
    
    // Update the main grid
    displayAffirmations();
    
    showToast('Removed from favorites', 'success');
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}