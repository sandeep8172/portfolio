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

// ========== Lightbox Gallery ==========
const galleryImages = {
    ecom: [
        './assets/projects/ecom-1.png',
        './assets/projects/ecom-2.png',
        './assets/projects/ecom-3.png',
        './assets/projects/ecom-4.png',
        './assets/projects/ecom-5.png',
        './assets/projects/ecom-6.png',
    ],
};

let currentIndex = 0;
let currentGallery = '';

function openLightbox(index, gallery) {
    currentIndex = index;
    currentGallery = gallery;
    const images = galleryImages[gallery];
    if (!images) return;

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const counter = document.getElementById('lightbox-counter');

    lightboxImg.src = images[index];
    counter.textContent = `${index + 1} / ${images.length}`;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox(e) {
    if (e) e.stopPropagation();
    const lightbox = document.getElementById('lightbox');
    // Only close if clicking overlay background or close button
    if (e && e.target !== lightbox && !e.target.classList.contains('lightbox-close')) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function navigateLightbox(direction, e) {
    if (e) e.stopPropagation();
    const images = galleryImages[currentGallery];
    if (!images) return;

    currentIndex = (currentIndex + direction + images.length) % images.length;
    const lightboxImg = document.getElementById('lightbox-img');
    const counter = document.getElementById('lightbox-counter');

    lightboxImg.src = images[currentIndex];
    counter.textContent = `${currentIndex + 1} / ${images.length}`;
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    } else if (e.key === 'ArrowLeft') {
        navigateLightbox(-1);
    } else if (e.key === 'ArrowRight') {
        navigateLightbox(1);
    }
});
