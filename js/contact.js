document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent page reload

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (name === "" || email === "" || message === "") {
            alert("Please fill in all fields.");
            return;
        }

        // ✅ Send data to backend on Render
        const response = await fetch("https://mypersonalwebsite-qp06.onrender.com/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, message }),
        });

        const result = await response.json();

        if (response.ok) {
            alert("Message sent successfully!");
            form.reset();
        } else {
            alert("Failed to send message. Please try again.");
        }
    });
});
