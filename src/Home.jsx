import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="home">
      <div className="home-hero">
        <h2>ברוכים הבאים לאתר קורות החיים שלי</h2>
        <p className="subtitle">גלה עוד עליי, הפרויקטים שלי, ואיך ליצור איתי קשר</p>
      </div>
      
      <div className="home-links">
        <Link to="/contact" className="home-link-card">
          <div className="card-icon">📧</div>
          <h3>יצירת קשר</h3>
          <p>פרטי יצירת קשר וקישור לגיט האב</p>
        </Link>
        
        <Link to="/projects" className="home-link-card">
          <div className="card-icon">💼</div>
          <h3>הפרויקטים שלי</h3>
          <p>הצגת הפרויקטים שביצעתי</p>
        </Link>
        
        <Link to="/about" className="home-link-card">
          <div className="card-icon">👤</div>
          <h3>אודותיי</h3>
          <p>תמונות וסיפורים מחיי</p>
        </Link>
      </div>
    </div>
  )
}

export default Home