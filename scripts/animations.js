// Typing Animation
const initTypingAnimation = () => {
    const text = document.querySelector('.typing-text');
    if (!text) return;
    
    text.style.width = '0';
    setTimeout(() => {
        text.style.width = '100%';
    }, 1000);
};

// Particles Animation
const initParticlesAnimation = () => {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#64ffda'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.5,
                random: false
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#64ffda',
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 0.5
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });
};

// Floating Animation for Tech Stack
const initFloatingTechStack = () => {
    const container = document.getElementById('floating-tech');
    if (!container) return;

    const techStack = [
        'React Native', 'Flutter', 'Spring Boot', 'Angular',
        'JavaScript', 'Python', 'Java', 'Firebase',
        'Docker', 'Git', 'Azure', '.NET','Jira'
    ];

    techStack.forEach((tech, index) => {
        const element = document.createElement('div');
        element.className = 'tech-item';
        element.textContent = tech;
        
        // Random position
        element.style.left = `${Math.random() * 80 + 10}%`;
        element.style.top = `${Math.random() * 80 + 10}%`;
        
        // Random animation delay
        element.style.animationDelay = `${index * 0.5}s`;
        
        container.appendChild(element);
    });
};

// Progress Bar Animation
const initProgressBars = () => {
    const bars = document.querySelectorAll('.progress-bar');
    const options = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    bars.forEach(bar => observer.observe(bar));
};

// Gradient Text Animation
const initGradientText = () => {
    const elements = document.querySelectorAll('.gradient-text');
    elements.forEach(element => {
        element.style.backgroundSize = '200% auto';
        element.style.animation = 'textGradient 3s linear infinite';
    });
};

// Scroll Animation Observer
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    initTypingAnimation();
    initParticlesAnimation();
    initFloatingTechStack();
    initProgressBars();
    initGradientText();

    // Animate sections on scroll
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Animate skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.classList.add('slide-in');
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Animate project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.classList.add('fade-in');
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Add hover effects
    const cards = document.querySelectorAll('.skill-card, .project-card');
    cards.forEach(card => {
        card.classList.add('card-hover', 'hover-glow');
    });
});

// Re-run animations on page visibility change
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        initParticlesAnimation();
    }
});
