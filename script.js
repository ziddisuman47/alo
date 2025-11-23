// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navLinks.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);

            if (!isClickInsideNav && !isClickOnToggle && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    }

    // Copy UPI ID functionality
    const copyBtn = document.getElementById('copyBtn');
    const upiId = document.getElementById('upiId');

    if (copyBtn && upiId) {
        copyBtn.addEventListener('click', function() {
            const upiText = upiId.textContent;

            // Try to use the modern clipboard API
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(upiText).then(function() {
                    showCopyFeedback();
                }).catch(function() {
                    fallbackCopyText(upiText);
                });
            } else {
                fallbackCopyText(upiText);
            }
        });
    }

    function showCopyFeedback() {
        const copyBtn = document.getElementById('copyBtn');
        const originalHTML = copyBtn.innerHTML;

        // Show checkmark
        copyBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>';
        copyBtn.style.color = '#48bb78';
        copyBtn.style.borderColor = '#48bb78';

        // Show alert
        showAlert('UPI ID copied!', 'You can now paste it in your payment app.');

        // Reset after 2 seconds
        setTimeout(function() {
            copyBtn.innerHTML = originalHTML;
            copyBtn.style.color = '';
            copyBtn.style.borderColor = '';
        }, 2000);
    }

    function fallbackCopyText(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();

        try {
            document.execCommand('copy');
            showCopyFeedback();
        } catch (err) {
            showAlert('Copy failed', 'Please copy the UPI ID manually: ' + text);
        }

        document.body.removeChild(textArea);
    }

    function showAlert(title, message) {
        // Create a simple alert div
        const alertDiv = document.createElement('div');
        alertDiv.style.cssText = 'position: fixed; top: 20px; right: 20px; background-color: #48bb78; color: white; padding: 1rem 1.5rem; border-radius: 0.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.15); z-index: 10000; max-width: 300px;';
        alertDiv.innerHTML = '<strong style="display: block; margin-bottom: 0.25rem;">' + title + '</strong><span style="font-size: 0.875rem;">' + message + '</span>';

        document.body.appendChild(alertDiv);

        // Remove after 3 seconds
        setTimeout(function() {
            alertDiv.style.opacity = '0';
            alertDiv.style.transition = 'opacity 0.3s';
            setTimeout(function() {
                document.body.removeChild(alertDiv);
            }, 300);
        }, 3000);
    }

    // Contact form handling
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Log to console (in a real app, this would send to a server)
            console.log('Contact form submitted:', { name: name, email: email, message: message });

            // Show success message
            showAlert('Message Sent!', 'Thank you for reaching out. We\'ll get back to you soon.');

            // Reset form
            contactForm.reset();
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Only prevent default if it's not just "#"
            if (href !== '#') {
                e.preventDefault();

                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Add active state to navigation based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

    function highlightNavigation() {
        let scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === '#' + sectionId) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    // Only add scroll listener if we're on a page with sections
    if (sections.length > 0) {
        window.addEventListener('scroll', highlightNavigation);
    }
});
