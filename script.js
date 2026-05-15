document.addEventListener('DOMContentLoaded', function () {

    // ─── Navbar Scroll Effect ───
    var navbar = document.getElementById('navbar');
    var heroBg = document.getElementById('heroBg');

    function handleNavbar() {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbar, { passive: true });
    handleNavbar();

    // ─── Hero Parallax ───
    function handleParallax() {
        if (heroBg) {
            var offset = window.scrollY * 0.35;
            heroBg.style.transform = 'translateY(' + offset + 'px)';
        }
    }

    window.addEventListener('scroll', handleParallax, { passive: true });

    // ─── Typewriter Effect ───
    var typewriterEl = document.getElementById('typewriter');
    if (typewriterEl) {
        var text = '"Sabor tradicional hecho con amor en casa, directamente a tu mesa."';
        var charIndex = 0;

        function typeChar() {
            if (charIndex < text.length) {
                typewriterEl.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, 45);
            }
        }

        setTimeout(typeChar, 1200);
    }

    // ─── Counter Animation (Years) ───
    var yearsCounter = document.getElementById('yearsCounter');
    if (yearsCounter) {
        var counterAnimated = false;

        var counterObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting && !counterAnimated) {
                    counterAnimated = true;
                    var target = 10;
                    var current = 0;
                    var step = Math.ceil(target / 40);

                    var interval = setInterval(function () {
                        current += step;
                        if (current >= target) {
                            current = target;
                            clearInterval(interval);
                        }
                        yearsCounter.textContent = current + '+';
                    }, 40);
                }
            });
        }, { threshold: 0.5 });

        counterObserver.observe(yearsCounter);
    }

    // ─── Mobile Menu Toggle ───
    var hamburger = document.getElementById('hamburger');
    var navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('open');
            document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
        });
    }

    document.querySelectorAll('.nav-links a').forEach(function (link) {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // ─── Smooth Scroll for Nav Links ───
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                var offset = 80;
                var targetPos = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: targetPos, behavior: 'smooth' });
            }
        });
    });

    // ─── Ripple Effect ───
    document.querySelectorAll('.ripple-btn').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            var rect = btn.getBoundingClientRect();
            var ripple = document.createElement('span');
            ripple.className = 'ripple';
            var size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            btn.appendChild(ripple);
            ripple.addEventListener('animationend', function () { ripple.remove(); });
        });
    });

    // ─── 3D Tilt Effect ───
    document.querySelectorAll('.tilt-card').forEach(function (card) {
        card.addEventListener('mousemove', function (e) {
            var rect = card.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            var centerX = rect.width / 2;
            var centerY = rect.height / 2;
            var rotateX = ((y - centerY) / centerY) * -8;
            var rotateY = ((x - centerX) / centerX) * 8;
            card.style.transform = 'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale3d(1.02, 1.02, 1.02)';
        });

        card.addEventListener('mouseleave', function () {
            card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });

    // ─── Reading Progress Bar ───
    var progressBar = document.getElementById('progressBar');

    function updateProgress() {
        if (progressBar) {
            var scrollTop = window.scrollY;
            var docHeight = document.documentElement.scrollHeight - window.innerHeight;
            var progress = (scrollTop / docHeight) * 100;
            progressBar.style.width = progress + '%';
        }
    }

    window.addEventListener('scroll', updateProgress, { passive: true });

    // ─── Back to Top ───
    var backToTop = document.getElementById('backToTop');

    function handleBackToTop() {
        if (backToTop) {
            if (window.scrollY > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
    }

    window.addEventListener('scroll', handleBackToTop, { passive: true });

    if (backToTop) {
        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ─── Scroll Reveal with Stagger ───
    var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var delay = parseInt(entry.target.getAttribute('data-delay')) || 0;
                setTimeout(function () {
                    entry.target.classList.add('visible');
                }, delay);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(function (el) {
        revealObserver.observe(el);
    });

    // Also observe product-card and gallery-item that have .reveal but may not have been caught
    document.querySelectorAll('.product-card.reveal, .gallery-item.reveal').forEach(function (el) {
        revealObserver.observe(el);
    });

    // ─── Lightbox ───
    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightbox-img');
    var lightboxCounter = document.getElementById('lightbox-counter');
    var currentIndex = 0;
    var galleryImages = [];

    document.querySelectorAll('.gallery-item:not(.gallery-video)').forEach(function (item, index) {
        var img = item.querySelector('img');
        if (img) {
            galleryImages.push(img.src);
            item.addEventListener('click', function () {
                openLightbox(index);
            });
        }
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

    // ─── Lightbox Swipe Support ───
    var touchStartX = 0;
    var touchEndX = 0;

    lightbox.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', function (e) {
        touchEndX = e.changedTouches[0].screenX;
        var diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) nextImage();
            else prevImage();
        }
    }, { passive: true });

    // ─── Video Modal ───
    var videoModal = document.getElementById('videoModal');
    var videoFrame = document.getElementById('videoFrame');
    var videoModalClose = document.getElementById('videoModalClose');

    document.querySelector('.gallery-video')?.addEventListener('click', function () {
        videoFrame.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    if (videoModalClose) {
        videoModalClose.addEventListener('click', closeVideoModal);
    }

    videoModal?.addEventListener('click', function (e) {
        if (e.target === videoModal) closeVideoModal();
    });

    document.addEventListener('keydown', function (e) {
        if (videoModal?.classList.contains('active') && e.key === 'Escape') closeVideoModal();
    });

    function closeVideoModal() {
        videoModal.classList.remove('active');
        videoFrame.src = '';
        document.body.style.overflow = '';
    }

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

});
