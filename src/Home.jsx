import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="home">
      <div className="home-hero">
        <h2>Welcome to my website</h2>
        <p className="subtitle">About me, my projects, and contact info. You can also ask the chat about me directly.</p>
      </div>
      
      <div className="home-links">
        <Link to="/contact" className="home-link-card">
          <div className="card-icon">📧</div>
          <h3>Contact</h3>
          <p>Contact info and link to my GitHub</p>
        </Link>
        
        <Link to="/projects" className="home-link-card">
          <div className="card-icon">💼</div>
          <h3>My Projects</h3>
          <p>Displaying my projects</p>
        </Link>
        
        <Link to="/about" className="home-link-card">
          <div className="card-icon">👤</div>
          <h3>About me</h3>
          <p>Pictures and stories from my life</p>
        </Link>
      </div>
    </div>
  )
}

export default Home