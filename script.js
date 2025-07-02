// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Email link hover effect
document.querySelector('.email-link').addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-3px)';
});

document.querySelector('.email-link').addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
});

// Add animation on scroll for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.genre-card, .media-item, .about-content, .contact-content');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add hover effects for media items
document.querySelectorAll('.media-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click handlers for media placeholders
document.querySelectorAll('.media-placeholder').forEach(placeholder => {
    placeholder.addEventListener('click', function() {
        const mediaType = this.parentElement.classList.contains('video') ? 'video' : 
                          this.parentElement.classList.contains('audio') ? 'audio' : 'image';
        
        alert(`This would open the ${mediaType} player/viewer. Replace this with actual media functionality.`);
    });
    
    // Add cursor pointer to indicate clickability
    placeholder.style.cursor = 'pointer';
});

// Simple mobile menu toggle (if needed for smaller screens)
function createMobileMenu() {
    const navbar = document.querySelector('.nav-container');
    const navMenu = document.querySelector('.nav-menu');
    
    if (window.innerWidth <= 768) {
        if (!document.querySelector('.mobile-menu-toggle')) {
            const menuToggle = document.createElement('button');
            menuToggle.className = 'mobile-menu-toggle';
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            menuToggle.style.cssText = `
                background: none;
                border: none;
                font-size: 1.5rem;
                color: var(--text-primary);
                cursor: pointer;
                display: block;
                transition: color 0.3s ease;
            `;
            
            function toggleMenu() {
                navMenu.classList.toggle('mobile-active');
                const icon = menuToggle.querySelector('i');
                if (navMenu.classList.contains('mobile-active')) {
                    icon.className = 'fas fa-times';
                } else {
                    icon.className = 'fas fa-bars';
                }
            }
            
            menuToggle.addEventListener('click', toggleMenu);
            
            // Close menu when clicking on nav links
            const navLinks = navMenu.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    if (navMenu.classList.contains('mobile-active')) {
                        navMenu.classList.remove('mobile-active');
                        menuToggle.querySelector('i').className = 'fas fa-bars';
                    }
                });
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', function(event) {
                if (!navbar.contains(event.target) && navMenu.classList.contains('mobile-active')) {
                    navMenu.classList.remove('mobile-active');
                    menuToggle.querySelector('i').className = 'fas fa-bars';
                }
            });
            
            navbar.appendChild(menuToggle);
            
            // Add mobile styles to nav menu
            navMenu.style.cssText += `
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                flex-direction: column;
                padding: 25px 20px;
                box-shadow: 0 4px 15px var(--shadow-medium);
                transform: translateY(-100%);
                opacity: 0;
                pointer-events: none;
                transition: all 0.3s ease;
                border-top: 1px solid var(--border-light);
                z-index: 999;
            `;
        }
    }
}

// Handle responsive menu
window.addEventListener('resize', createMobileMenu);
document.addEventListener('DOMContentLoaded', createMobileMenu);

// Add CSS for mobile menu active state
const style = document.createElement('style');
style.textContent = `
    .nav-menu.mobile-active {
        transform: translateY(0) !important;
        opacity: 1 !important;
        pointer-events: auto !important;
    }
    
    @media (min-width: 769px) {
        .mobile-menu-toggle {
            display: none !important;
        }
        
        .nav-menu {
            position: static !important;
            transform: none !important;
            opacity: 1 !important;
            pointer-events: auto !important;
            flex-direction: row !important;
            background: none !important;
            box-shadow: none !important;
            padding: 0 !important;
        }
    }
`;
document.head.appendChild(style);