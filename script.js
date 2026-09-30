document.addEventListener('DOMContentLoaded', function () {
    const typingElement = document.getElementById('typing');

    if (typingElement) {
        new Typed('#typing', {
            strings: [
                `const developer = {
    name: 'Divya Patel',
    role: 'Frontend Developer',
    passion: 'Building beautiful web experiences',
    skills: ['HTML', 'CSS', 'JavaScript', 
    'React', 'Bootstrap'],
    focus: 'Clean UI, responsive design,
     and seamless user interactions',

    console.log("Always learning...")
};`
            ],
            typeSpeed: 50,
            backSpeed: 0,
            showCursor: true,
            cursorChar: '|',
            loop: false
        });
    }

    // EmailJS integration
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');

    if (window.emailjs && form && submitBtn) {
        emailjs.init({
            publicKey: 'pbRRyW8HqRpb1YMI9',
        });

        const originalButtonHTML = submitBtn.innerHTML;

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            submitBtn.innerHTML = 'Sending...';
            submitBtn.style.background = '#f59e0b';
            submitBtn.disabled = true;

            emailjs.sendForm(
                'service_ehoqavg',
                'template_s7cs4nq',
                this
            )
                .then(() => {
                    submitBtn.innerHTML = '✓ Message Sent';
                    submitBtn.style.background = '#10b981';
                    form.reset();

                    setTimeout(() => {
                        submitBtn.innerHTML = originalButtonHTML;
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                    }, 2000);
                })
                .catch((error) => {
                    console.log(error);
                    submitBtn.innerHTML = '✗ Failed to Send';
                    submitBtn.style.background = '#ef4444';

                    setTimeout(() => {
                        submitBtn.innerHTML = originalButtonHTML;
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                    }, 2000);
                });
        });
    }

    // Light/dark theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    const rootElement = document.documentElement;
    const storedTheme = localStorage.getItem('theme');
    const preferredTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    const activeTheme = storedTheme || preferredTheme;

    const setTheme = (theme) => {
        rootElement.setAttribute('data-theme', theme);
        if (themeToggle) {
            themeToggle.innerHTML = theme === 'dark' ? '🌙 Dark' : '☀️ Light';
            themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Activate light mode' : 'Activate dark mode');
        }
    };

    setTheme(activeTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const nextTheme = rootElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            setTheme(nextTheme);
            localStorage.setItem('theme', nextTheme);
        });
    }

    // Mobile navigation toggle
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    if (!navToggle || !navLinks) return;

    navToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        const isOpen = navLinks.classList.toggle('open');
        this.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
            navLinks.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });

});