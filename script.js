document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menü fonksiyonalitesi
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('.nav-menu li a');
    const overlay = document.querySelector('.menu-overlay');
    const closeMenu = document.querySelector('.close-menu');
    const header = document.querySelector('header');

    // Menü açma/kapama fonksiyonu
    function toggleMenu(open = null) {
        if (open === null) {
            hamburgerMenu.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        } else if (open) {
            hamburgerMenu.classList.add('active');
            nav.classList.add('active');
            document.body.classList.add('menu-open');
        } else {
            hamburgerMenu.classList.remove('active');
            nav.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    }

    hamburgerMenu.addEventListener('click', function() {
        toggleMenu();
    });

    // Kapat butonuna tıklandığında menüyü kapat
    closeMenu.addEventListener('click', function() {
        toggleMenu(false);
    });

    // Overlay'e tıklandığında menüyü kapat
    overlay.addEventListener('click', function() {
        toggleMenu(false);
    });

    // Mobil menüdeki linklere tıklanınca menüyü kapat
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            toggleMenu(false);
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            header.classList.add('scrolled');
        } else {
            header.style.background = 'var(--white)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            header.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Header yüksekliğini dinamik olarak al
                const headerHeight = header.offsetHeight;
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact form validation and submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            let isValid = true;
            
            if (nameInput.value.trim() === '') {
                isValid = false;
                showError(nameInput, 'Name is required');
            } else {
                removeError(nameInput);
            }
            
            if (emailInput.value.trim() === '') {
                isValid = false;
                showError(emailInput, 'Email is required');
            } else if (!isValidEmail(emailInput.value)) {
                isValid = false;
                showError(emailInput, 'Please enter a valid email');
            } else {
                removeError(emailInput);
            }
            
            if (messageInput.value.trim() === '') {
                isValid = false;
                showError(messageInput, 'Message is required');
            } else {
                removeError(messageInput);
            }
            
            if (isValid) {
                // In a real application, you would send the form data to a server
                alert('Message sent successfully! (This is a demo)');
                contactForm.reset();
            }
        });
    }

    // Helper function to validate email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Helper function to show error message
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
        
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.color = 'red';
        errorElement.style.fontSize = '0.8rem';
        errorElement.style.marginTop = '5px';
        
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(errorElement);
        }
        
        input.style.borderColor = 'red';
    }

    // Helper function to remove error message
    function removeError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            formGroup.removeChild(errorElement);
        }
        
        input.style.borderColor = '#ddd';
    }

    // Animate elements when they come into view
    const animateElements = document.querySelectorAll('.skill-card, .project-card, .section-title, .timeline-item, .education-item, .cert-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    document.addEventListener('scroll', function() {
        document.querySelectorAll('.animate').forEach(element => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    });

    // Stagger timeline items animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.transitionDelay = `${0.2 * index}s`;
    });

    // Stagger certificate items animation
    const certItems = document.querySelectorAll('.cert-item');
    certItems.forEach((item, index) => {
        item.style.transitionDelay = `${0.1 * index}s`;
    });

    // Mobil görünümde hero bölümü ayarlaması
    function adjustHeroSection() {
        const hero = document.querySelector('.hero');
        const header = document.querySelector('header');
        const profileImage = document.querySelector('.profile-image');
        const heroContent = document.querySelector('.hero-content');
        const headerHeight = header.offsetHeight;
        
        if (window.innerWidth <= 768) {
            // Header yüksekliğini al ve hero'ya padding-top olarak ayarla
            hero.style.paddingTop = (headerHeight + 20) + 'px';
            
            // Profil resmini ortala
            profileImage.style.margin = '0 auto 30px';
            profileImage.style.left = '0';
            profileImage.style.right = '0';
            
            // Hero içeriğini ortala
            heroContent.style.alignItems = 'center';
            heroContent.style.justifyContent = 'center';
        } else {
            // Masaüstü için varsayılan padding
            hero.style.paddingTop = '80px';
            profileImage.style.margin = '0 30px 0 0';
            heroContent.style.alignItems = 'center';
            heroContent.style.justifyContent = 'flex-start';
        }
    }
    
    // Sayfa yüklendiğinde ve pencere boyutu değiştiğinde hero bölümünü ayarla
    adjustHeroSection();
    window.addEventListener('resize', adjustHeroSection);
    
    // Scroll işlemi sırasında da hero bölümünü ayarla
    window.addEventListener('scroll', function() {
        if (window.innerWidth <= 768) {
            adjustHeroSection();
        }
    });

    // Sayfa yüklendiğinde ekstra kontrol - mobil cihazlarda ortalamanın garanti olması için
    window.addEventListener('load', function() {
        if (window.innerWidth <= 768) {
            // Hero bölümü
            const profileImage = document.querySelector('.profile-image');
            profileImage.style.margin = '0 auto 30px';
            profileImage.style.left = '0';
            profileImage.style.right = '0';
            
            const container = document.querySelector('.hero .container');
            container.style.display = 'flex';
            container.style.justifyContent = 'center';
            container.style.alignItems = 'center';
            
            // Tüm container'ları ortala
            const allContainers = document.querySelectorAll('.container');
            allContainers.forEach(container => {
                if (!container.closest('header')) {
                    container.style.display = 'flex';
                    container.style.flexDirection = 'column';
                    container.style.alignItems = 'center';
                    container.style.justifyContent = 'center';
                    container.style.textAlign = 'center';
                }
            });
            
            // Tüm kartları ortala
            const allCards = document.querySelectorAll('.skill-card, .project-card, .cert-item, .education-item');
            allCards.forEach(card => {
                card.style.margin = '0 auto 20px';
                card.style.maxWidth = '320px';
                card.style.width = '100%';
            });
            
            // About section
            const aboutImage = document.querySelector('.about-image');
            if (aboutImage) {
                aboutImage.style.margin = '0 auto 30px';
                aboutImage.style.maxWidth = '80%';
            }
            
            // Skills section
            const skillsContainer = document.querySelector('.skills-container');
            if (skillsContainer) {
                skillsContainer.style.display = 'flex';
                skillsContainer.style.flexDirection = 'column';
                skillsContainer.style.alignItems = 'center';
            }
            
            // Projects section
            const projectsGrid = document.querySelector('.projects-grid');
            if (projectsGrid) {
                projectsGrid.style.display = 'flex';
                projectsGrid.style.flexDirection = 'column';
                projectsGrid.style.alignItems = 'center';
            }
            
            // Education section
            const educationContainer = document.querySelector('.education-container');
            if (educationContainer) {
                educationContainer.style.display = 'flex';
                educationContainer.style.flexDirection = 'column';
                educationContainer.style.alignItems = 'center';
            }
            
            // Contact section
            const contactContainer = document.querySelector('.contact-container');
            if (contactContainer) {
                contactContainer.style.flexDirection = 'column';
                contactContainer.style.alignItems = 'center';
            }
        }
    });
}); 