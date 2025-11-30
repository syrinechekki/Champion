// Force logo image reload to prevent caching issues
document.addEventListener('DOMContentLoaded', () => {
    const logoImages = document.querySelectorAll('img[src*="logo.png"]');
    logoImages.forEach(img => {
        const timestamp = new Date().getTime();
        const currentSrc = img.src.split('?')[0];
        img.src = currentSrc + '?v=' + timestamp;
    });
});

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

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Enhanced 3D book animation on mouse move
const book3d = document.querySelector('.book-3d');
if (book3d) {
    let isHovering = false;
    
    book3d.addEventListener('mouseenter', () => {
        isHovering = true;
        book3d.style.animation = 'none';
    });
    
    book3d.addEventListener('mouseleave', () => {
        isHovering = false;
        book3d.style.animation = 'floatBook 6s ease-in-out infinite';
        book3d.style.transform = '';
    });
    
    document.addEventListener('mousemove', (e) => {
        if (isHovering && book3d) {
            const rect = book3d.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const x = (e.clientX - centerX) / (rect.width / 2);
            const y = (e.clientY - centerY) / (rect.height / 2);
            
            const rotateX = y * 15;
            const rotateY = x * -25;
            
            book3d.style.transform = `rotateY(${-20 + rotateY}deg) rotateX(${3 + rotateX}deg) translateY(${y * -5}px)`;
        }
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.benefit-card, .team-card, .feature-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Parallax effect removed - content stays in place

// Loading overlay functions
function showLoading() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        loadingOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function hideLoading() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        loadingOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// CTA button interactions
const ctaButtons = document.querySelectorAll('.cta-button, .footer-cta');
ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Add ripple effect
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        // Show loading overlay
        showLoading();
        
        // Redirect to Lulu store after loading
        setTimeout(() => {
            // Redirect to Lulu e-book page
            window.location.href = 'https://www.lulu.com/fr/shop/the-legit-six/champion/ebook/product-w4q2nvj.html?q=Champion&page=1&pageSize=4';
        }, 2000); // 2 seconds loading before redirect
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .cta-button, .footer-cta {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

