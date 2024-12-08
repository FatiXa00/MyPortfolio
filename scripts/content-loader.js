// Function to load JSON data
async function loadData() {
    try {
        const response = await fetch('../assets/data/projects.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading data:', error);
        return null;
    }
}

// Function to create skill cards
function createSkillCard(category, skills) {
    const card = document.createElement('div');
    card.className = 'skill-card';
    
    const title = document.createElement('h3');
    title.textContent = category;
    card.appendChild(title);

    const list = document.createElement('ul');
    skills.forEach(skill => {
        const item = document.createElement('li');
        item.textContent = skill;
        list.appendChild(item);
    });
    card.appendChild(list);

    return card;
}

// Function to create project cards
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    card.innerHTML = `
        <h3>${project.title}</h3>
        <p class="project-year">${project.year}</p>
        <p class="project-description">${project.description}</p>
        <div class="project-tech">
            ${project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
        <ul class="project-highlights">
            ${project.highlights.map(h => `<li>${h}</li>`).join('')}
        </ul>
    `;

    return card;
}

// Initialize content
async function initializeContent() {
    const data = await loadData();
    if (!data) return;

    // Load Skills
    const skillsContainer = document.querySelector('.skills-container');
    if (skillsContainer && data.skills) {
        Object.entries(data.skills).forEach(([category, skillList]) => {
            const card = createSkillCard(category, skillList);
            skillsContainer.appendChild(card);
        });
    }

    // Load Projects
    const projectsContainer = document.querySelector('.projects-container');
    if (projectsContainer && data.projects) {
        data.projects.forEach(project => {
            const card = createProjectCard(project);
            projectsContainer.appendChild(card);
        });
    }

    // Add animation classes
    document.querySelectorAll('.skill-card, .project-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('animated-element');
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeContent);
