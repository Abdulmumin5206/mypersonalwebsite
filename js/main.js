// Copy this complete code into your main.js file
document.addEventListener("DOMContentLoaded", function () {
    // Theme toggle functionality (your existing code)
    const logo = document.querySelector("#main-header .logo img");
    const navLinks = document.querySelectorAll("#main-header nav ul li a");
    const toggleSwitch = document.querySelector('#theme-checkbox');
    const themeIcon = document.querySelector(".theme-toggle img");

    // Theme functions
    function updateThemeVisuals(theme) {
        if (logo) {
            logo.src = theme === 'dark' ? 'images/logo_white.svg' : 'images/logo.svg';
        }
        if (themeIcon) {
            themeIcon.src = theme === 'dark' ? 'icons/dark.svg' : 'icons/light.svg';
        }
    }

    const currentTheme = localStorage.getItem('theme') || 
                        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

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

    if (toggleSwitch) {
        toggleSwitch.addEventListener('change', function () {
            applyTheme(this.checked ? 'dark' : 'light');
        });
    }

    // Logo hover effect
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

    // Nav links hover effect
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

    // MOBILE MENU IMPLEMENTATION
    // 1. Create hamburger menu button if it doesn't exist
    let mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const header = document.getElementById('main-header');
    const nav = document.querySelector('#main-header nav');
    const navUl = document.querySelector('#main-header nav ul');

    if (!mobileMenuToggle) {
        mobileMenuToggle = document.createElement('div');
        mobileMenuToggle.className = 'mobile-menu-toggle';
        mobileMenuToggle.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        // Insert the button at the beginning of the header
        header.insertBefore(mobileMenuToggle, header.firstChild);
    }

    // 2. Add necessary class to the nav menu
    navUl.classList.add('nav-menu');

    // 3. Toggle menu function - simplified and direct
    mobileMenuToggle.addEventListener('click', function() {
        console.log("Mobile menu clicked"); // Debug
        navUl.classList.toggle('active');
        this.classList.toggle('active');
    });
});