// MindEase - Admin Dashboard

// Handle login
function handleLogin(event) {
    event.preventDefault();
    
    const form = document.getElementById('loginForm');
    const formData = new FormData(form);
    const messageDiv = document.getElementById('loginMessage');
    
    fetch('php/login.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            messageDiv.textContent = 'Login successful! Redirecting...';
            messageDiv.className = 'message success';
            messageDiv.style.display = 'block';
            
            setTimeout(() => {
                window.location.href = 'admin-dashboard.html';
            }, 1000);
        } else {
            messageDiv.textContent = data.message || 'Invalid credentials';
            messageDiv.className = 'message error';
            messageDiv.style.display = 'block';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        messageDiv.textContent = 'Login error. Please try again.';
        messageDiv.className = 'message error';
        messageDiv.style.display = 'block';
    });
}

// Check if admin is logged in
function checkAdminAuth() {
    fetch('php/login.php?check=1')
        .then(response => response.json())
        .then(data => {
            if (!data.logged_in) {
                window.location.href = 'admin-login.html';
            }
        })
        .catch(error => {
            console.error('Auth check error:', error);
            window.location.href = 'admin-login.html';
        });
}

// Show section
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.admin-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById('section-' + sectionName).classList.add('active');
    
    // Update menu active state
    document.querySelectorAll('.admin-menu a').forEach(link => {
        link.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Load data for the section
    if (sectionName === 'affirmations') {
        loadAffirmationsTable();
    } else if (sectionName === 'resources') {
        loadResourcesTable();
    } else if (sectionName === 'feedback') {
        loadFeedbackTable();
    }
}

// Load dashboard data
function loadDashboardData() {
    // Load stats
    fetch('php/get-data.php?type=stats')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById('totalAffirmations').textContent = data.data.affirmations || 0;
                document.getElementById('totalResources').textContent = data.data.resources || 0;
                document.getElementById('totalFeedback').textContent = data.data.feedback || 0;
                document.getElementById('totalFavorites').textContent = data.data.favorites || 0;
            }
        })
        .catch(error => console.error('Error loading stats:', error));
}

// Add new affirmation
function addNewAffirmation(event) {
    event.preventDefault();
    
    const form = document.getElementById('addAffirmationForm');
    const formData = new FormData(form);
    
    fetch('php/add-affirmation.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showToast('Affirmation added successfully!', 'success');
            form.reset();
            loadAffirmationsTable();
            loadDashboardData();
        } else {
            showToast(data.message || 'Failed to add affirmation', 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showToast('Error adding affirmation', 'error');
    });
}

