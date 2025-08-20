// DOM Elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMobile = document.getElementById('nav-mobile');
const contactForm = document.getElementById('contact-form');
const toast = document.getElementById('toast');

// Navigation functionality
let isMenuOpen = false;

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
if (navToggle) {
    navToggle.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            navMobile.style.display = 'block';
            navToggle.classList.add('active');
            
            // Animate hamburger to X
            const hamburgers = navToggle.querySelectorAll('.hamburger');
            hamburgers[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            hamburgers[1].style.opacity = '0';
            hamburgers[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            navMobile.style.display = 'none';
            navToggle.classList.remove('active');
            
            // Reset hamburger
            const hamburgers = navToggle.querySelectorAll('.hamburger');
            hamburgers[0].style.transform = 'none';
            hamburgers[1].style.opacity = '1';
            hamburgers[2].style.transform = 'none';
        }
    });
}

// Smooth scrolling for navigation links
function scrollToSection(selector) {
    const element = document.querySelector(selector);
    if (element) {
        const offsetTop = element.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (isMenuOpen && navMobile && navToggle) {
            navMobile.style.display = 'none';
            isMenuOpen = false;
            navToggle.classList.remove('active');
            safeHamburgerReset(navToggle);
        }
    }
}

// Add click events to navigation links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        scrollToSection(targetId);
    });
});

// Contact form handling
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Validate form
        if (!name || !email || !message) {
            showToast('Please fill in all fields.', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Show success message
            showToast('Message sent successfully! Thank you for reaching out. I\'ll get back to you soon.', 'success');
        }, 1500);
    });
}

// Toast notification function
function showToast(message, type = 'success') {
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in class to elements that should animate
    const animateElements = [
        '.hero-text',
        '.hero-image',
        '.section-header',
        '.about-bio',
        '.skills-section',
        '.skill-card',
        '.project-card',
        '.contact-info',
        '.contact-form-container'
    ];
    
    animateElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            observer.observe(el);
        });
    });
    
    // Stagger animation for skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 100}ms`;
    });
    
    // Stagger animation for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 200}ms`;
    });
});

// Skill card hover effects
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const skill = card.getAttribute('data-skill');
        card.style.transform = 'translateY(-10px) scale(1.05)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px)';
        card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '';
    });
});

// Smooth scroll for hero scroll indicator
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        scrollToSection('#about');
    });
}

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const particles = document.querySelectorAll('.particle');
    
    particles.forEach((particle, index) => {
        const speed = 0.5 + (index * 0.1);
        particle.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .nav-mobile-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect on page load
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const titleText = heroTitle.textContent;
        typeWriter(heroTitle, titleText, 100);
    }
});

// Form validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Real-time form validation
const emailInput = document.getElementById('email');
if (emailInput) {
    emailInput.addEventListener('blur', (e) => {
        const email = e.target.value;
        if (email && !validateEmail(email)) {
            e.target.style.borderColor = '#ef4444';
            showToast('Please enter a valid email address.', 'error');
        } else {
            e.target.style.borderColor = '';
        }
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen) {
        navMobile.style.display = 'none';
        isMenuOpen = false;
        navToggle.classList.remove('active');
        
        safeHamburgerReset(navToggle);
    }
});

// Preloader (optional)
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Console easter egg
console.log(`
    ██████╗ ██████╗  █████╗ ██████╗ ██╗  ██╗███████╗███████╗██████╗ 
    ██╔══██╗██╔══██╗██╔══██╗██╔══██╗██║  ██║██╔════╝██╔════╝██╔══██╗
    ██████╔╝██████╔╝███████║██║  ██║███████║█████╗  █████╗  ██████╔╝
    ██╔═══╝ ██╔══██╗██╔══██║██║  ██║██╔══██║██╔══╝  ██╔══╝  ██╔═══╝ 
    ██║     ██║  ██║██║  ██║██████╔╝██║  ██║███████╗███████╗██║     
    ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝     

    👋 Hey there! Thanks for checking out my portfolio.
    📧 Feel free to reach out: pradheepc05@gmail.com
    🔗 Let's connect: https://linkedin.com/in/pradheepc05
`);

// Safe hamburger reset function
function safeHamburgerReset(navToggle) {
    const hamburgers = navToggle.querySelectorAll('.hamburger');
    if (hamburgers.length === 3) {
        hamburgers[0].style.transform = 'none';
        hamburgers[1].style.opacity = '1';
        hamburgers[2].style.transform = 'none';
    }
}
