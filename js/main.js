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


// Add this to your existing main.js file
document.addEventListener("DOMContentLoaded", function () {
    // Create hamburger menu element
    const header = document.getElementById('main-header');
    const nav = document.querySelector('#main-header nav');
    const navUl = document.querySelector('#main-header nav ul');
    
    // Add mobile menu classes
    navUl.classList.add('nav-menu');
    
    // Create mobile menu toggle button
    const mobileMenuToggle = document.createElement('div');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    
    // Insert toggle button
    header.insertBefore(mobileMenuToggle, nav);
    
    // Toggle menu function
    mobileMenuToggle.addEventListener('click', function() {
        navUl.classList.toggle('active');
        
        // Animate hamburger to X
        const spans = this.querySelectorAll('span');
        if (navUl.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('#main-header nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navUl.classList.remove('active');
                const spans = document.querySelectorAll('.mobile-menu-toggle span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });
    
    // Close menu on window resize if wider than mobile
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navUl.classList.remove('active');
            const spans = document.querySelectorAll('.mobile-menu-toggle span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
});