// Load affirmations table
function loadAffirmationsTable() {
    const tbody = document.getElementById('affirmationsTableBody');
    tbody.innerHTML = '<tr><td colspan="5" class="text-center">Loading...</td></tr>';
    
    fetch('php/get-data.php?type=affirmations')
        .then(response => response.json())
        .then(data => {
            if (data.success && data.data.length > 0) {
                tbody.innerHTML = '';
                data.data.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${item.id}</td>
                        <td>${truncateText(item.affirmation_text, 80)}</td>
                        <td><span class="category-tag">${item.category}</span></td>
                        <td>${formatDate(item.created_at)}</td>
                        <td>
                            <div class="action-buttons">
                                <button class="btn-action btn-delete" onclick="deleteAffirmation(${item.id})">Delete</button>
                            </div>
                        </td>
                    `;
                    tbody.appendChild(row);
                });
            } else {
                tbody.innerHTML = '<tr><td colspan="5" class="text-center">No affirmations found</td></tr>';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            tbody.innerHTML = '<tr><td colspan="5" class="text-center">Error loading affirmations</td></tr>';
        });
}

// Delete affirmation
function deleteAffirmation(id) {
    if (!confirm('Are you sure you want to delete this affirmation?')) {
        return;
    }
    
    fetch(`php/delete-affirmation.php?id=${id}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showToast('Affirmation deleted successfully', 'success');
                loadAffirmationsTable();
                loadDashboardData();
            } else {
                showToast(data.message || 'Failed to delete affirmation', 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showToast('Error deleting affirmation', 'error');
        });
}

// Add new resource
function addNewResource(event) {
    event.preventDefault();
    
    const form = document.getElementById('addResourceForm');
    const formData = new FormData(form);
    
    fetch('php/add-resource.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showToast('Resource added successfully!', 'success');
            form.reset();
            loadResourcesTable();
            loadDashboardData();
        } else {
            showToast(data.message || 'Failed to add resource', 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showToast('Error adding resource', 'error');
    });
}

// Load resources table
function loadResourcesTable() {
    const tbody = document.getElementById('resourcesTableBody');
    tbody.innerHTML = '<tr><td colspan="6" class="text-center">Loading...</td></tr>';
    
    fetch('php/get-data.php?type=resources')
        .then(response => response.json())
        .then(data => {
            if (data.success && data.data.length > 0) {
                tbody.innerHTML = '';
                data.data.forEach(item => {
                    const row = document.createElement('tr');
                    const typeIcon = item.type === 'article' ? '📄' : '🎥';
                    row.innerHTML = `
                        <td>${item.id}</td>
                        <td>${truncateText(item.title, 50)}</td>
                        <td>${typeIcon} ${item.type}</td>
                        <td><a href="${item.url}" target="_blank" class="resource-link">View</a></td>
                        <td>${formatDate(item.created_at)}</td>
                        <td>
                            <div class="action-buttons">
                                <button class="btn-action btn-delete" onclick="deleteResource(${item.id})">Delete</button>
                            </div>
                        </td>
                    `;
                    tbody.appendChild(row);
                });
            } else {
                tbody.innerHTML = '<tr><td colspan="6" class="text-center">No resources found</td></tr>';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            tbody.innerHTML = '<tr><td colspan="6" class="text-center">Error loading resources</td></tr>';
        });
}

// Delete resource
function deleteResource(id) {
    if (!confirm('Are you sure you want to delete this resource?')) {
        return;
    }
    
    fetch(`php/delete-resource.php?id=${id}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showToast('Resource deleted successfully', 'success');
                loadResourcesTable();
                loadDashboardData();
            } else {
                showToast(data.message || 'Failed to delete resource', 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showToast('Error deleting resource', 'error');
        });
}

// Load feedback table
function loadFeedbackTable() {
    const tbody = document.getElementById('feedbackTableBody');
    tbody.innerHTML = '<tr><td colspan="7" class="text-center">Loading...</td></tr>';
    
    fetch('php/get-data.php?type=feedback')
        .then(response => response.json())
        .then(data => {
            if (data.success && data.data.length > 0) {
                tbody.innerHTML = '';
                data.data.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${item.id}</td>
                        <td>${item.name}</td>
                        <td>${item.email}</td>
                        <td>${truncateText(item.message, 50)}</td>
                        <td><span class="status-badge ${item.status}">${item.status}</span></td>
                        <td>${formatDate(item.submitted_at)}</td>
                        <td>
                            <div class="action-buttons">
                                <button class="btn-action btn-view" onclick="viewFeedback(${item.id}, '${escapeHtml(item.name)}', '${escapeHtml(item.email)}', '${escapeHtml(item.message)}', '${item.submitted_at}')">View</button>
                            </div>
                        </td>
                    `;
                    tbody.appendChild(row);
                });
            } else {
                tbody.innerHTML = '<tr><td colspan="7" class="text-center">No feedback found</td></tr>';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            tbody.innerHTML = '<tr><td colspan="7" class="text-center">Error loading feedback</td></tr>';
        });
}

// View feedback details
function viewFeedback(id, name, email, message, date) {
    const details = `
        ID: ${id}
        Name: ${name}
        Email: ${email}
        Date: ${formatDate(date)}
        
        Message:
        ${message}
    `;
    
    alert(details);
}

// Escape HTML for safe display
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