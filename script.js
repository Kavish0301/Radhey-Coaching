// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function () {
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function (event) {
            if (!navMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
                navMenu.classList.remove('active');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll effect to header
    // window.addEventListener('scroll', function () {
    //     const header = document.querySelector('.header');
    //     if (header) {
    //         if (window.scrollY > 100) {
    //             header.style.background = 'rgba(0, 0, 0, 0.95)';
    //             header.style.backdropFilter = 'blur(10px)';
    //         } else {
    //             header.style.background = '#000';
    //             header.style.backdropFilter = 'none';
    //         }
    //     }
    // });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe various elements for animation
    const elementsToAnimate = [
        '.stat-card',
        '.feature-card',
        '.course-card',
        '.value-card',
        '.achievement-card',
        '.faq-item'
    ];

    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    });

    // Add hover effects to buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-2px)';
        });

        button.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const course = formData.get('course');
            const message = formData.get('message');

            // Simple validation
            if (!name || !email || !phone || !course || !message) {
                alert('Please fill in all fields');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }

            // Phone validation
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
                alert('Please enter a valid 10-digit phone number');
                return;
            }

            // Simulate form submission
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert('Thank you for your inquiry! We will contact you soon.');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Course enrollment handling
    document.querySelectorAll('.course-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const courseCard = this.closest('.course-card');
            const courseName = courseCard.querySelector('h3').textContent;

            if (confirm(`Are you interested in enrolling for ${courseName}? We will redirect you to the admission form.`)) {
                // In a real application, this would redirect to an enrollment page
                alert(`Thank you for your interest in ${courseName}! Please contact us at +91 9876543210 for admission details.`);
            }
        });
    });

    // Add loading animation
    window.addEventListener('load', function () {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';

        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Typing effect for hero text
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';

        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Apply typing effect to main heading if on home page
    const heroHeading = document.querySelector('.hero h1');
    if (heroHeading && window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        const originalText = heroHeading.textContent;
        setTimeout(() => {
            typeWriter(heroHeading, originalText, 50);
        }, 1000);
    }

    // Counter animation for achievement numbers
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);

        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start) + (target.toString().includes('+') ? '+' : target.toString().includes('%') ? '%' : '');
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        updateCounter();
    }

    // Animate achievement numbers when they come into view
    const achievementObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numberElement = entry.target;
                const targetText = numberElement.getAttribute('data-target') || numberElement.textContent;
                const targetNumber = parseInt(targetText.replace(/\D/g, ''));

                if (targetNumber) {
                    animateCounter(numberElement, targetText, 2000);
                    achievementObserver.unobserve(numberElement);
                }
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.achievement-number').forEach(element => {
        element.setAttribute('data-target', element.textContent);
        achievementObserver.observe(element);
    });
});

// Utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#ff6600' : '#333'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '1';
    }, 100);

    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add to favorites functionality
function addToFavorites() {
    if (typeof (Storage) !== "undefined") {
        localStorage.setItem('radheyCoachingFavorite', 'true');
        showNotification('Added to favorites!', 'success');
    }
}

// Search functionality (basic implementation)
function searchContent(query) {
    const searchableElements = document.querySelectorAll('h1, h2, h3, h4, p, li');
    const results = [];

    searchableElements.forEach(element => {
        if (element.textContent.toLowerCase().includes(query.toLowerCase())) {
            results.push({
                element: element,
                text: element.textContent,
                type: element.tagName
            });
        }
    });

    return results;
}
document.addEventListener("DOMContentLoaded", () => {
    // Theme Switcher Functionality
    const themeToggleBtn = document.getElementById("themeToggleBtn")
    const themeOptions = document.getElementById("themeOptions")
    const themeButtons = document.querySelectorAll(".theme-option")

    // Load saved theme or default to orange
    const savedTheme = localStorage.getItem("selectedTheme") || "orange"
    document.documentElement.setAttribute("data-theme", savedTheme)

    // Update active theme button
    themeButtons.forEach((btn) => {
        btn.classList.remove("active")
        if (btn.getAttribute("data-theme") === savedTheme) {
            btn.classList.add("active")
        }
    })

    // Toggle theme options visibility
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", (e) => {
            e.stopPropagation()
            themeOptions.classList.toggle("active")
        })
    }

    // Close theme options when clicking outside
    document.addEventListener("click", (event) => {
        if (themeOptions && !themeOptions.contains(event.target) && !themeToggleBtn.contains(event.target)) {
            themeOptions.classList.remove("active")
        }
    })

    // Theme selection
    themeButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const selectedTheme = this.getAttribute("data-theme")

            // Update document theme
            document.documentElement.setAttribute("data-theme", selectedTheme)

            // Save to localStorage
            localStorage.setItem("selectedTheme", selectedTheme)

            // Update active button
            themeButtons.forEach((btn) => btn.classList.remove("active"))
            this.classList.add("active")

            // Close theme options
            themeOptions.classList.remove("active")

            // Show notification
            showThemeNotification(selectedTheme)
        })
    })

    // Show theme change notification
    function showThemeNotification(theme) {
        const themeNames = {
            orange: "Orange",
            blue: "Blue",
            green: "Green",
            purple: "Purple",
            red: "Red",
            black: "Black",
        }

        showNotification(`Theme changed to ${themeNames[theme]}!`, "success")
    }

    // Notification handling
    const notificationContainer = document.getElementById("notification-container")

    function showNotification(message, type = "info") {
        const notification = document.createElement("div")
        notification.classList.add("notification", type)
        notification.textContent = message

        notificationContainer.appendChild(notification)

        // Remove the notification after a few seconds
        setTimeout(() => {
            notification.remove()
        }, 3000)
    }

    // Example usage (you can trigger notifications from other parts of your code)
    // showNotification('Welcome to the page!', 'success');
    // showNotification('An error occurred.', 'error');
    // showNotification('Information update.', 'info');
})

