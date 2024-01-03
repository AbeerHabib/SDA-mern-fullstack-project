import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareFacebook, faSquareInstagram, faSquareXTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
    
        <div className="about-us">
          <h3>About Us</h3>
          <p>Welcome to Elecworld! We are committed to bringing the wonders of technology into your life. 
            We strive to enhance your most memorable experiences with innovation and convenience.</p>
        </div>

        <hr />

        <div className="quick-links">
          <h3>Quick Links</h3>
          <ul role="list" aria-label="quick-links">
          <li>
            <Link to="#">FAQs</Link>
          </li>
          <li>
            <Link to="#">Shipping</Link>
          </li>
          <li>
            <Link to="#">Returns</Link>
          </li>
          <li>
            <Link to="#">Privacy Policy</Link>
          </li>
          </ul>
        </div>

        <hr />

        <div className="follow-and-contact">
          <h3>Follow Us</h3>
          <div className="follow-us">
            <FontAwesomeIcon icon={faSquareXTwitter} size="xl" style={{color: "#7D7C7C", paddingRight: "0.2rem"}} />
            <FontAwesomeIcon icon={faSquareFacebook} size="xl" style={{color: "#7D7C7C", paddingRight: "0.2rem"}} />
            <FontAwesomeIcon icon={faSquareInstagram} size="xl" style={{color: "#7D7C7C"}} />
          </div>

          <div className="contact-us">
            <a href="mailto: cs.elecworld@gmail.com" >cs.elecworld@gmail.com</a>
          </div>
        </div>

        <div className="copyright">
          <p>CopyRight &copy; 2023 | Developed by Abeer Alnakhli</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;

    {/* <footer>          
          <div className="container">
            <div className="copyright">
              <p>CopyRight &copy; 2023 | Developed by Abeer Alnakhli</p>
            </div>
          </div>
    </footer> */}