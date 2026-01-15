import React from 'react'

function Projects() {
  const projects = [
    {
      id: 1,
      title: 'Memory Game',
      description: 'משחק זיכרון פשוט בו צריך לזכור את הסדר של הכפתורים וללחוץ עליהם בסדר',
      technologies: ['JavaScript', 'CSS'],
      link: ' https://eli4231.github.io/memory-game-js/'
    },
    {
      id: 2,
      title: 'Gym App for Android',
      description: 'תיאור אפליקציה על מכון כושר שמירת תרגילים במערכת אנדרואיד',
      technologies: ['Typescript', 'JavaScript', 'CSS'],
      link: 'https://github.com/Eli4231/gymApp-for-android'
    },
    {
      id: 3,
      title: 'Simon Game for Arduino',
      description: 'משחק סימון פשוט בו צריך לזכור את הסדר של הכפתורים וללחוץ עליהם בסדר',
      technologies: ['C++'],
      link: 'https://github.com/Eli4231/simonFinal-Arduino'
    },
    {
      id: 4,
      title: 'To-Do List',
      description:'A Node.js and SQL-based To-Do List application with full CRUD support for tasks and categories.',
      technologies: ['JavaScript', 'CSS', 'Node.js', 'SQL'],
      link: 'https://github.com/Eli4231/second-year-todoList'
    }
  ]

  return (
    <div className="projects">
      <h2>הפרויקטים שלי</h2>
      <div className="projects-grid">
        {projects.map(project => (
          <div key={project.id} className="project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="technologies">
              {project.technologies.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="project-link"
            >
              צפה בפרויקט
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Projects