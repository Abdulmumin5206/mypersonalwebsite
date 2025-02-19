document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showFormStatus('error', 'Please fill in all fields');
                return;
            }
            
            // Email validation
            if (!isValidEmail(email)) {
                showFormStatus('error', 'Please enter a valid email address');
                return;
            }
            
            // Simulate form submission
            simulateFormSubmission(name, email, subject, message);
        });
    }
    
    // Show form status message
    function showFormStatus(type, message) {
        formStatus.textContent = message;
        formStatus.className = type;
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            formStatus.className = 'hidden';
        }, 5000);
    }
    
    // Validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Simulate form submission
    function simulateFormSubmission(name, email, subject, message) {
        // Show loading state
        const submitButton = contactForm.querySelector('.submit-btn');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate network request
        setTimeout(() => {
            // For demo purposes - in a real app, you would send data to server
            console.log('Form Submission Data:', { name, email, subject, message });
            
            // Reset form
            contactForm.reset();
            
            // Show success message
            showFormStatus('success', 'Thank you! Your message has been sent successfully.');
            
            // Reset button
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }, 1500);
    }
});