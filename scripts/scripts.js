// Typewriter effect for "About Me" text
document.addEventListener('scroll', function () {
  const bioText = document.querySelector('.bio-text p');
  if (window.scrollY > bioText.offsetTop - window.innerHeight) {
    bioText.classList.add('visible');
  }
});

// Interactive hover effects on project tags
document.querySelectorAll('.tag').forEach(tag => {
  tag.addEventListener('mouseenter', () => {
    tag.style.backgroundColor = '#e67e22';
  });
  tag.addEventListener('mouseleave', () => {
    tag.style.backgroundColor = '#f39c12';
  });
});

// Initialize Particles.js
particlesJS('particles-js', {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: '#ffffff' },
    shape: { type: 'circle' },
    opacity: {
      value: 0.5,
      random: false,
      animation: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
    },
    size: {
      value: 3,
      random: true,
      animation: { enable: true, speed: 2, size_min: 0.1, sync: false }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#ffffff',
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 2,
      direction: 'none',
      random: false,
      straight: false,
      out_mode: 'out',
      bounce: false,
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: { enable: true, mode: 'repulse' },
      onclick: { enable: true, mode: 'push' },
      resize: true
    },
    modes: {
      repulse: { distance: 100, duration: 0.4 },
      push: { particles_nb: 4 }
    }
  },
  retina_detect: true
});

// Floating Tech Stack
const techStack = [
  'React Native', 'Flutter', 'Spring Boot', 'Angular',
  'Python', 'Java', 'JavaScript', 'Docker'
];

function createTechStackItems() {
  const container = document.querySelector('.tech-stack');
  techStack.forEach(tech => {
    const item = document.createElement('div');
    item.className = 'tech-item';
    item.textContent = tech;
    item.style.left = Math.random() * 90 + '%';
    item.style.top = Math.random() * 90 + '%';
    item.style.animationDelay = Math.random() * 5 + 's';
    container.appendChild(item);
  });
}

// Scroll Reveal
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < windowHeight - elementVisible) {
      element.classList.add('active');
    }
  });
}

// Project Filters
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projects = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      projects.forEach(project => {
        if (filter === 'all' || project.dataset.category === filter) {
          project.style.display = 'block';
        } else {
          project.style.display = 'none';
        }
      });
    });
  });
}

// Load Projects
async function loadProjects() {
  try {
    const response = await fetch('assets/data/projects.json');
    const data = await response.json();
    const gallery = document.querySelector('.project-gallery');
    
    data.projects.forEach(project => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.dataset.category = project.category.toLowerCase();
      
      card.innerHTML = `
        <img src="assets/images/${project.id}.jpg" alt="${project.title}" onerror="this.src='https://via.placeholder.com/500'">
        <div class="project-info">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="tags">
            ${project.tech.map(t => `<span class="tag">${t}</span>`).join('')}
          </div>
        </div>
      `;
      
      gallery.appendChild(card);
    });
  } catch (error) {
    console.error('Error loading projects:', error);
  }
}

// Load Skills
async function loadSkills() {
  try {
    const response = await fetch('assets/data/projects.json');
    const data = await response.json();
    const skillsGrid = document.querySelector('.skills-grid');
    
    Object.entries(data.skills).forEach(([category, skills]) => {
      const section = document.createElement('div');
      section.className = 'skill-category';
      
      section.innerHTML = `
        <h3>${category.charAt(0).toUpperCase() + category.slice(1)}</h3>
        <div class="skills-list">
          ${skills.map(skill => `
            <div class="skill-item">
              <span>${skill}</span>
              <div class="progress-bar" style="--progress: ${Math.random() * 40 + 60}%"></div>
            </div>
          `).join('')}
        </div>
      `;
      
      skillsGrid.appendChild(section);
    });
  } catch (error) {
    console.error('Error loading skills:', error);
  }
}

// Contact Form
function initContactForm() {
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Add your form submission logic here
    // For example, sending to an email service or backend API
    
    alert('Message envoyé avec succès!');
    form.reset();
  });
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  createTechStackItems();
  loadProjects();
  loadSkills();
  initProjectFilters();
  initContactForm();
  
  // Scroll event for reveal animations
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Initial check
});
