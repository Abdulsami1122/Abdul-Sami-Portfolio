// navbar toggling
const navbarShowBtn = document.querySelector('.navbar-show-btn');
const navbarCollapseDiv = document.querySelector('.navbar-collapse');
const navbarHideBtn = document.querySelector('.navbar-hide-btn');

navbarShowBtn.addEventListener('click', function(){
    navbarCollapseDiv.classList.add('navbar-show');
});
navbarHideBtn.addEventListener('click', function(){
    navbarCollapseDiv.classList.remove('navbar-show');
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

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (window.innerWidth < 1200) {
                navbarCollapseDiv.classList.remove('navbar-show');
            }
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
        navbar.style.background = 'rgba(0, 80, 213, 0.95)';
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
`;
document.head.appendChild(style);