document.addEventListener('DOMContentLoaded', () => {
    // Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const answer = item.querySelector('.faq-answer');
            const icon = item.querySelector('.faq-icon');
            
            // Toggle answer visibility
            if (answer) {
                const isOpen = answer.style.maxHeight;
                // Close all others
                document.querySelectorAll('.faq-answer').forEach(a => {
                    a.style.maxHeight = null;
                    a.style.marginTop = '0';
                });
                document.querySelectorAll('.faq-icon').forEach(i => i.style.transform = 'rotate(0deg)');
                
                if (!isOpen) {
                    answer.style.maxHeight = answer.scrollHeight + "px";
                    answer.style.marginTop = "12px";
                    icon.style.transform = 'rotate(180deg)';
                }
            }
        });
    });

    // Parallax Effect for Hero
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scroll = window.pageYOffset;
            // Shift background position slightly based on scroll
            hero.style.backgroundPositionY = (scroll * 0.5) + 'px';
        });
    }

    // Lightbox Logic for Gallery
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length > 0) {
        // Create lightbox HTML
        const lightboxHTML = `
            <div class="lightbox" id="lightbox">
                <button class="lightbox-close" aria-label="Fechar">&times;</button>
                <img src="" alt="Ampliada" class="lightbox-content" id="lightbox-img">
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);

        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const closeBtn = document.querySelector('.lightbox-close');

        galleryItems.forEach(item => {
            item.addEventListener('click', (e) => {
                lightboxImg.src = e.target.src;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
            setTimeout(() => { lightboxImg.src = ''; }, 300);
        };

        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
        });
    }
});
