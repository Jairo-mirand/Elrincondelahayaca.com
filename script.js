document.addEventListener('DOMContentLoaded', function () {

    // ─── Mobile Menu Toggle ───
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('open');
        });
    }

    document.querySelectorAll('.nav-links a').forEach(function (link) {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // ─── Smooth Scroll for Nav Links ───
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ─── Lightbox ───
    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightbox-img');
    var lightboxCounter = document.getElementById('lightbox-counter');
    var currentIndex = 0;
    var galleryImages = [];

    document.querySelectorAll('.gallery-item img').forEach(function (img, index) {
        galleryImages.push(img.src);
        img.addEventListener('click', function () {
            openLightbox(index);
        });
    });

    function openLightbox(index) {
        currentIndex = index;
        lightboxImg.src = galleryImages[currentIndex];
        updateCounter();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        lightboxImg.src = galleryImages[currentIndex];
        updateCounter();
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % galleryImages.length;
        lightboxImg.src = galleryImages[currentIndex];
        updateCounter();
    }

    function updateCounter() {
        if (lightboxCounter) {
            lightboxCounter.textContent = (currentIndex + 1) + ' / ' + galleryImages.length;
        }
    }

    document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    document.querySelector('.lightbox-prev').addEventListener('click', prevImage);
    document.querySelector('.lightbox-next').addEventListener('click', nextImage);

    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', function (e) {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
    });

    // ─── Form Validation & Submission ───
    var form = document.getElementById('contact-form');
    var formSuccess = document.getElementById('form-success');
    var submitBtn = document.getElementById('submit-btn');

    if (form) {
        var formInputs = form.querySelectorAll('.form-input');

        formInputs.forEach(function (input) {
            input.addEventListener('blur', function () {
                validateField(input);
            });
            input.addEventListener('input', function () {
                if (input.classList.contains('error')) {
                    validateField(input);
                }
            });
        });

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var isValid = true;

            formInputs.forEach(function (input) {
                if (!validateField(input)) {
                    isValid = false;
                }
            });

            if (!isValid) return;

            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Enviando...';

            var formData = new FormData(form);

            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            })
            .then(function (response) {
                if (response.ok) {
                    form.reset();
                    form.style.display = 'none';
                    formSuccess.classList.add('visible');
                } else {
                    response.json().then(function (data) {
                        if (Object.hasOwn(data, 'errors')) {
                            alert(data.errors.map(function (error) { return error.message; }).join(', '));
                        } else {
                            alert('Ocurrió un error al enviar el mensaje. Intenta de nuevo.');
                        }
                    });
                }
            })
            .catch(function () {
                alert('Ocurrió un error al enviar el mensaje. Intenta de nuevo.');
            })
            .finally(function () {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensaje';
            });
        });
    }

    function validateField(input) {
        var errorEl = input.parentElement.querySelector('.form-error');
        var value = input.value.trim();
        var isValid = true;

        if (input.hasAttribute('required') && !value) {
            showError(input, errorEl, 'Este campo es obligatorio');
            isValid = false;
        } else if (input.type === 'email' && value && !isValidEmail(value)) {
            showError(input, errorEl, 'Correo electrónico inválido');
            isValid = false;
        } else {
            hideError(input, errorEl);
        }

        return isValid;
    }

    function showError(input, errorEl, message) {
        input.classList.add('error');
        if (errorEl) {
            errorEl.textContent = message;
            errorEl.classList.add('visible');
        }
    }

    function hideError(input, errorEl) {
        input.classList.remove('error');
        if (errorEl) {
            errorEl.classList.remove('visible');
        }
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // ─── Scroll Animations ───
    var fadeElements = document.querySelectorAll('.fade-in');

    if (fadeElements.length) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.15 });

        fadeElements.forEach(function (el) {
            observer.observe(el);
        });
    }

});
