document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const body = document.body;

    // 1. Navbar scroll effect
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', handleScroll);

    // 2. Smooth Scroll for page links
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // Ignore empty links or footer links
            if (href === '#' || this.closest('.footer-links')) return;

            e.preventDefault();
            const targetElement = document.querySelector(href);
            if (targetElement) {
                // Scroll offset for navbar
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Modals logic (Terms & Privacy)
    const policyLinks = document.querySelectorAll('.footer-links a');
    const closeButtons = document.querySelectorAll('.modal-close');

    // OPEN
    policyLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); 
            const targetId = this.getAttribute('data-target');
            const targetModal = document.getElementById(targetId);

            if (targetModal) {
                targetModal.classList.remove('hidden'); // Remove display: none
                setTimeout(() => {
                    targetModal.classList.add('active');
                }, 10);
                
                body.style.overflow = 'hidden'; // Lock scrolling
            }
        });
    });

    // CLOSE
    closeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const modal = this.closest('.modal-overlay');
            if (modal) {
                modal.classList.remove('active');
                setTimeout(() => {
                    modal.classList.add('hidden');
                }, 300);
                
                body.style.overflow = 'auto'; // Unlock scrolling
            }
        });
    });

    // 4. Dynamic email link for mobile/desktop
    const emailLink = document.getElementById('dynamic-email-link');
    const emailBtn = document.getElementById('dynamic-email-btn');
    const emailAddress = 'contact@2bdigital.group';
    const gmailWeb = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + emailAddress;

    function isMobileDevice() {
        return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
    }

    if (isMobileDevice()) {
        // Mobile: mailto normal
        emailLink.setAttribute('href', `mailto:${emailAddress}`);
        emailBtn.setAttribute('href', `mailto:${emailAddress}`);
        emailLink.removeAttribute('target');
        emailBtn.removeAttribute('target');
    } else {
        // Desktop: Gmail web, open in new tab
        emailLink.setAttribute('href', gmailWeb);
        emailBtn.setAttribute('href', gmailWeb);
        emailLink.setAttribute('target', '_blank');
        emailBtn.setAttribute('target', '_blank');
    }
});
