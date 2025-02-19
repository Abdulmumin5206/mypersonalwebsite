document.addEventListener("DOMContentLoaded", function () {
    // ✅ Select elements
    const logo = document.querySelector("#main-header .logo img");
    const navLinks = document.querySelectorAll("#main-header nav ul li a");
    const toggleSwitch = document.querySelector('#theme-checkbox');
    const themeIcon = document.querySelector(".theme-toggle img");

    // ✅ Function to update logo based on theme
    function updateThemeVisuals(theme) {
        if (logo) {
            logo.src = theme === 'dark' ? 'images/logo_white.svg' : 'images/logo.svg';
        }
        if (themeIcon) {
            themeIcon.src = theme === 'dark' ? 'icons/dark.svg' : 'icons/light.svg';
        }
    }

    // ✅ Get saved theme or use system default
    const currentTheme = localStorage.getItem('theme') || 
                        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    // ✅ Apply the theme and update visuals
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateThemeVisuals(theme);
    }

    if (currentTheme === 'dark') {
        applyTheme('dark');
        if (toggleSwitch) toggleSwitch.checked = true;
    } else {
        applyTheme('light');
    }

    // ✅ Toggle theme on switch change
    if (toggleSwitch) {
        toggleSwitch.addEventListener('change', function () {
            applyTheme(this.checked ? 'dark' : 'light');
        });
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
