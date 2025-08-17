// Function to load JSON data
async function loadData() {
    try {
        const response = await fetch('assets/data/projects.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading data:', error);
        return null;
    }
}

// Function to create skill cards (Unchanged)
function createSkillCard(category, skills) {
    const card = document.createElement('div');
    card.className = 'skill-card';
    
    card.innerHTML = `
        <h3>${category}</h3>
        <ul>
            ${skills.map(skill => `<li>${skill}</li>`).join('')}
        </ul>
    `;
    return card;
}

// === NEW & IMPROVED FUNCTION TO CREATE PROJECT CARDS ===
function createProjectCard(project) {
    const cardContainer = document.createElement('div');
    cardContainer.className = 'project-card-container';
    
    const cardInner = document.createElement('div');
    cardInner.className = 'project-card-inner';

    // Create the FRONT of the card (Unchanged)
    const cardFront = document.createElement('div');
    cardFront.className = 'project-card-front';
    cardFront.innerHTML = `
        <h3>${project.title}</h3>
        <p class="project-year">${project.year}</p>
        <p class="project-description">${project.description}</p>
        <ul class="project-highlights">
            ${project.highlights.map(h => `<li>${h}</li>`).join('')}
        </ul>
        <div class="project-tech">
            ${project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
    `;

    // Create the BACK of the card
    const cardBack = document.createElement('div');
    cardBack.className = 'project-card-back';
    
    let mediaTag = '';
    // Determine the style class: 'media-contain' for mockups, 'media-cover' for everything else.
    const mediaClass = project.mediaStyle === 'contain' ? 'media-contain' : 'media-cover';

    // Build the media tag with the correct class embedded directly
    if (project.video) {
        mediaTag = `<video class="${mediaClass}" src="${project.video}" autoplay loop muted playsinline></video>`;
    } else if (project.image) {
        mediaTag = `<img class="${mediaClass}" src="${project.image}" alt="Aperçu du projet ${project.title}">`;
    }
    
    // Set the inner HTML for the back of the card
    cardBack.innerHTML = `
        ${mediaTag}
        <p class="view-prompt">Cliquez pour retourner</p>
    `;
    
    // Assemble the card
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    cardContainer.appendChild(cardInner);

    return cardContainer;
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
    
    // Add click event listeners for flipping
    document.querySelectorAll('.project-card-container').forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('is-flipped');
        });
    });

    // Apply animation
    document.querySelectorAll('.skill-card, .project-card-container').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeContent);
document.querySelector('.nav-toggle').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});