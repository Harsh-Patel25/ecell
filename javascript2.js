// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initNavigation();
    initMobileMenu();
    initDropdowns();
    initSmoothScrolling();
    initButtonActions();
    initScrollEffects();
    initModals();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Active link highlighting
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuButton = document.querySelector('.navbar-toggler');
    const mobileMenu = document.querySelector('.navbar-collapse');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            // Toggle mobile menu visibility
            mobileMenu.classList.toggle('show');
            
            // Toggle button icon
            const icon = this.querySelector('.navbar-toggler-icon');
            if (mobileMenu.classList.contains('show')) {
                icon.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                icon.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
        
        // Close mobile menu when clicking on a link
        const mobileNavLinks = mobileMenu.querySelectorAll('.nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('show');
                const icon = mobileMenuButton.querySelector('.navbar-toggler-icon');
                icon.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.remove('show');
                const icon = mobileMenuButton.querySelector('.navbar-toggler-icon');
                icon.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
}

// Dropdown functionality
function initDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        
        if (dropdownToggle && dropdownMenu) {
            // Toggle dropdown on click
            dropdownToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Close other dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.querySelector('.dropdown-menu')?.classList.remove('show');
                    }
                });
                
                // Toggle current dropdown
                dropdownMenu.classList.toggle('show');
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', function(e) {
                if (!dropdown.contains(e.target)) {
                    dropdownMenu.classList.remove('show');
                }
            });
        }
    });
}

// Smooth scrolling functionality
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Button actions functionality
function initButtonActions() {
    // Hero section buttons
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const buttonText = this.textContent.trim();
            
            if (buttonText.includes('Learn More')) {
                // Scroll to about section
                const aboutSection = document.querySelector('#about');
                if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: 'smooth' });
                }
            } else if (buttonText.includes('Our Events')) {
                // Navigate to events page
                window.location.href = 'event/event.html';
            }
        });
    });
    
    // Create Ecellone button
    const createButton = document.querySelector('.btn-primary');
    if (createButton && createButton.textContent.includes('Create Ecellone')) {
        createButton.addEventListener('click', function(e) {
            e.preventDefault();
            // Show modal or redirect to creation page
            showModal('Create Ecellone', 'This feature will allow you to create your own E-Cell. Coming soon!');
        });
    }
    
    // Get in Touch button
    const contactButton = document.querySelector('a[href="#contact"]');
    if (contactButton) {
        contactButton.addEventListener('click', function(e) {
            e.preventDefault();
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// Scroll effects functionality
function initScrollEffects() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Modal functionality
function initModals() {
    // Create modal container if it doesn't exist
    let modalContainer = document.getElementById('modal-container');
    if (!modalContainer) {
        modalContainer = document.createElement('div');
        modalContainer.id = 'modal-container';
        modalContainer.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden';
        document.body.appendChild(modalContainer);
    }
    
    // Close modal when clicking outside
    modalContainer.addEventListener('click', function(e) {
        if (e.target === modalContainer) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Show modal function
function showModal(title, content) {
    const modalContainer = document.getElementById('modal-container');
    
    modalContainer.innerHTML = `
        <div class="bg-white rounded-xl p-6 max-w-md w-full mx-4 transform transition-all duration-300 scale-95 opacity-0">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-semibold text-gray-900">${title}</h3>
                <button class="text-gray-400 hover:text-gray-600 transition-colors duration-300" onclick="closeModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <p class="text-gray-600 mb-6">${content}</p>
            <div class="flex justify-end">
                <button class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300" onclick="closeModal()">
                    Close
                </button>
            </div>
        </div>
    `;
    
    modalContainer.classList.remove('hidden');
    
    // Animate modal in
    setTimeout(() => {
        const modalContent = modalContainer.querySelector('div');
        modalContent.classList.remove('scale-95', 'opacity-0');
        modalContent.classList.add('scale-100', 'opacity-100');
    }, 10);
}

// Close modal function
function closeModal() {
    const modalContainer = document.getElementById('modal-container');
    if (modalContainer) {
        const modalContent = modalContainer.querySelector('div');
        modalContent.classList.add('scale-95', 'opacity-0');
        modalContent.classList.remove('scale-100', 'opacity-100');
        
        setTimeout(() => {
            modalContainer.classList.add('hidden');
        }, 300);
    }
}

// Utility functions
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add loading states to buttons
function addLoadingState(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Loading...';
    button.disabled = true;
    
    return function() {
        button.innerHTML = originalText;
        button.disabled = false;
    };
}

// Form validation (if forms are added later)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('border-red-500');
            isValid = false;
        } else {
            input.classList.remove('border-red-500');
        }
    });
    
    return isValid;
}

// Export functions for global access
window.showModal = showModal;
window.closeModal = closeModal;
window.addLoadingState = addLoadingState;
window.validateForm = validateForm;