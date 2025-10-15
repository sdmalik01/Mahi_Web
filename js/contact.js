// MindEase - Contact & Feedback

// Submit feedback form
function submitFeedback(event) {
    event.preventDefault();
    
    const form = document.getElementById('contactForm');
    const formData = new FormData(form);
    const messageDiv = document.getElementById('formMessage');
    
    // Validate fields
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const message = formData.get('message').trim();
    
    if (!name || !email || !message) {
        showFormMessage('Please fill in all fields', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showFormMessage('Please enter a valid email address', 'error');
        return;
    }
    
    // Submit form
    fetch('php/submit-feedback.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showFormMessage('Thank you for your feedback! We\'ll get back to you soon.', 'success');
            form.reset();
            
            // Show toast notification
            showToast('Feedback submitted successfully!', 'success');
        } else {
            showFormMessage(data.message || 'Failed to submit feedback', 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showFormMessage('Error submitting feedback. Please try again.', 'error');
    });
}

// Show form message
function showFormMessage(message, type) {
    const messageDiv = document.getElementById('formMessage');
    messageDiv.textContent = message;
    messageDiv.className = `form-message ${type}`;
    messageDiv.style.display = 'block';
    
    // Hide after 5 seconds
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}