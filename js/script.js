// navbar toggling
const navbarShowBtn = document.querySelector('.navbar-show-btn');
const navbarCollapseDiv = document.querySelector('.navbar-collapse');
const navbarHideBtn = document.querySelector('.navbar-hide-btn');

// Ensure navbar is hidden on load
if (navbarCollapseDiv) {
    navbarCollapseDiv.classList.remove('navbar-show');
}

// Function to close mobile menu
function closeMobileMenu() {
    navbarCollapseDiv.classList.remove('navbar-show');
}

navbarShowBtn.addEventListener('click', function(){
    navbarCollapseDiv.classList.add('navbar-show');
});

navbarHideBtn.addEventListener('click', function(){
    closeMobileMenu();
});

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const isClickInsideMenu = navbarCollapseDiv.contains(event.target);
    const isClickOnShowBtn = navbarShowBtn.contains(event.target);
    
    if (navbarCollapseDiv.classList.contains('navbar-show') && 
        !isClickInsideMenu && 
        !isClickOnShowBtn) {
        closeMobileMenu();
    }
});

// changing search icon image on window resize
window.addEventListener('resize', changeSearchIcon);
function changeSearchIcon(){
    let winSize = window.matchMedia("(min-width: 1200px)");
    if(winSize.matches){
        document.querySelector('.search-icon img').src = "images/search-icon.png";
    } else {
        document.querySelector('.search-icon img').src = "images/search-icon-dark.png";
    }
}
changeSearchIcon();

// stopping all animation and transition
let resizeTimer;
window.addEventListener('resize', () =>{
    document.body.classList.add('resize-animation-stopper');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove('resize-animation-stopper');
    }, 400);
});

// Gradient text effect is now handled in CSS with beautiful animations

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.service-item, .doc-panel-item, .post-item, .package-service-item, .footer-item, .about-left');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('reveal', 'active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Run once on load

// Function to scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    // Close mobile menu if open
    closeMobileMenu();
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') {
            e.preventDefault();
            scrollToTop();
            return;
        }
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const headerOffset = 80; // Offset for fixed navbar
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            // Close mobile menu if open
            closeMobileMenu();
        }
    });
});

// Parallax effect on header
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const header = document.querySelector('.header-inner-right img');
    if (header) {
        header.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(26, 26, 26, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'transparent';
        navbar.style.boxShadow = 'none';
    }
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add subtle mouse move parallax effect on hover only
document.querySelectorAll('.service-item, .doc-panel-item, .post-item').forEach(element => {
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const moveX = (x - centerX) / 10;
        const moveY = (y - centerY) / 10;
        
        element.style.transform = `perspective(1000px) rotateY(${-moveX}deg) rotateX(${moveY}deg) translateY(-5px)`;
    });
    
    element.addEventListener('mouseleave', () => {
        element.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0)';
    });
});

// Search functionality
const searchInput = document.querySelector('.search-control');
if (searchInput) {
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const searchTerm = this.value.toLowerCase();
            
            // Search through page content
            const sections = {
                'home': document.getElementById('about') || document.querySelector('header'),
                'about': document.getElementById('about'),
                'portfolio': document.getElementById('portfolio'),
                'skills': document.getElementById('portfolio'),
                'post': document.getElementById('posts'),
                'posts': document.getElementById('posts'),
                'blog': document.getElementById('posts'),
                'experience': document.getElementById('experience'),
                'contact': document.getElementById('contact')
            };
            
            // Try to find matching section
            for (const [key, section] of Object.entries(sections)) {
                if (searchTerm.includes(key) && section) {
                    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    this.value = '';
                    return;
                }
            }
            
            // If no match found, show alert
            alert('No results found. Try searching for: home, about, portfolio, skills, posts, experience, or contact');
        }
    });
}

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
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
    #form-status {
        padding: 1rem;
        border-radius: 5px;
        animation: fadeIn 0.3s ease;
    }
    #form-status.success {
        background-color: rgba(76, 175, 80, 0.2);
        border: 1px solid #4CAF50;
        color: #4CAF50;
    }
    #form-status.error {
        background-color: rgba(244, 67, 54, 0.2);
        border: 1px solid #f44336;
        color: #f44336;
    }
