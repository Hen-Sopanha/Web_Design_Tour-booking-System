document.addEventListener('DOMContentLoaded', () => {
    // Lightbox Logic for Tour Images
    const lightbox = document.getElementById('image-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    const galleryImages = document.querySelectorAll('.tour-hero-img');

    let currentImgIndex = 0;
    // Filter out placeholders 
    const validImages = Array.from(galleryImages).filter(img => img.getAttribute('src') && img.getAttribute('src') !== '');

    if (lightbox && lightboxImg && validImages.length > 0) {
        const updateLightboxImage = (index) => {
            if (index >= 0 && index < validImages.length) {
                currentImgIndex = index;
                lightboxImg.src = validImages[currentImgIndex].src;
            }
        };

        validImages.forEach((img, index) => {
            img.addEventListener('click', function () {
                updateLightboxImage(index);
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';

            setTimeout(() => {
                if (!lightbox.classList.contains('active')) {
                    lightboxImg.src = '';
                }
            }, 300);
        };

        if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                let nextIndex = currentImgIndex - 1;
                if (nextIndex < 0) nextIndex = validImages.length - 1;
                updateLightboxImage(nextIndex);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                let nextIndex = currentImgIndex + 1;
                if (nextIndex >= validImages.length) nextIndex = 0;
                updateLightboxImage(nextIndex);
            });
        }

        // Close when clicking background or container
        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox || e.target.classList.contains('lightbox-image-container')) {
                closeLightbox();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', function (e) {
            if (!lightbox.classList.contains('active')) return;

            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                let nextIndex = currentImgIndex - 1;
                if (nextIndex < 0) nextIndex = validImages.length - 1;
                updateLightboxImage(nextIndex);
            } else if (e.key === 'ArrowRight') {
                let nextIndex = currentImgIndex + 1;
                if (nextIndex >= validImages.length) nextIndex = 0;
                updateLightboxImage(nextIndex);
            }
        });
    }

    // Select all collapsible headers
    const collapsibleHeaders = document.querySelectorAll('.collapsible-header');

    collapsibleHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const content = item.querySelector('.collapsible-content');

            item.classList.toggle('active');

            // Toggle content visibility
            if (item.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";

                const images = content.querySelectorAll('img');
                images.forEach(img => {
                    if (!img.complete) {
                        img.addEventListener('load', () => {
                            if (item.classList.contains('active')) {
                                content.style.maxHeight = content.scrollHeight + "px";
                            }
                        });
                    }
                });
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    // Open the first collapsible item by default
    if (collapsibleHeaders.length > 0) {
        setTimeout(() => {
            collapsibleHeaders[0].click();
        }, 100);
    }
});