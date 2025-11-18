// JavaScript for Carousel Functionality using Vanilla JS

let currentSlide = 0;
        const totalSlides = 3;

        function moveCarousel(direction) {
            currentSlide += direction;
            if (currentSlide < 0) currentSlide = totalSlides - 1;
            if (currentSlide >= totalSlides) currentSlide = 0;
            updateCarousel();
        }

        function goToSlide(index) {
            currentSlide = index;
            updateCarousel();
        }

        function updateCarousel() {
            const inner = document.getElementById('carouselInner');
            inner.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            const dots = document.querySelectorAll('.carousel-dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }

        // Auto-advance carousel every 4 seconds
        setInterval(() => moveCarousel(1), 4000);