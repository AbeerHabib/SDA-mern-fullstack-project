import React, { useEffect, useState } from 'react'

const BackToTopBtn = () => {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
          if (window.pageYOffset > 20) {
            setShowButton(true);
          } else {
            setShowButton(false);
          }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

    const handleBackToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
    
  return (
    <div>
        {showButton && (
        <button className="backToTop-btn" onClick={handleBackToTop} title="Go to top">
          &#11165;
        </button>
        )}
    </div>
  )
}

export default BackToTopBtn;