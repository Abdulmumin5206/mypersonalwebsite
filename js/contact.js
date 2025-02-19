document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    if (!form) return; // Only run on the contact page
    
    // Create popup elements
    const popupOverlay = document.createElement("div");
    popupOverlay.className = "popup-overlay";
    
    const popup = document.createElement("div");
    popup.className = "popup";
    popupOverlay.appendChild(popup);
    
    document.body.appendChild(popupOverlay);
    
    // Function to show popup with message
    function showPopup(message, isSuccess = false) {
        popup.innerHTML = `
            <div class="${isSuccess ? 'success-icon' : 'loading-icon'}">
                ${isSuccess ? '✓' : '<div class="spinner"></div>'}
            </div>
            <p>${message}</p>
            ${isSuccess ? '<button class="close-popup">Close</button>' : ''}
        `;
        
        popupOverlay.classList.add("active");
        
        if (isSuccess) {
            const closeButton = popup.querySelector(".close-popup");
            if (closeButton) {
                closeButton.addEventListener("click", hidePopup);
            }
        }
    }
    
    // Function to hide popup
    function hidePopup() {
        popupOverlay.classList.remove("active");
    }
    
    // Prevent double form submission
    let isSubmitting = false;
    
    // Add event listener for form submission
    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        
        // Check if already submitting
        if (isSubmitting) return;
        isSubmitting = true;
        
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();
        
        if (name === "" || email === "" || message === "") {
            alert("Please fill in all fields.");
            isSubmitting = false;
            return;
        }
        
        // Show "Sending..." popup
        showPopup("Sending your message...");
        
        try {
            // Send data to backend on Render
            const response = await fetch("https://mypersonalwebsite-qp06.onrender.com/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message }),
            });
            
            const result = await response.json();
            
            // Hide loading popup
            hidePopup();
            
            if (response.ok) {
                // Show success popup
                showPopup("Message sent successfully!", true);
                form.reset();
            } else {
                showPopup(`Failed to send message: ${result.message || 'Please try again.'}`, false);
            }
        } catch (error) {
            hidePopup();
            showPopup("Network error. Please check your connection and try again.", false);
        } finally {
            isSubmitting = false;
        }
    });

    // Clean up function for page navigation
    function cleanupBeforeUnload() {
        // Remove popup overlay from DOM when navigating away
        if (popupOverlay && popupOverlay.parentNode) {
            popupOverlay.parentNode.removeChild(popupOverlay);
        }
    }

    // Add listener for when links are clicked to navigate away
    document.querySelectorAll('a').forEach(link => {
        // Skip links that open in new tabs/windows
        if (link.target === '_blank') return;
        
        link.addEventListener('click', function() {
            cleanupBeforeUnload();
        });
    });
    
    // Also handle browser back/forward navigation
    window.addEventListener('beforeunload', cleanupBeforeUnload);
});