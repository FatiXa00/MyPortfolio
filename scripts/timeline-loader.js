document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Load education data
        const educationResponse = await fetch('assets/data/education.json');
        const educationData = await educationResponse.json();
        
        // Load experience data
        const experienceResponse = await fetch('assets/data/experiences.json');
        const experienceData = await experienceResponse.json();

        // Render education timeline
        const educationTimeline = document.getElementById('education-timeline');
        const educationTemplate = document.getElementById('education-item-template');

        educationData.education.forEach(item => {
            const clone = educationTemplate.content.cloneNode(true);
            
            clone.querySelector('.timeline-date').textContent = item.period;
            clone.querySelector('.timeline-title').textContent = item.school;
            clone.querySelector('.timeline-description').innerHTML = 
                `${item.degree}<br>${item.specialization}`;

            educationTimeline.appendChild(clone);
        });

        // Render experience timeline
        const experienceTimeline = document.getElementById('experience-timeline');
        const experienceTemplate = document.getElementById('experience-item-template');

        experienceData.experiences.forEach(item => {
            const clone = experienceTemplate.content.cloneNode(true);
            
            clone.querySelector('.timeline-date').textContent = item.year;
            clone.querySelector('.timeline-title').textContent = item.company;
            clone.querySelector('.timeline-description').textContent = item.description;

            const techTags = clone.querySelector('.tech-tags');
            item.technologies.forEach(tech => {
                const tag = document.createElement('span');
                tag.className = 'tech-tag';
                tag.textContent = tech;
                techTags.appendChild(tag);
            });

            experienceTimeline.appendChild(clone);
        });

        // Add animation observer
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.2 }
        );

        // Observe all timeline items
        document.querySelectorAll('.timeline-item').forEach(item => {
            observer.observe(item);
        });

    } catch (error) {
        console.error('Error loading timeline data:', error);
    }
});
