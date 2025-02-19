document.addEventListener("DOMContentLoaded", function () {
    const logo = document.querySelector("#main-header .logo img");
    const navLinks = document.querySelectorAll("#main-header nav ul li a");
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

    // ✅ Check for saved theme preference
    const currentTheme = localStorage.getItem('theme') || 
                        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // ✅ Apply the saved theme or system preference
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        toggleSwitch.checked = true;
    }

    // ✅ Function to switch theme
    function switchTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    }

    // ✅ Event listener for theme switch
    if (toggleSwitch) {
        toggleSwitch.addEventListener('change', switchTheme, false);
    }

    // ✅ Smooth hover effect for the logo
    if (logo) {
        logo.addEventListener("mouseenter", function () {
            logo.style.transition = "transform 0.2s ease-out";
            logo.style.transform = "scale(1.1)";
        });

        logo.addEventListener("mouseleave", function () {
            logo.style.transition = "transform 0.2s ease-in";
            logo.style.transform = "scale(1)";
        });
    }

    // ✅ Smooth hover effect for menu links
    navLinks.forEach(link => {
        link.addEventListener("mouseenter", function () {
            link.style.transition = "transform 0.2s ease-out";
            link.style.transform = "scale(1.1)";
        });

        link.addEventListener("mouseleave", function () {
            link.style.transition = "transform 0.2s ease-in";
            link.style.transform = "scale(1)";
        });
    });
});