document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    if (!form) return;

    // Create popup elements
    const popupOverlay = document.createElement("div");
    popupOverlay.className = "popup-overlay";

    const popup = document.createElement("div");
    popup.className = "popup";
    popupOverlay.appendChild(popup);

    document.body.appendChild(popupOverlay);

    // Function to show popup with message
    function showPopup(message, isSuccess = false, isLoading = false) {
        popup.innerHTML = `
            <div class="${isSuccess ? 'success-icon' : (isLoading ? 'loading-icon' : 'error-icon')}">
                ${isSuccess ? '✓' : isLoading ? '<div class="spinner"></div>' : '❌'}
            </div>
            <p>${message}</p>
            ${!isLoading ? '<button class="close-popup">Close</button>' : ''}
        `;

        popupOverlay.classList.add("active");

        if (!isLoading) {
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

        if (isSubmitting) return;
        isSubmitting = true;

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            showPopup("Please fill in all fields.", false);
            isSubmitting = false;
            return;
        }

        // Show "Sending..." popup immediately
        showPopup("Sending your message...", false, true);

        try {
            const response = await fetch("https://mypersonalwebsite-qp06.onrender.com/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message }),
            });

            const result = await response.json();
            
            // Hide loading popup immediately once the server responds
            hidePopup();

            if (response.ok) {
                // Show success message immediately
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

    // Click outside popup to close
    popupOverlay.addEventListener("click", function(event) {
        if (event.target === popupOverlay) {
            hidePopup();
        }
    });

    // Close popup on Escape key press
    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape" && popupOverlay.classList.contains("active")) {
            hidePopup();
        }
    });
});
