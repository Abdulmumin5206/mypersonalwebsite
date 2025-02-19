document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevents page refresh

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (name === "" || email === "" || message === "") {
            alert("⚠️ Please fill in all fields.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message }),
            });

            const result = await response.json();

            if (response.ok) {
                alert("✅ Message sent successfully!");
                form.reset();
            } else {
                alert(`❌ Failed to send: ${result.error}`);
            }
        } catch (error) {
            alert("⚠️ An error occurred. Please try again later.");
        }
    });
});
