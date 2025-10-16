// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        const icon = themeToggle.querySelector('i');
        if (body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });

    // Navbar Scroll Effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Scroll to Top
    const scrollToTop = document.querySelector('.scroll-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTop.classList.add('visible');
        } else {
            scrollToTop.classList.remove('visible');
        }
    });

    scrollToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Property Filter System
    const locationFilter = document.getElementById('location-filter');
    const typeFilter = document.getElementById('type-filter');
    const transactionFilter = document.getElementById('transaction-filter');
    const propertyItems = document.querySelectorAll('.property-item');

    function filterProperties() {
        const location = locationFilter.value;
        const type = typeFilter.value;
        const transaction = transactionFilter.value;

        propertyItems.forEach(item => {
            const itemLocation = item.dataset.location;
            const itemType = item.dataset.type;
            const itemTransaction = item.dataset.transaction;

            const locationMatch = location === 'all' || itemLocation === location;
            const typeMatch = type === 'all' || itemType === type;
            const transactionMatch = transaction === 'all' || itemTransaction === transaction;

            if (locationMatch && typeMatch && transactionMatch) {
                item.style.display = 'block';
                item.classList.add('fade-in');
            } else {
                item.style.display = 'none';
            }
        });
    }

    locationFilter.addEventListener('change', filterProperties);
    typeFilter.addEventListener('change', filterProperties);
    transactionFilter.addEventListener('change', filterProperties);

    // Property Search Functionality
    const searchBox = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');

    searchButton.addEventListener('click', function() {
        const searchTerm = searchBox.value.toLowerCase();
        propertyItems.forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            const location = item.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || location.includes(searchTerm)) {
                item.style.display = 'block';
                item.classList.add('fade-in');
            } else {
                item.style.display = 'none';
            }
        });
    });

    searchBox.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });

    // WhatsApp Integration
    const whatsappButtons = document.querySelectorAll('.whatsapp-btn, .whatsapp-contact');
    const whatsappNumber = '918333957709';

    whatsappButtons.forEach(button => {
        button.addEventListener('click', function() {
            const propertyTitle = this.closest('.property-item')?.querySelector('h3').textContent || 'Property Inquiry';
            const message = `Hello, I'm interested in: ${propertyTitle}`;
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        });
    });

    // Floating WhatsApp Button
    const floatingWhatsapp = document.querySelector('.floating-whatsapp a');
    floatingWhatsapp.href = `https://wa.me/${whatsappNumber}`;

    // Contact Form
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name') || contactForm.querySelector('input[type="text"]').value;
        const email = formData.get('email') || contactForm.querySelector('input[type="email"]').value;
        const phone = formData.get('phone') || contactForm.querySelector('input[type="tel"]').value;
        const message = formData.get('message') || contactForm.querySelector('textarea').value;
        
        // Create WhatsApp message
        const whatsappMessage = `Hello, I'm ${name}. My contact details are: Email: ${email}, Phone: ${phone}. Message: ${message}`;
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
        
        // Open WhatsApp
        window.open(whatsappUrl, '_blank');
        
        // Reset form
        contactForm.reset();
        
        // Show success message
        alert('Thank you for your inquiry! We will contact you soon via WhatsApp.');
    });

    // Property Card Hover Effects
    const propertyCards = document.querySelectorAll('.property-card, .property-item');
    
    propertyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Testimonials Slider
    const testimonials = document.querySelector('.testimonials-slider');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        testimonialCards.forEach(card => card.style.display = 'none');
        testimonialCards[index].style.display = 'block';
    }
    
    // Auto-rotate testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % document.querySelectorAll('.testimonial-card').length;
        showTestimonial(currentTestimonial);
    }, 5000);

    // Initialize first testimonial
    showTestimonial(0);

    // Loading Animation
    window.addEventListener('load', function() {
        const loading = document.querySelector('.loading');
        if (loading) {
            setTimeout(() => {
                loading.classList.add('hidden');
            }, 1000);
        }
    });

    // Add animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Mobile Menu Toggle (for responsive design)
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.navbar .container').appendChild(mobileMenuToggle);

    const navLinks = document.querySelector('.nav-links');
    let mobileMenuOpen = false;

    mobileMenuToggle.addEventListener('click', function() {
        mobileMenuOpen = !mobileMenuOpen;
        if (mobileMenuOpen) {
            navLinks.style.display = 'flex';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.background = 'rgba(0, 0, 0, 0.95)';
            navLinks.style.flexDirection = 'column';
            navLinks.style.padding = '1rem';
            navLinks.style.zIndex = '999';
            mobileMenuToggle.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            navLinks.style.display = 'none';
            mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    // Initialize property data
    const propertyData = {
        'thakur-complex': {
            flats: {
                sale: [
                    { name: '2BHK Apartment', price: '₹2.5 Cr', area: '1200 sqft' },
                    { name: '3BHK Luxury Flat', price: '₹3.8 Cr', area: '1800 sqft' },
                    { name: '1BHK Compact', price: '₹1.2 Cr', area: '650 sqft' },
                    { name: '4BHK Penthouse', price: '₹6.5 Cr', area: '2500 sqft' },
                    { name: '2BHK Garden View', price: '₹2.8 Cr', area: '1350 sqft' }
                ],
                rent: [
                    { name: '1BHK Apartment', price: '₹18,000/month', area: '650 sqft' },
                    { name: '2BHK Furnished', price: '₹35,000/month', area: '1200 sqft' },
                    { name: '3BHK Premium', price: '₹55,000/month', area: '1800 sqft' },
                    { name: '1BHK Studio', price: '₹12,000/month', area: '450 sqft' },
                    { name: '2BHK Pool View', price: '₹42,000/month', area: '1400 sqft' }
                ]
            },
            shops: {
                sale: [
                    { name: 'Commercial Shop', price: '₹1.8 Cr', area: '500 sqft' },
                    { name: 'Retail Space', price: '₹2.5 Cr', area: '800 sqft' },
                    { name: 'Office Space', price: '₹3.2 Cr', area: '1200 sqft' },
                    { name: 'Showroom', price: '₹4.5 Cr', area: '1500 sqft' },
                    { name: 'Food Court Space', price: '₹6.8 Cr', area: '2000 sqft' }
                ],
                rent: [
                    { name: 'Retail Shop', price: '₹25,000/month', area: '300 sqft' },
                    { name: 'Commercial Space', price: '₹40,000/month', area: '600 sqft' },
                    { name: 'Office Space', price: '₹60,000/month', area: '1000 sqft' },
                    { name: 'Showroom', price: '₹80,000/month', area: '1200 sqft' },
                    { name: 'Food Court', price: '₹1,20,000/month', area: '1500 sqft' }
                ]
            }
        },
        'thakur-village': {
            flats: {
                sale: [
                    { name: '2BHK Apartment', price: '₹2.2 Cr', area: '1100 sqft' },
                    { name: '3BHK Premium', price: '₹3.5 Cr', area: '1600 sqft' },
                    { name: '1BHK Compact', price: '₹1.0 Cr', area: '600 sqft' },
                    { name: '4BHK Villa', price: '₹5.8 Cr', area: '2200 sqft' },
                    { name: '2BHK Sea View', price: '₹2.6 Cr', area: '1300 sqft' }
                ],
                rent: [
                    { name: '1BHK Apartment', price: '₹15,000/month', area: '600 sqft' },
                    { name: '2BHK Furnished', price: '₹28,000/month', area: '1100 sqft' },
                    { name: '3BHK Premium', price: '₹45,000/month', area: '1600 sqft' },
                    { name: '1BHK Studio', price: '₹10,000/month', area: '400 sqft' },
                    { name: '2BHK Garden View', price: '₹32,000/month', area: '1200 sqft' }
                ]
            },
            shops: {
                sale: [
                    { name: 'Commercial Shop', price: '₹1.5 Cr', area: '450 sqft' },
                    { name: 'Retail Space', price: '₹2.2 Cr', area: '750 sqft' },
                    { name: 'Office Space', price: '₹2.8 Cr', area: '1000 sqft' },
                    { name: 'Showroom', price: '₹3.8 Cr', area: '1300 sqft' },
                    { name: 'Mall Space', price: '₹5.5 Cr', area: '1800 sqft' }
                ],
                rent: [
                    { name: 'Retail Shop', price: '₹20,000/month', area: '250 sqft' },
                    { name: 'Commercial Space', price: '₹35,000/month', area: '550 sqft' },
                    { name: 'Office Space', price: '₹50,000/month', area: '900 sqft' },
                    { name: 'Showroom', price: '₹65,000/month', area: '1100 sqft' },
                    { name: 'Mall Space', price: '₹95,000/month', area: '1400 sqft' }
                ]
            }
        }
    };

    // Function to generate property listings
    function generatePropertyListings() {
        const propertyGrid = document.querySelector('.property-grid');
        propertyGrid.innerHTML = '';

        // Generate all property items
        Object.keys(propertyData).forEach(location => {
            Object.keys(propertyData[location]).forEach(type => {
                Object.keys(propertyData[location][type]).forEach(transaction => {
                    propertyData[location][type][transaction].forEach((property, index) => {
                        const propertyItem = document.createElement('div');
                        propertyItem.className = 'property-item fade-in';
                        propertyItem.dataset.location = location;
                        propertyItem.dataset.type = type;
                        propertyItem.dataset.transaction = transaction;
                        
                        propertyItem.innerHTML = `
                            <img src="https://via.placeholder.com/300x200" alt="${property.name}">
                            <div class="property-details">
                                <h3>${property.name}</h3>
                                <p>${location === 'thakur-complex' ? 'Thakur Complex, Mumbai' : 'Thakur Village, Mumbai'}</p>
                                <p class="price">${property.price}</p>
                                <p class="area">${property.area}</p>
                                <div class="property-actions">
                                    <button class="btn btn-primary">View Details</button>
                                    <button class="btn whatsapp-btn"><i class="fab fa-whatsapp"></i></button>
                                </div>
                            </div>
                        `;
                        
                        propertyGrid.appendChild(propertyItem);
                    });
                });
            });
        });

        // Re-apply filters
        filterProperties();
    }

    // Generate initial property listings
    generatePropertyListings();

    // Add click handlers to property detail buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-primary') && e.target.closest('.property-item')) {
            const propertyItem = e.target.closest('.property-item');
            const propertyTitle = propertyItem.querySelector('h3').textContent;
            const propertyLocation = propertyItem.querySelector('p').textContent;
            const propertyPrice = propertyItem.querySelector('.price').textContent;
            const propertyArea = propertyItem.querySelector('.area').textContent;
            
            const message = `Property Details:\nName: ${propertyTitle}\nLocation: ${propertyLocation}\nPrice: ${propertyPrice}\nArea: ${propertyArea}`;
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        }
    });

    // Add form validation
    const inputs = document.querySelectorAll('input[required], textarea[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.style.borderColor = '#ff4444';
            } else {
                this.style.borderColor = '#ddd';
            }
        });
    });

    // Add loading animation for form submission
    contactForm.addEventListener('submit', function() {
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });

    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Add intersection observer for animations
    const animatedElements = document.querySelectorAll('.fade-in');
    const animationObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animationObserver.observe(element);
    });

    console.log('Zaver Estate Consultant website loaded successfully!');
});