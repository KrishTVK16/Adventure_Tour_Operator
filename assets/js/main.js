/**
 * Adventure Tour Operator - Main JS
 * Handles Theme Toggle, Sticky Navbar, and Initializations
 */

document.addEventListener('DOMContentLoaded', () => {

    // === Theme Toggle Logic ===
    const themeToggleBtns = document.querySelectorAll('.theme-toggle');
    const htmlElement = document.documentElement;

    // Check saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(systemPrefersDark ? 'dark' : 'light');
    }

    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-bs-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    });

    function setTheme(theme) {
        htmlElement.setAttribute('data-bs-theme', theme);
        localStorage.setItem('theme', theme);

        themeToggleBtns.forEach(btn => {
            const icon = btn.querySelector('i');
            if (icon) {
                icon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
            }
        });
    }

    // === Navbar Scroll Effect ===
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-sm');
        } else {
            navbar.classList.remove('shadow-sm');
        }
    });

    // === Initialize Tooltips/Popovers if needed ===
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    // === Dynamic Trip Modal Logic ===
    const tripModal = document.getElementById('tripModal');
    if (tripModal) {
        tripModal.addEventListener('show.bs.modal', (event) => {
            const button = event.relatedTarget; // Button that triggered the modal

            // Extract info from data-bs-* attributes
            const title = button.getAttribute('data-bs-title');
            const image = button.getAttribute('data-bs-image');
            const price = button.getAttribute('data-bs-price');
            const location = button.getAttribute('data-bs-location');
            const duration = button.getAttribute('data-bs-duration');
            const desc = button.getAttribute('data-bs-desc');
            const badge = button.getAttribute('data-bs-badge');

            // Update modal content
            tripModal.querySelector('#modalTitle').textContent = title;
            tripModal.querySelector('#modalImage').src = image;
            tripModal.querySelector('#modalPrice').textContent = price;
            tripModal.querySelector('#modalLocation').textContent = location;
            tripModal.querySelector('#modalDuration').textContent = duration;
            tripModal.querySelector('#modalDesc').textContent = desc;

            const modalBadge = tripModal.querySelector('#modalBadge');
            if (badge) {
                modalBadge.textContent = badge;
                modalBadge.style.display = 'inline-block';
            } else {
                modalBadge.style.display = 'none';
            }
        });
    }

    // === Back to Top Button Logic ===
    const backToTopBtn = document.getElementById('backToTop');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.style.display = 'flex'; // Use flex to center the icon
            } else {
                backToTopBtn.style.display = 'none';
            }
        });

        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
