// Initialize EmailJS
(function() {
    emailjs.init("23VwoRROzKthy5ZYU"); // Replace with your EmailJS public key
})();

// Form validation and submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form elements
    const form = this;
    const nameInput = form.querySelector('#name');
    const emailInput = form.querySelector('#email');
    const messageInput = form.querySelector('#message');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Reset previous errors
    form.querySelectorAll('.form-group').forEach(group => group.classList.remove('error'));
    
    // Validate inputs
    let isValid = true;
    
    if (!nameInput.value.trim()) {
        showError(nameInput, 'Le nom est requis');
        isValid = false;
    }
    
    if (!emailInput.value.trim()) {
        showError(emailInput, 'L\'email est requis');
        isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
        showError(emailInput, 'Email invalide');
        isValid = false;
    }
    
    if (!messageInput.value.trim()) {
        showError(messageInput, 'Le message est requis');
        isValid = false;
    }
    
    if (!isValid) return;
    
    // Show loading state
    submitBtn.classList.add('loading');
    
    // Prepare email parameters
    const templateParams = {
        from_name: nameInput.value,
        from_email: emailInput.value,
        message: messageInput.value
    };
    
    // Send email using EmailJS
    emailjs.send('service_kkvy4xn', 'template_o0jv4bz', templateParams)
        .then(function() {
            // Show success message
            showSuccessMessage();
            
            // Reset form
            form.reset();
            
            // Reset button state
            submitBtn.classList.remove('loading');
        })
        .catch(function(error) {
            console.error('Failed to send email:', error);
            showError(messageInput, 'Échec de l\'envoi. Veuillez réessayer.');
            submitBtn.classList.remove('loading');
        });
});

// Helper functions
function showError(input, message) {
    const formGroup = input.closest('.form-group');
    formGroup.classList.add('error');
    formGroup.querySelector('.form-error').textContent = message;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showSuccessMessage() {
    // Create success message element if it doesn't exist
    let successMessage = document.querySelector('.success-message');
    if (!successMessage) {
        successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        document.body.appendChild(successMessage);
    }
    
    // Set message and show
    successMessage.textContent = 'Message envoyé avec succès!';
    successMessage.classList.add('show');
    
    // Hide after 3 seconds
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 3000);
}
