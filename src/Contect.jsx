import React from 'react'

function Contact() {
  return (
    <div className="contact">
      <h2>יצירת קשר</h2>
      <div className="contact-info">
        <div className="contact-item">
          <h3>אימייל</h3>
          <p>elilang92@gmail.com</p>
        </div>
        <div className="contact-item">
          <h3>טלפון</h3>
          <p>054-7787136</p>
        </div>
        <div className="contact-item">
          <h3>GitHub</h3>
          <a 
            href="https://github.com/Eli4231" 
            target="_blank" 
            rel="noopener noreferrer"
            className="github-link"
          >
            בקר בפרופיל הגיט האב שלי
          </a>
        </div>
      </div>
    </div>
  )
}

export default Contact