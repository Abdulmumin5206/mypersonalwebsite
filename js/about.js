document.addEventListener("DOMContentLoaded", function() {
    // Typing Animation
    const typingConfig = {
        element: document.getElementById('typing-text'),
        phrases: [
            "Hi, I'm Abdulmumin 👋",
            "I'm a Mechatronics Engineer 🛠️",
            "I'm a Problem Solver 💡",
            "I'm a Maker 🔧"
        ],
        typingSpeed: 100,
        deletingSpeed: 50,
        pauseBeforeDelete: 2000,
        pauseBeforeType: 500
    };

    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;

    function typeText() {
        const currentPhrase = typingConfig.phrases[currentPhraseIndex];
        let speed = typingConfig.typingSpeed;

        if (isDeleting) {
            typingConfig.element.textContent = currentPhrase.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            speed = typingConfig.deletingSpeed;
        } else {
            typingConfig.element.textContent = currentPhrase.substring(0, currentCharIndex + 1);
            currentCharIndex++;
        }

        if (!isDeleting && currentCharIndex === currentPhrase.length) {
            isDeleting = true;
            speed = typingConfig.pauseBeforeDelete;
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentPhraseIndex = (currentPhraseIndex + 1) % typingConfig.phrases.length;
            speed = typingConfig.pauseBeforeType;
        }

        setTimeout(typeText, speed);
    }

    // Start typing animation
    if (typingConfig.element) {
        typeText();
    }

    // Add hover effects to timeline events
    const timelineEvents = document.querySelectorAll('.timeline-event');
    timelineEvents.forEach(event => {
        event.addEventListener("mouseenter", function() {
            event.style.transition = "transform 0.2s ease-out";
        });

        event.addEventListener("mouseleave", function() {
            event.style.transition = "transform 0.2s ease-in";
        });
    });
});