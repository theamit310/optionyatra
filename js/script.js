// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initHeroChart();
    initPerformanceChart();
    initForms();
    initNewsletterPopup();
    initScrollAnimations();
    initMarketTicker();
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
}

// Hero chart initialization
function initHeroChart() {
    const ctx = document.getElementById('heroChart');
    if (!ctx) return;

    // Sample data for candlestick-like visualization
    const data = {
        labels: ['9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '1:00', '1:30', '2:00', '2:30', '3:00', '3:30'],
        datasets: [{
            label: 'NIFTY',
            data: [19800, 19820, 19810, 19850, 19840, 19860, 19870, 19855, 19880, 19875, 19890, 19885, 19900],
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#10b981',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    titleColor: '#1f2937',
                    bodyColor: '#1f2937',
                    borderColor: '#e5e7eb',
                    borderWidth: 1,
                    cornerRadius: 8,
                    displayColors: false
                }
            },
            scales: {
                x: {
                    display: true,
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)',
                        font: {
                            size: 11
                        }
                    }
                },
                y: {
                    display: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)',
                        font: {
                            size: 11
                        },
                        callback: function(value) {
                            return value.toLocaleString('en-IN');
                        }
                    }
                }
            },
            elements: {
                point: {
                    hoverBackgroundColor: '#10b981'
                }
            }
        }
    };

    new Chart(ctx, config);
}

// Performance chart initialization
function initPerformanceChart() {
    const ctx = document.getElementById('performanceChart');
    if (!ctx) return;

    // Set canvas size explicitly
    ctx.width = ctx.parentElement.clientWidth;
    ctx.height = 280;

    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Monthly Returns (%)',
            data: [4.2, 2.8, 6.1, 3.5, 5.2, 4.8, 3.9, 5.7, 4.3, 6.2, 3.8, 5.1],
            backgroundColor: function(context) {
                const value = context.parsed.y;
                return value >= 0 ? '#10b981' : '#ef4444';
            },
            borderColor: function(context) {
                const value = context.parsed.y;
                return value >= 0 ? '#059669' : '#dc2626';
            },
            borderWidth: 1,
            borderRadius: 4,
            borderSkipped: false,
        }]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: {
                    top: 10,
                    bottom: 10
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    titleColor: '#1f2937',
                    bodyColor: '#1f2937',
                    borderColor: '#e5e7eb',
                    borderWidth: 1,
                    cornerRadius: 6,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return `Returns: ${context.parsed.y}%`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#6b7280',
                        font: {
                            size: 11
                        }
                    }
                },
                y: {
                    grid: {
                        color: '#f3f4f6',
                        lineWidth: 1
                    },
                    ticks: {
                        color: '#6b7280',
                        font: {
                            size: 11
                        },
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    };

    new Chart(ctx, config);
}

// Form handling
function initForms() {
    // Free signup form
    const freeSignupForm = document.getElementById('freeSignupForm');
    if (freeSignupForm) {
        freeSignupForm.addEventListener('submit', handleFreeSignup);
    }

    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSignup);
    }

    // Service subscription buttons
    const subscribeButtons = document.querySelectorAll('.service-card button');
    subscribeButtons.forEach(button => {
        button.addEventListener('click', handleSubscription);
    });
}

// Handle free signup form submission
function handleFreeSignup(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
        name: formData.get('fullName'),
        email: formData.get('email'),
        whatsapp: formData.get('whatsapp')
    };

    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<div class="loading"></div> Processing...';
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        // Show success message
        showNotification('Success! You will receive free tips on your WhatsApp soon.', 'success');
        
        // Reset form
        e.target.reset();
        
        // Redirect to WhatsApp
        const whatsappMessage = `Hi! I just signed up for free tips. My details: Name: ${data.name}, Email: ${data.email}`;
        const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, '_blank');
    }, 2000);
}

// Handle contact form submission
function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };

    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<div class="loading"></div> Sending...';
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        // Show success message
        showNotification('Thank you for your message! We will get back to you within 24 hours.', 'success');
        
        // Reset form
        e.target.reset();
    }, 2000);
}

// Handle newsletter signup
function handleNewsletterSignup(e) {
    e.preventDefault();
    
    const email = e.target.querySelector('input[type="email"]').value;
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<div class="loading"></div>';
    submitBtn.disabled = true;

    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        showNotification('Successfully subscribed to our newsletter!', 'success');
        closeNewsletterPopup();
        e.target.reset();
    }, 1500);
}

