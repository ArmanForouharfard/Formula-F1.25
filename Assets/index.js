document.addEventListener('DOMContentLoaded', function() {
            // Mobile menu toggle
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');

            mobileMenuButton.addEventListener('click', function() {
                // Toggle menu visibility
                mobileMenu.classList.toggle('show');
                
                // Change icon based on menu state
                const icon = this.querySelector('i');
                if (mobileMenu.classList.contains('show')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });

            // Close menu when clicking on a link
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('show');
                    mobileMenuButton.querySelector('i').classList.remove('fa-times');
                    mobileMenuButton.querySelector('i').classList.add('fa-bars');
                });
            });

            // Smooth scrolling for navigation links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });

            // Add animation to all cards when they come into view
            const animateElements = document.querySelectorAll('.team-card, .driver-card');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = 1;
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, { threshold: 0.1 });
            
            animateElements.forEach(el => {
                el.style.opacity = 0;
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                observer.observe(el);
            });
            // Slider functionality
            const sliderTrack = document.querySelector('.slider-track');
            const slides = document.querySelectorAll('.slider-slide');
            const prevBtn = document.querySelector('.slider-button.prev');
            const nextBtn = document.querySelector('.slider-button.next');
            const dots = document.querySelectorAll('.dot');
            
            let currentIndex = 0;
            const slideCount = slides.length;
            
            function updateSlider() {
                let slidesToShow = 1;
                if (window.innerWidth >= 1024) {
                    slidesToShow = 3;
                } else if (window.innerWidth >= 768) {
                    slidesToShow = 2;
                }
                
                const slideWidth = 100 / slidesToShow;
                sliderTrack.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
                
                // Update slide widths
                document.querySelectorAll('.slider-slide').forEach(slide => {
                    slide.style.minWidth = `${slideWidth}%`;
                });
                
                // Update dots
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentIndex);
                });
            }
            
            function goToSlide(index) {
                currentIndex = index;
                updateSlider();
            }
            
            function nextSlide() {
                currentIndex = (currentIndex + 1) % slideCount;
                updateSlider();
            }
            
            function prevSlide() {
                currentIndex = (currentIndex - 1 + slideCount) % slideCount;
                updateSlider();
            }
            
            // Event listeners
            nextBtn.addEventListener('click', nextSlide);
            prevBtn.addEventListener('click', prevSlide);
            
            dots.forEach(dot => {
                dot.addEventListener('click', () => {
                    goToSlide(parseInt(dot.dataset.index));
                });
            });
            
            // Responsive adjustments
            window.addEventListener('resize', updateSlider);
            
            // Initialize
            updateSlider();
        });