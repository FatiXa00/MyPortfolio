// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles.js
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 50,
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
                }
            },
            retina_detect: true
        });
    }

    // Load dynamic content
    loadSkills();
    loadProjects();

    // Initialize scroll animations
    initScrollAnimations();
});

// Load Skills
function loadSkills() {
    const skillsContainer = document.querySelector('.skills-container');
    if (!skillsContainer) return;

    const skills = [
        {
            category: 'Frontend',
            items: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Vue.js']
        },
        {
            category: 'Backend',
            items: ['Node.js', 'Python', 'PHP', 'SQL', 'MongoDB']
        },
        {
            category: 'Mobile',
            items: ['React Native', 'Flutter', 'Android', 'iOS']
        }
    ];

    skills.forEach(skill => {
        const card = document.createElement('div');
        card.className = 'skill-card';
        card.innerHTML = `
            <h3>${skill.category}</h3>
            <ul>
                ${skill.items.map(item => `<li>${item}</li>`).join('')}
            </ul>
        `;
        skillsContainer.appendChild(card);
    });
}

// Load Projects
function loadProjects() {
    const projectsContainer = document.querySelector('.projects-container');
    if (!projectsContainer) return;

    const projects = [
        {
            title: 'Portfolio Personnel',
            description: 'Un site web moderne présentant mes compétences et projets.',
            tech: ['HTML', 'CSS', 'JavaScript'],
            year: '2023'
        },
        {
            title: 'Application Mobile',
            description: 'Application mobile cross-platform développée avec React Native.',
            tech: ['React Native', 'Node.js', 'MongoDB'],
            year: '2023'
        },
        {
            title: 'E-commerce Platform',
            description: 'Plateforme e-commerce complète avec système de paiement.',
            tech: ['Vue.js', 'Node.js', 'Stripe'],
            year: '2023'
        }
    ];

    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <h3>${project.title}</h3>
            <p class="project-year">${project.year}</p>
            <p class="project-description">${project.description}</p>
            <div class="project-tech">
                ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
        `;
        projectsContainer.appendChild(card);
    });
}

// Initialize scroll animations
function initScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in, .slide-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(element => {
        observer.observe(element);
    });
}

// Handle smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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
