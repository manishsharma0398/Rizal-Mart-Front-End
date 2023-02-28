import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

import "./NewsLeter.scss";

const NewsLetter = () => {
  return (
    <div className="newsletter">
      <div className="newsletter-content">
        <span className="small-text">Newsletter</span>
        <span className="big-text">Sign up for latest updates and offers</span>
        <div className="form">
          <input type="text" placeholder="Email Address" />
          <button>Subscribe</button>
        </div>
        <div className="text">
          Will be used in accordance with our Privacy Policy
        </div>
        <div className="social-icons">
          <Link className="icon" to="/#">
            <FaLinkedinIn />
          </Link>

          <Link className="icon" to="/#">
            <FaGithub />
          </Link>

          <Link className="icon" to="/#">
            <FaFacebookF />
          </Link>

          <Link className="icon" to="/#">
            <FaInstagram />
          </Link>

          <Link className="icon" to="/#">
            <FaTwitter />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default NewsLetter;
