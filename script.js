/**
 * My Book Archive - Interactive Logic
 * Handles navigation, animations, mobile menu, and scroll behaviors
 */

document.addEventListener('DOMContentLoaded', () => {
    // ===== DOM Element References =====
    const navbar = document.getElementById('navbar');
    const navLinks = document.getElementById('navLinks');
    const navLinkItems = document.querySelectorAll('.nav-link');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const backToTop = document.getElementById('backToTop');
    const bookCards = document.querySelectorAll('.book-card');
    const statNumbers = document.querySelectorAll('.stat-number');
    const sections = document.querySelectorAll('.book-section');

    // ===== State =====
    let isMenuOpen = false;
    let statsAnimated = false;

    // ===== Navbar Scroll Effect =====
    function handleNavbarScroll() {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // ===== Mobile Menu =====
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        mobileMenuBtn.classList.toggle('open', isMenuOpen);
        navLinks.classList.toggle('open', isMenuOpen);
        mobileOverlay.classList.toggle('active', isMenuOpen);
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    }

    function closeMenu() {
        if (isMenuOpen) {
            isMenuOpen = false;
            mobileMenuBtn.classList.remove('open');
            navLinks.classList.remove('open');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // ===== Active Nav Link on Scroll =====
    function updateActiveNavLink() {
        const scrollPos = window.scrollY + 150;

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                navLinkItems.forEach(link => link.classList.remove('active'));
                if (navLinkItems[index]) {
                    navLinkItems[index].classList.add('active');
                }
            }
        });

        // Clear active state if at top of page
        if (window.scrollY < 100) {
            navLinkItems.forEach(link => link.classList.remove('active'));
        }
    }

    // ===== Back to Top Button =====
    function handleBackToTop() {
        if (window.scrollY > 600) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // ===== Intersection Observer for Book Cards =====
    const cardObserverOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1
    };

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                cardObserver.unobserve(entry.target);
            }
        });
    }, cardObserverOptions);

    bookCards.forEach(card => {
        cardObserver.observe(card);
    });

    // ===== Animated Number Counters =====
    function animateCounters() {
        if (statsAnimated) return;

        const heroStats = document.querySelector('.hero-stats');
        if (!heroStats) return;

        const rect = heroStats.getBoundingClientRect();
        if (rect.top > window.innerHeight || rect.bottom < 0) return;

        statsAnimated = true;

        statNumbers.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'), 10);
            const duration = 2000;
            const startTime = performance.now();
            const startValue = 0;

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Ease out cubic
                const easeProgress = 1 - Math.pow(1 - progress, 3);
                const currentValue = Math.floor(startValue + (target - startValue) * easeProgress);

                counter.textContent = currentValue + (target === 100 ? '%' : '+');

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + (target === 100 ? '%' : '+');
                }
            }

            requestAnimationFrame(updateCounter);
        });
    }

    // ===== Smooth Scroll for Nav Links =====
    function handleSmoothScroll(e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offset = 100;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                closeMenu();
            }
        }
    }

    // ===== Event Listeners =====

    // Scroll events (throttled)
    let ticking = false;
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleNavbarScroll();
                updateActiveNavLink();
                handleBackToTop();
                animateCounters();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // Mobile menu
    mobileMenuBtn.addEventListener('click', toggleMenu);
    mobileOverlay.addEventListener('click', closeMenu);

    // Nav links smooth scroll
    navLinkItems.forEach(link => {
        link.addEventListener('click', handleSmoothScroll);
    });

    // Also handle any other anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (!anchor.classList.contains('nav-link')) {
            anchor.addEventListener('click', handleSmoothScroll);
        }
    });

    // Back to top
    backToTop.addEventListener('click', scrollToTop);

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });

    // Close menu on window resize (if going to desktop)
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (window.innerWidth > 768) {
                closeMenu();
            }
        }, 150);
    });

    // ===== Initialize =====
    handleNavbarScroll();
    updateActiveNavLink();
    animateCounters(); // Check if already in view on load

    // Trigger initial scroll check after a short delay for layout stability
    setTimeout(() => {
        onScroll();
    }, 100);
});
