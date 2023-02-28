import { Link } from "react-router-dom";
import { FaEnvelope, FaLocationArrow, FaMobileAlt } from "react-icons/fa";

import Payment from "../../assets/payments.png";

import "./Footer.scss";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="footer-content">
        <div className="col">
          <div className="title">About</div>
          <div className="text">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Necessitatibus reiciendis suscipit nemo unde vel. Corporis magnam
            sit iure quisquam delectus voluptas sapiente expedita eveniet
            doloribus dolorum reprehenderit, in aspernatur doloremque assumenda
            odio fugit corrupti. Dolores hic dolore praesentium accusamus
            sapiente magnam quae nulla voluptates? Totam enim eum sed illum
            facilis.
          </div>
        </div>
        <div className="col">
          <div className="title">Contact</div>
          <div className="c-item">
            <FaLocationArrow />
            <div className="text">
              Jaduvitta, Milan More, P.O - Champasari, Disct- Darjeeling,
              Siliguri - 734003, West Bengal
            </div>
          </div>
          <div className="c-item">
            <FaMobileAlt />
            <div className="text">
              Mobile: &nbsp; <a href="tel:+917031035570">+91 7031035570</a>
            </div>
          </div>
          <div className="c-item">
            <FaEnvelope />
            <div className="text">
              Email: &nbsp;
              <a href="mailto: webdevmanish8@gmail.com">
                webdevmanish8@gmail.com
              </a>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="title">Categories</div>
          <ul>
            <li>
              <Link to="/headphones" className="text">
                Headphones
              </Link>
            </li>
            <li>
              <Link to="/headphones" className="text">
                Headphones
              </Link>
            </li>
            <li>
              <Link to="/headphones" className="text">
                Headphones
              </Link>
            </li>
            <li>
              <Link to="/headphones" className="text">
                Headphones
              </Link>
            </li>
            <li>
              <Link to="/headphones" className="text">
                Headphones
              </Link>
            </li>
            <li>
              <Link to="/headphones" className="text">
                Headphones
              </Link>
            </li>
            <li>
              <Link to="/headphones" className="text">
                Headphones
              </Link>
            </li>
          </ul>
        </div>
        <div className="col">
          <div className="title">Pages</div>
          <ul>
            <li>
              <Link to="/headphones" className="text">
                Headphones
              </Link>
            </li>
            <li>
              <Link to="/headphones" className="text">
                Headphones
              </Link>
            </li>
            <li>
              <Link to="/headphones" className="text">
                Headphones
              </Link>
            </li>
            <li>
              <Link to="/headphones" className="text">
                Headphones
              </Link>
            </li>
            <li>
              <Link to="/headphones" className="text">
                Headphones
              </Link>
            </li>
            <li>
              <Link to="/headphones" className="text">
                Headphones
              </Link>
            </li>
            <li>
              <Link to="/headphones" className="text">
                Headphones
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="bottom-bar">
        <div className="bottom-bar-content">
          <div className="text">
            Rizal Mart &#169; {new Date().getFullYear()}{" "}
            {new Date().getFullYear() !== 2023 &&
              `- ${new Date().getFullYear()}`}{" "}
            created with &#10084; by{" "}
            <a target="_blank" href="https://github.com/manishsharma0398">
              Manish Sharma
            </a>
            . Premium E-Commerce Solutions.
          </div>
          <img src={Payment} alt="all payments option" />
        </div>
      </div>
    </footer>
  );
};
export default Footer;
