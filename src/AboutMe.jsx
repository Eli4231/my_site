import React, { useState } from 'react'

function AboutMe() {
  const [imageErrors, setImageErrors] = useState({})

  const handleImageError = (imageId) => {
    setImageErrors(prev => ({ ...prev, [imageId]: true }))
  }

  return (
    <div className="about-me">
      <h2>אודותיי</h2>
      <div className="about-content">
        <div className="about-text">
          <section>
            <h3>קצת עליי</h3>
            <p> 
            Eli Lang Software Engineer at Kinneret College</p>
          </section>
        </div>
        <div className="about-images">
          <h3>תמונות מחיי</h3>
          <div className="images-grid">
            <div className="image-placeholder">
              {!imageErrors['img1'] ? (
                <img 
                  src="https://avatars.githubusercontent.com/u/214108088?v=4" 
                  alt="אלי לאנג"
                  onError={() => handleImageError('img1')}
                />
              ) : (
                <p>לא ניתן לטעון את התמונה</p>
              )}
            </div>
            <div className="image-placeholder">
              {!imageErrors['img2'] ? (
                <img 
                  src="/images/eli.jpg" 
                  alt="אלי לאנג"
                  onError={() => handleImageError('img2')}
                />
              ) : (
                <p>לא ניתן לטעון את התמונה</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutMe