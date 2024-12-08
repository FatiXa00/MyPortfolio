// Project data
const projectsData = [
    {
        id: 1,
        title: "Nom du Projet 1",
        description: "Description détaillée du projet 1. Expliquez ici les fonctionnalités, technologies utilisées, et les défis relevés pendant le développement.",
        thumbnail: "assets/projects/project1.jpg",
        media: "assets/projects/project1.jpg",
        mediaType: "image",
        tags: ["React", "Node.js"],
        demoLink: "https://demo-link-1.com",
        githubLink: "https://github.com/username/project1"
    },
    {
        id: 2,
        title: "Nom du Projet 2",
        description: "Description détaillée du projet 2. Expliquez ici les fonctionnalités, technologies utilisées, et les défis relevés pendant le développement.",
        thumbnail: "assets/projects/project2.mp4",
        media: "assets/projects/project2.mp4",
        mediaType: "video",
        tags: ["Vue.js", "Firebase"],
        demoLink: "https://demo-link-2.com",
        githubLink: "https://github.com/username/project2"
    }
];

// Handle video hover
document.querySelectorAll('.project-card video').forEach(video => {
    video.addEventListener('mouseenter', () => {
        video.play();
    });

    video.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
    });
});

// Modal functionality
const modal = document.getElementById('projectModal');
const modalContent = modal.querySelector('.modal-content');
const modalMedia = modal.querySelector('.modal-media');
const modalTitle = modal.querySelector('.modal-title');
const modalDescription = modal.querySelector('.modal-description');
const modalDemoLink = modal.querySelector('.modal-links a:first-child');
const modalGithubLink = modal.querySelector('.modal-links a:last-child');

// Open modal
document.querySelectorAll('.project-preview-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const projectId = parseInt(btn.dataset.project);
        const project = projectsData.find(p => p.id === projectId);
        
        if (project) {
            // Set modal content
            modalTitle.textContent = project.title;
            modalDescription.textContent = project.description;
            modalDemoLink.href = project.demoLink;
            modalGithubLink.href = project.githubLink;

            // Set media content
            modalMedia.innerHTML = '';
            if (project.mediaType === 'video') {
                const video = document.createElement('video');
                video.src = project.media;
                video.controls = true;
                modalMedia.appendChild(video);
            } else {
                const img = document.createElement('img');
                img.src = project.media;
                img.alt = project.title;
                modalMedia.appendChild(img);
            }

            // Show modal with animation
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close modal
const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Stop video if playing
    const video = modalMedia.querySelector('video');
    if (video) {
        video.pause();
        video.currentTime = 0;
    }
};

modal.querySelector('.modal-close').addEventListener('click', closeModal);

// Close modal on outside click
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// Handle card flipping
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.project-card');

    cards.forEach(card => {
        const flipBtns = card.querySelectorAll('.flip-btn');
        
        flipBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent event bubbling
                card.classList.toggle('flipped');
            });
        });
    });

    // Optional: Add hover effect for gallery images
    const galleryImages = document.querySelectorAll('.project-gallery img');
    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            // Create fullscreen preview
            const preview = document.createElement('div');
            preview.className = 'fullscreen-preview';
            preview.innerHTML = `
                <div class="preview-content">
                    <img src="${img.src}" alt="${img.alt}">
                    <button class="close-preview">×</button>
                </div>
            `;
            
            document.body.appendChild(preview);
            document.body.style.overflow = 'hidden';

            // Close preview on click
            preview.addEventListener('click', (e) => {
                if (e.target === preview || e.target.className === 'close-preview') {
                    preview.remove();
                    document.body.style.overflow = '';
                }
            });
        });
    });
});
