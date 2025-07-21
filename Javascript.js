// E-Cell SIT Landing Page JavaScript
// Complete interactive functionality with meaningful actions

class LandingPage {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeComponents();
        this.setupScrollEffects();
        this.setupFormHandling();
    }

    setupEventListeners() {
        // Navigation
        this.setupNavigation();
        this.setupMobileMenu();
        this.setupSmoothScrolling();

        // Buttons
        this.setupButtonActions();
        this.setupEventRegistration();

        // Forms
        this.setupContactForm();
        this.setupNewsletterForm();
        this.setupJoinForm();

        // Modals
        this.setupModals();

        // Scroll effects
        this.setupScrollAnimations();
        this.setupBackToTop();

        // Utility
        this.setupNotifications();
        this.setupLoadingStates();
    }

    setupNavigation() {
        const navbar = document.getElementById('navbar');
        const navLinks = document.querySelectorAll('.nav-link');

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Active link highlighting
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });

        // Smooth scroll to sections
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('show');
                
                // Toggle icon
                const icon = mobileMenuBtn.querySelector('i');
                if (mobileMenu.classList.contains('show')) {
                    icon.className = 'fas fa-times text-xl';
                } else {
                    icon.className = 'fas fa-bars text-xl';
                }
            });

            // Close menu when clicking on links
            mobileNavLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('show');
                    const icon = mobileMenuBtn.querySelector('i');
                    icon.className = 'fas fa-bars text-xl';
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                    mobileMenu.classList.remove('show');
                    const icon = mobileMenuBtn.querySelector('i');
                    icon.className = 'fas fa-bars text-xl';
                }
            });
        }
    }

    setupSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupButtonActions() {
        // Learn More button - Opens detailed information modal
        const learnMoreBtn = document.getElementById('learnMoreBtn');
        if (learnMoreBtn) {
            learnMoreBtn.addEventListener('click', () => {
                this.showModal(
                    'About E-Cell SIT',
                    `
                    <div class="space-y-4">
                        <p class="text-gray-600">
                            E-Cell SIT is the premier entrepreneurship cell at Saffrony Institute of Technology, 
                            dedicated to fostering innovation and entrepreneurial spirit among students.
                        </p>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="bg-blue-50 p-4 rounded-lg">
                                <h4 class="font-semibold text-blue-900 mb-2">Our Mission</h4>
                                <p class="text-blue-700 text-sm">
                                    To inspire, educate and empower engineering students to inculcate a culture 
                                    of entrepreneurship and develop skills to solve real world problems.
                                </p>
                            </div>
                            <div class="bg-purple-50 p-4 rounded-lg">
                                <h4 class="font-semibold text-purple-900 mb-2">Our Vision</h4>
                                <p class="text-purple-700 text-sm">
                                    To be a leading E-Cell in Gujarat that fosters innovation and social impact 
                                    through excellence in teaching, research and outreach.
                                </p>
                            </div>
                        </div>
                        <div class="bg-green-50 p-4 rounded-lg">
                            <h4 class="font-semibold text-green-900 mb-2">Key Achievements</h4>
                            <ul class="text-green-700 text-sm space-y-1">
                                <li>• 18th rank in National Entrepreneurship Challenge 2023</li>
                                <li>• Successfully hosted ProTalks with industry CEOs</li>
                                <li>• Multiple teams qualified for IIT Bombay competitions</li>
                                <li>• Conducted LinkedIn optimization sessions</li>
                            </ul>
                        </div>
                    </div>
                    `,
                    'primary'
                );
            });
        }

        // Apply Now button - Opens application form
        const applyNowBtn = document.getElementById('applyNowBtn');
        if (applyNowBtn) {
            applyNowBtn.addEventListener('click', () => {
                this.showApplicationForm();
            });
        }

        // Join Us buttons - Opens membership form
        const joinBtns = document.querySelectorAll('#joinBtn, #mobileJoinBtn');
        joinBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.showJoinForm();
            });
        });

        // Mission & Vision button
        const missionBtn = document.getElementById('missionBtn');
        if (missionBtn) {
            missionBtn.addEventListener('click', () => {
                this.showModal(
                    'Mission & Vision',
                    `
                    <div class="space-y-6">
                        <div class="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg">
                            <h3 class="text-xl font-bold mb-3">Our Mission</h3>
                            <p class="text-blue-100">
                                To inspire, educate and empower engineering students and faculty to inculcate 
                                a culture of entrepreneurship and develop skills to solve real world problems 
                                for a positive change in society.
                            </p>
                        </div>
                        <div class="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-6 rounded-lg">
                            <h3 class="text-xl font-bold mb-3">Our Vision</h3>
                            <p class="text-purple-100">
                                To be a leading E-Cell in Gujarat that fosters innovation and social impact 
                                through excellence in teaching, research and outreach by facilitating best 
                                of class resources & techniques in entrepreneurship.
                            </p>
                        </div>
                        <div class="bg-gradient-to-r from-green-500 to-teal-600 text-white p-6 rounded-lg">
                            <h3 class="text-xl font-bold mb-3">Our Aim</h3>
                            <p class="text-green-100">
                                We aim to nurture the requirements of youthful intellects and their concepts 
                                while actively seeking transformative change. Our goal is to establish an 
                                environment conducive to the acquisition of entrepreneurial knowledge.
                            </p>
                        </div>
                    </div>
                    `,
                    'primary'
                );
            });
        }

        // View All Events button
        const viewAllEventsBtn = document.getElementById('viewAllEventsBtn');
        if (viewAllEventsBtn) {
            viewAllEventsBtn.addEventListener('click', () => {
                this.showModal(
                    'All Events',
                    `
                    <div class="space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="border rounded-lg p-4">
                                <h4 class="font-semibold text-gray-900 mb-2">Startup Workshop</h4>
                                <p class="text-gray-600 text-sm mb-2">Learn startup fundamentals</p>
                                <span class="text-xs text-gray-500">Dec 15, 2024</span>
                            </div>
                            <div class="border rounded-lg p-4">
                                <h4 class="font-semibold text-gray-900 mb-2">Pitch Competition</h4>
                                <p class="text-gray-600 text-sm mb-2">Present your ideas</p>
                                <span class="text-xs text-gray-500">Dec 20, 2024</span>
                            </div>
                            <div class="border rounded-lg p-4">
                                <h4 class="font-semibold text-gray-900 mb-2">Networking Meet</h4>
                                <p class="text-gray-600 text-sm mb-2">Connect with entrepreneurs</p>
                                <span class="text-xs text-gray-500">Dec 25, 2024</span>
                            </div>
                            <div class="border rounded-lg p-4">
                                <h4 class="font-semibold text-gray-900 mb-2">Hackathon</h4>
                                <p class="text-gray-600 text-sm mb-2">Build innovative solutions</p>
                                <span class="text-xs text-gray-500">Jan 5, 2025</span>
                            </div>
                        </div>
                        <div class="text-center">
                            <button class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300" onclick="landingPage.showEventCalendar()">
                                View Calendar
                            </button>
                        </div>
                    </div>
                    `,
                    'primary'
                );
            });
        }

        // Meet Full Team button
        const meetTeamBtn = document.getElementById('meetTeamBtn');
        if (meetTeamBtn) {
            meetTeamBtn.addEventListener('click', () => {
                this.showModal(
                    'Our Complete Team',
                    `
                    <div class="space-y-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="text-center p-4 border rounded-lg">
                                <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                                    <i class="fas fa-user text-white"></i>
                                </div>
                                <h4 class="font-semibold text-gray-900">Dhruv Mavani</h4>
                                <p class="text-blue-600 text-sm">President</p>
                            </div>
                            <div class="text-center p-4 border rounded-lg">
                                <div class="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                                    <i class="fas fa-user text-white"></i>
                                </div>
                                <h4 class="font-semibold text-gray-900">Mihir Joshi</h4>
                                <p class="text-green-600 text-sm">Vice President</p>
                            </div>
                            <div class="text-center p-4 border rounded-lg">
                                <div class="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                                    <i class="fas fa-user text-white"></i>
                                </div>
                                <h4 class="font-semibold text-gray-900">Arnav Patel</h4>
                                <p class="text-orange-600 text-sm">Tech Head</p>
                            </div>
                            <div class="text-center p-4 border rounded-lg">
                                <div class="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                                    <i class="fas fa-user text-white"></i>
                                </div>
                                <h4 class="font-semibold text-gray-900">Astha Sadhu</h4>
                                <p class="text-purple-600 text-sm">Events Head</p>
                            </div>
                        </div>
                        <div class="text-center">
                            <a href="ourteam/team3.html" class="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300 inline-block">
                                View Complete Team
                            </a>
                        </div>
                    </div>
                    `,
                    'primary'
                );
            });
        }
    }

    setupEventRegistration() {
        const eventRegisterBtns = document.querySelectorAll('.event-register-btn');
        
        eventRegisterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const eventName = btn.getAttribute('data-event');
                this.showEventRegistrationForm(eventName);
            });
        });
    }

    setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContactForm(contactForm);
            });
        }
    }

    setupNewsletterForm() {
        const newsletterForm = document.getElementById('newsletterForm');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleNewsletterForm(newsletterForm);
            });
        }
    }

    setupJoinForm() {
        // This will be handled by the modal system
    }

    setupModals() {
        // Modal container already exists in HTML
        const modalContainer = document.getElementById('modalContainer');
        
        // Close modal when clicking outside
        modalContainer.addEventListener('click', (e) => {
            if (e.target === modalContainer) {
                this.closeModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    setupScrollEffects() {
        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
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
    }

    setupScrollAnimations() {
        // Parallax effect for hero section
        const heroSection = document.getElementById('home');
        if (heroSection) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                heroSection.style.transform = `translateY(${rate}px)`;
            });
        }
    }

    setupBackToTop() {
        // Create back to top button
        const backToTopBtn = document.createElement('button');
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        document.body.appendChild(backToTopBtn);

        // Show/hide back to top button
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
    }

    setupNotifications() {
        // Create notification container
        this.notificationContainer = document.createElement('div');
        this.notificationContainer.className = 'fixed top-4 right-4 z-50 space-y-2';
        document.body.appendChild(this.notificationContainer);
    }

    setupLoadingStates() {
        // Loading spinner functionality
        this.loadingSpinner = document.getElementById('loadingSpinner');
    }

    // Modal System
    showModal(title, content, type = 'default') {
        const modalContainer = document.getElementById('modalContainer');
        const modalContent = document.getElementById('modalContent');
        
        const typeClasses = {
            'default': 'bg-white',
            'primary': 'bg-white',
            'success': 'bg-green-50',
            'error': 'bg-red-50'
        };

        modalContent.className = `bg-white rounded-xl p-6 max-w-md w-full mx-4 transform transition-all duration-300 scale-95 opacity-0 ${typeClasses[type] || 'bg-white'}`;
        
        modalContent.innerHTML = `
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-semibold text-gray-900">${title}</h3>
                <button class="text-gray-400 hover:text-gray-600 transition-colors duration-300" onclick="landingPage.closeModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="text-gray-700">
                ${content}
            </div>
        `;
        
        modalContainer.classList.remove('hidden');
        
        // Animate modal in
        setTimeout(() => {
            modalContent.classList.remove('scale-95', 'opacity-0');
            modalContent.classList.add('scale-100', 'opacity-100');
        }, 10);
    }

    closeModal() {
        const modalContainer = document.getElementById('modalContainer');
        const modalContent = document.getElementById('modalContent');
        
        modalContent.classList.add('scale-95', 'opacity-0');
        modalContent.classList.remove('scale-100', 'opacity-100');
        
        setTimeout(() => {
            modalContainer.classList.add('hidden');
        }, 300);
    }

    // Form Handlers
    showApplicationForm() {
        this.showModal(
            'Apply for E-Cell Membership',
            `
            <form id="applicationForm" class="space-y-4">
                <div>
                    <label for="appName" class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input type="text" id="appName" name="name" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300">
                </div>
                <div>
                    <label for="appEmail" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input type="email" id="appEmail" name="email" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300">
                </div>
                <div>
                    <label for="appPhone" class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input type="tel" id="appPhone" name="phone" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300">
                </div>
                <div>
                    <label for="appYear" class="block text-sm font-medium text-gray-700 mb-2">Year of Study</label>
                    <select id="appYear" name="year" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300">
                        <option value="">Select Year</option>
                        <option value="1">1st Year</option>
                        <option value="2">2nd Year</option>
                        <option value="3">3rd Year</option>
                        <option value="4">4th Year</option>
                    </select>
                </div>
                <div>
                    <label for="appBranch" class="block text-sm font-medium text-gray-700 mb-2">Branch</label>
                    <select id="appBranch" name="branch" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300">
                        <option value="">Select Branch</option>
                        <option value="computer">Computer Engineering</option>
                        <option value="it">Information Technology</option>
                        <option value="mechanical">Mechanical Engineering</option>
                        <option value="electrical">Electrical Engineering</option>
                        <option value="civil">Civil Engineering</option>
                    </select>
                </div>
                <div>
                    <label for="appInterest" class="block text-sm font-medium text-gray-700 mb-2">Areas of Interest</label>
                    <textarea id="appInterest" name="interest" rows="3" placeholder="Tell us about your interests in entrepreneurship, technology, or innovation..." class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"></textarea>
                </div>
                <div class="flex gap-4">
                    <button type="submit" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300">
                        <i class="fas fa-paper-plane mr-2"></i>Submit Application
                    </button>
                    <button type="button" onclick="landingPage.closeModal()" class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300">
                        Cancel
                    </button>
                </div>
            </form>
            `,
            'primary'
        );

        // Handle form submission
        setTimeout(() => {
            const applicationForm = document.getElementById('applicationForm');
            if (applicationForm) {
                applicationForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.handleApplicationForm(applicationForm);
                });
            }
        }, 100);
    }

    showJoinForm() {
        this.showModal(
            'Join E-Cell SIT',
            `
            <form id="joinForm" class="space-y-4">
                <div>
                    <label for="joinName" class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input type="text" id="joinName" name="name" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300">
                </div>
                <div>
                    <label for="joinEmail" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input type="email" id="joinEmail" name="email" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300">
                </div>
                <div>
                    <label for="joinPhone" class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input type="tel" id="joinPhone" name="phone" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300">
                </div>
                <div>
                    <label for="joinTeam" class="block text-sm font-medium text-gray-700 mb-2">Preferred Team</label>
                    <select id="joinTeam" name="team" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300">
                        <option value="">Select Team</option>
                        <option value="events">Events Team</option>
                        <option value="tech">Tech Team</option>
                        <option value="marketing">Marketing Team</option>
                        <option value="content">Content Team</option>
                        <option value="design">Design Team</option>
                    </select>
                </div>
                <div>
                    <label for="joinWhy" class="block text-sm font-medium text-gray-700 mb-2">Why do you want to join E-Cell?</label>
                    <textarea id="joinWhy" name="why" rows="3" placeholder="Tell us about your motivation to join E-Cell..." class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"></textarea>
                </div>
                <div class="flex gap-4">
                    <button type="submit" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300">
                        <i class="fas fa-user-plus mr-2"></i>Join Now
                    </button>
                    <button type="button" onclick="landingPage.closeModal()" class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300">
                        Cancel
                    </button>
                </div>
            </form>
            `,
            'primary'
        );

        // Handle form submission
        setTimeout(() => {
            const joinForm = document.getElementById('joinForm');
            if (joinForm) {
                joinForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.handleJoinForm(joinForm);
                });
            }
        }, 100);
    }

    showEventRegistrationForm(eventName) {
        this.showModal(
            `Register for ${eventName}`,
            `
            <form id="eventRegistrationForm" class="space-y-4">
                <div class="bg-blue-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-blue-900 mb-2">Event Details</h4>
                    <p class="text-blue-700 text-sm">You are registering for: <strong>${eventName}</strong></p>
                </div>
                <div>
                    <label for="eventName" class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input type="text" id="eventName" name="name" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300">
                </div>
                <div>
                    <label for="eventEmail" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input type="email" id="eventEmail" name="email" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300">
                </div>
                <div>
                    <label for="eventPhone" class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input type="tel" id="eventPhone" name="phone" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300">
                </div>
                <div>
                    <label for="eventCollege" class="block text-sm font-medium text-gray-700 mb-2">College/Institution</label>
                    <input type="text" id="eventCollege" name="college" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300">
                </div>
                <div>
                    <label for="eventYear" class="block text-sm font-medium text-gray-700 mb-2">Year of Study</label>
                    <select id="eventYear" name="year" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300">
                        <option value="">Select Year</option>
                        <option value="1">1st Year</option>
                        <option value="2">2nd Year</option>
                        <option value="3">3rd Year</option>
                        <option value="4">4th Year</option>
                    </select>
                </div>
                <div class="flex gap-4">
                    <button type="submit" class="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300">
                        <i class="fas fa-check mr-2"></i>Register for Event
                    </button>
                    <button type="button" onclick="landingPage.closeModal()" class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300">
                        Cancel
                    </button>
                </div>
            </form>
            `,
            'primary'
        );

        // Handle form submission
        setTimeout(() => {
            const eventRegistrationForm = document.getElementById('eventRegistrationForm');
            if (eventRegistrationForm) {
                eventRegistrationForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.handleEventRegistrationForm(eventRegistrationForm, eventName);
                });
            }
        }, 100);
    }

    // Form Handlers
    async handleContactForm(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        this.showLoading();
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        this.hideLoading();
        
        // Show success message
        this.showNotification('Message sent successfully! We will get back to you soon.', 'success');
        
        // Reset form
        form.reset();
        this.closeModal();
    }

    async handleNewsletterForm(form) {
        const formData = new FormData(form);
        const email = formData.get('email');
        
        this.showLoading();
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        this.hideLoading();
        
        // Show success message
        this.showNotification('Successfully subscribed to our newsletter!', 'success');
        
        // Reset form
        form.reset();
    }

    async handleApplicationForm(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        this.showLoading();
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2500));
        
        this.hideLoading();
        
        // Show success message
        this.showNotification('Application submitted successfully! We will review and contact you soon.', 'success');
        
        // Reset form and close modal
        form.reset();
        this.closeModal();
    }

    async handleJoinForm(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        this.showLoading();
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        this.hideLoading();
        
        // Show success message
        this.showNotification('Welcome to E-Cell SIT! We will contact you soon with next steps.', 'success');
        
        // Reset form and close modal
        form.reset();
        this.closeModal();
    }

    async handleEventRegistrationForm(form, eventName) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        this.showLoading();
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1800));
        
        this.hideLoading();
        
        // Show success message
        this.showNotification(`Successfully registered for ${eventName}! Check your email for confirmation.`, 'success');
        
        // Reset form and close modal
        form.reset();
        this.closeModal();
    }

    // Utility Methods
    showLoading() {
        if (this.loadingSpinner) {
            this.loadingSpinner.classList.remove('hidden');
        }
    }

    hideLoading() {
        if (this.loadingSpinner) {
            this.loadingSpinner.classList.add('hidden');
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type} transform translate-x-full transition-all duration-300`;
        notification.innerHTML = `
            <div class="flex items-center space-x-3">
                <i class="fas ${this.getNotificationIcon(type)} text-lg"></i>
                <span class="flex-1">${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" class="text-gray-400 hover:text-gray-600">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        this.notificationContainer.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }, 5000);
    }

    getNotificationIcon(type) {
        const icons = {
            'success': 'fa-check-circle text-green-500',
            'error': 'fa-exclamation-circle text-red-500',
            'warning': 'fa-exclamation-triangle text-yellow-500',
            'info': 'fa-info-circle text-blue-500'
        };
        return icons[type] || icons.info;
    }

    showEventCalendar() {
        this.showModal(
            'Event Calendar',
            `
            <div class="space-y-4">
                <div class="grid grid-cols-1 gap-4">
                    <div class="border rounded-lg p-4">
                        <div class="flex justify-between items-center mb-2">
                            <h4 class="font-semibold text-gray-900">Startup Workshop</h4>
                            <span class="text-sm text-gray-500">Dec 15, 2024</span>
                        </div>
                        <p class="text-gray-600 text-sm mb-2">Learn the fundamentals of building a successful startup</p>
                        <span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Workshop</span>
                    </div>
                    <div class="border rounded-lg p-4">
                        <div class="flex justify-between items-center mb-2">
                            <h4 class="font-semibold text-gray-900">Pitch Competition</h4>
                            <span class="text-sm text-gray-500">Dec 20, 2024</span>
                        </div>
                        <p class="text-gray-600 text-sm mb-2">Present your innovative ideas and win prizes</p>
                        <span class="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Competition</span>
                    </div>
                    <div class="border rounded-lg p-4">
                        <div class="flex justify-between items-center mb-2">
                            <h4 class="font-semibold text-gray-900">Networking Meet</h4>
                            <span class="text-sm text-gray-500">Dec 25, 2024</span>
                        </div>
                        <p class="text-gray-600 text-sm mb-2">Connect with successful entrepreneurs</p>
                        <span class="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Networking</span>
                    </div>
                    <div class="border rounded-lg p-4">
                        <div class="flex justify-between items-center mb-2">
                            <h4 class="font-semibold text-gray-900">Hackathon</h4>
                            <span class="text-sm text-gray-500">Jan 5, 2025</span>
                        </div>
                        <p class="text-gray-600 text-sm mb-2">Build innovative solutions in 24 hours</p>
                        <span class="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">Hackathon</span>
                    </div>
                </div>
            </div>
            `,
            'primary'
        );
    }

    initializeComponents() {
        // Initialize any additional components here
        console.log('E-Cell SIT Landing Page initialized successfully!');
    }

    setupFormHandling() {
        // Additional form handling setup
    }
}

// Initialize the landing page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.landingPage = new LandingPage();
});

// Export for global access
window.LandingPage = LandingPage;