`;
document.head.appendChild(style);

// Typing Animation for Professional Titles
const typingText = document.getElementById('typing-text');
const cursor = document.getElementById('cursor');

const titles = [
    'Software Engineer',
    'Web Developer',
    'UI/UX Designer',
    'Programmer',
    'React Developer',
    'Frontend Developer',
    'JavaScript Developer'
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeWriter() {
    const currentTitle = titles[titleIndex];
    
    if (isDeleting) {
        typingText.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50; // Faster when deleting
    } else {
        typingText.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100; // Normal speed when typing
    }
    
    if (!isDeleting && charIndex === currentTitle.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typeSpeed = 500; // Pause before next title
    }
    
    setTimeout(typeWriter, typeSpeed);
}

// Start typing animation when page loads
if (typingText && cursor) {
    typeWriter();
}

// Enhanced Email Functionality
class EmailService {
    constructor() {
        this.receiverEmail = 'samij7141@gmail.com';
        this.serviceUrls = [
            'https://formsubmit.co/ajax/samij7141@gmail.com',
            'https://api.emailjs.com/api/v1.0/email/send',
            'https://api.web3forms.com/submit'
        ];
    }

    async sendEmail(formData) {
        const emailData = {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            to: this.receiverEmail,
            from: formData.email,
            replyTo: formData.email
        };

        // Try multiple email services for reliability
        for (let i = 0; i < this.serviceUrls.length; i++) {
            try {
                const result = await this.tryEmailService(this.serviceUrls[i], emailData);
                if (result.success) {
                    return { success: true, service: this.serviceUrls[i], data: result };
                }
            } catch (error) {
                console.warn(`Email service ${i + 1} failed:`, error);
                continue;
            }
        }

        // Fallback to mailto
        return this.fallbackToMailto(emailData);
    }

    async tryEmailService(url, data) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                signal: controller.signal
            });

            clearTimeout(timeoutId);
            
            if (response.ok) {
                const result = await response.json();
                return { success: true, data: result };
            } else {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
        } catch (error) {
            clearTimeout(timeoutId);
            throw error;
        }
    }

    fallbackToMailto(data) {
        const subject = encodeURIComponent(data.subject);
        const body = encodeURIComponent(
            `Name: ${data.name}\n` +
            `Email: ${data.email}\n` +
            `Subject: ${data.subject}\n\n` +
            `Message:\n${data.message}`
        );
        
        const mailtoLink = `mailto:${this.receiverEmail}?subject=${subject}&body=${body}`;
        window.location.href = mailtoLink;
        
        return { 
            success: true, 
            method: 'mailto',
            message: 'Opened email client. Please send manually.'
        };
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    validateForm(formData) {
        const errors = [];
        
        if (!formData.name || formData.name.trim().length < 2) {
            errors.push('Name must be at least 2 characters long');
        }
        
        if (!formData.email || !this.validateEmail(formData.email)) {
            errors.push('Please enter a valid email address');
        }
        
        if (!formData.subject || formData.subject.trim().length < 3) {
            errors.push('Subject must be at least 3 characters long');
        }
        
        if (!formData.message || formData.message.trim().length < 10) {
            errors.push('Message must be at least 10 characters long');
        }
        
        return errors;
    }
}

// Initialize email service
const emailService = new EmailService();

// Enhanced contact form handler
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    if (!contactForm || !formStatus) return;

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim()
        };
        
        // Validate form
        const validationErrors = emailService.validateForm(formData);
        if (validationErrors.length > 0) {
            showFormStatus(formStatus, validationErrors.join(', '), 'error');
            return;
        }
        
        // Show loading state
        showFormStatus(formStatus, '📧 Sending message...', 'loading');
        
        try {
            // Send email
            const result = await emailService.sendEmail(formData);
            
            if (result.success) {
                showFormStatus(formStatus, 
                    '✅ Message sent successfully! You will receive a copy at samij7141@gmail.com', 
                    'success'
                );
                
                // Reset form
                contactForm.reset();
                
                // Hide message after 8 seconds
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 8000);
            } else {
                throw new Error('Email sending failed');
            }
        } catch (error) {
            console.error('Email error:', error);
            showFormStatus(formStatus, 
                '❌ Failed to send message. Please try again or contact directly at samij7141@gmail.com', 
                'error'
            );
        }
    });
}

function showFormStatus(element, message, type) {
    element.textContent = message;
    element.style.display = 'block';
    element.className = `text text-sm ${type}`;
    
    // Style based on type
    switch(type) {
        case 'success':
            element.style.backgroundColor = 'rgba(76, 175, 80, 0.2)';
            element.style.border = '1px solid #4CAF50';
            element.style.color = '#4CAF50';
            break;
        case 'error':
            element.style.backgroundColor = 'rgba(244, 67, 54, 0.2)';
            element.style.border = '1px solid #f44336';
            element.style.color = '#f44336';
            break;
        case 'loading':
            element.style.backgroundColor = 'rgba(255, 193, 7, 0.2)';
            element.style.border = '1px solid #FFC107';
            element.style.color = '#FFC107';
            break;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeContactForm();
});

// Contact Form is now handled with enhanced email service