// Handle subscription
function handleSubscription(e) {
    const card = e.target.closest('.service-card');
    const planName = card.querySelector('.plan-name').textContent;
    const price = card.querySelector('.price').textContent;
    
    // Show subscription modal or redirect to payment
    showNotification(`Redirecting to subscription page for ${planName}...`, 'info');
    
    // In a real application, this would redirect to a payment gateway
    setTimeout(() => {
        const whatsappMessage = `Hi! I'm interested in subscribing to the ${planName} (${price}/month). Please provide more details.`;
        const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, '_blank');
    }, 1000);
}

// Newsletter popup functionality
function initNewsletterPopup() {
    const popup = document.getElementById('newsletterPopup');
    const closeBtn = document.getElementById('popupClose');
    
    // Show popup after 30 seconds
    setTimeout(() => {
        if (!localStorage.getItem('newsletterPopupShown')) {
            showNewsletterPopup();
        }
    }, 30000);

    // Close popup
    if (closeBtn) {
        closeBtn.addEventListener('click', closeNewsletterPopup);
    }

    // Close popup when clicking outside
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            closeNewsletterPopup();
        }
    });
}

function showNewsletterPopup() {
    const popup = document.getElementById('newsletterPopup');
    popup.classList.add('active');
    localStorage.setItem('newsletterPopupShown', 'true');
}

function closeNewsletterPopup() {
    const popup = document.getElementById('newsletterPopup');
    popup.classList.remove('active');
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-item, .service-card, .testimonial-card, .stat-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Market ticker animation
function initMarketTicker() {
    const tickerContent = document.getElementById('ticker-content');
    if (!tickerContent) return;

    // Update ticker data periodically
    setInterval(() => {
        updateTickerData();
    }, 10000); // Update every 10 seconds
}

function updateTickerData() {
    const tickerItems = document.querySelectorAll('.ticker-item .price');
    
    tickerItems.forEach(item => {
        const currentValue = parseFloat(item.textContent.match(/[\d,]+\.?\d*/)[0].replace(',', ''));
        const change = (Math.random() - 0.5) * 2; // Random change between -1 and 1
        const newValue = currentValue + change;
        const percentage = ((change / currentValue) * 100).toFixed(1);
        
        // Update the display
        const isPositive = change >= 0;
        item.className = `price ${isPositive ? 'positive' : 'negative'}`;
        item.textContent = `${newValue.toLocaleString('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })} (${isPositive ? '+' : ''}${percentage}%)`;
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        padding: 16px;
        z-index: 10001;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        border-left: 4px solid ${getNotificationColor(type)};
    `;

    // Add to DOM
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);

    // Add close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => removeNotification(notification));
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || icons.info;
}

function getNotificationColor(type) {
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    return colors[type] || colors.info;
}

// Utility functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[+]?[\d\s-()]{10,}$/;
    return re.test(phone);
}

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add smooth scroll behavior for browsers that don't support it
function smoothScrollTo(element, target, duration) {
    let start = element.scrollTop;
    let change = target - start;
    let currentTime = 0;
    let increment = 20;

    function animateScroll() {
        currentTime += increment;
        let val = Math.easeInOutQuad(currentTime, start, change, duration);
        element.scrollTop = val;
        if (currentTime < duration) {
            setTimeout(animateScroll, increment);
        }
    }
    animateScroll();
}

// Easing function for smooth scrolling
Math.easeInOutQuad = function (t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
};

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden, pause animations
        document.body.classList.add('page-hidden');
    } else {
        // Page is visible, resume animations
        document.body.classList.remove('page-hidden');
    }
});

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLazyLoading);
} else {
    initLazyLoading();
}

// Service Worker registration for offline functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Analytics tracking (placeholder)
function trackEvent(action, category = 'User Interaction', label = '') {
    // In a real application, this would send data to Google Analytics or similar
    console.log('Track Event:', { action, category, label });
}

// Add click tracking to important elements
document.addEventListener('click', (e) => {
    if (e.target.matches('.btn-primary')) {
        trackEvent('Click', 'Button', 'Primary CTA');
    }
    if (e.target.matches('.whatsapp-btn')) {
        trackEvent('Click', 'WhatsApp', 'Float Button');
    }
    if (e.target.matches('.nav-link')) {
        trackEvent('Click', 'Navigation', e.target.textContent);
    }
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    // In production, you might want to send this to an error tracking service
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
    e.preventDefault();
});
