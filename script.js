// Header active state on scroll
const header = document.querySelector('.header');
const navbar = document.querySelector('.navbar');
const menuButton = document.querySelector('.menu');
const navLinks = document.querySelectorAll('.navbar a');
const sections = document.querySelectorAll('section');

const handleScroll = () => {
    // Header background toggle
    if (window.scrollY > 50) {
        header.classList.add('active');
    } else {
        header.classList.remove('active');
    }

    // Active link highlighting
    let current = '';
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href && href !== '#' && current && href.includes(current)) {
            link.classList.add('active');
        } else if (href === '#' && !current) {
            link.classList.add('active');
        }
    });

    // Close mobile menu on scroll if open
    if (navbar.classList.contains('show')) {
        navbar.classList.remove('show');
    }
};

// Mobile menu toggle
menuButton.addEventListener('click', () => {
    navbar.classList.toggle('show');
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('show');
    });
});

// Initialize listeners
window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll);
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navbar.classList.remove('show');
    }
});
