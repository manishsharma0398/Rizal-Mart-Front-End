import { Link } from "react-router-dom";
import "./footer.scss";

const Footer = () => {
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div
        style={{ backgroundColor: "#485769" }}
        className="d-flex justify-content-center py-2"
      >
        <span
          onClick={goToTop}
          style={{ cursor: "pointer", fontSize: "16px", fontWeight: "400" }}
          className="text-white small m-0 p-0"
        >
          Back to top
        </span>
      </div>
      <div className="footer-1">
        <div className="container foot">
          <div className="footer-links">
            <span>about</span>
            <ul>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/career">Careers</Link>
              </li>
              <li>
                <Link to="/stories">Stories</Link>
              </li>
              <li>
                <Link to="/press">press</Link>
              </li>
              <li>
                <Link to="/stories">Stories</Link>
              </li>
              <li>
                <Link to="#">RizalMart Wholesale</Link>
              </li>
              <li>
                <Link to="#">Corporate Information</Link>
              </li>
            </ul>
          </div>
          <div className="footer-links">
            <span>help</span>
            <ul>
              <li>
                <Link to="#">Payments</Link>
              </li>
              <li>
                <Link to="#">Shipping</Link>
              </li>
              <li>
                <Link to="#">Cancellation & Returns</Link>
              </li>
              <li>
                <Link to="#">FAQ</Link>
              </li>
              <li>
                <Link to="#">Report Infringement</Link>
              </li>
            </ul>
          </div>
          <div className="footer-links">
            <span>policy</span>
            <ul>
              <li>
                <Link to="/#">Return Policy</Link>
              </li>
              <li>
                <Link to="/#">Terms Of Use</Link>
              </li>
              <li>
                <Link to="/#">Security</Link>
              </li>
              <li>
                <Link to="/#">Privacy</Link>
              </li>
              <li>
                <Link to="/#">Sitemap</Link>
              </li>
              <li>
                <Link to="/#">EPR Compliance</Link>
              </li>
            </ul>
          </div>
          <div className="footer-links">
            <span>social</span>
            <ul>
              <li>
                <Link to="/#">Facebook</Link>
              </li>
              <li>
                <Link to="/#">Twitter</Link>
              </li>
              <li>
                <Link to="/#">youtube</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="container foot-links">
          <div className="footer-links">
            <span>Mail Us:</span>
            <p>
              Flipkart Internet Private Limited, Buildings Alyssa, Begonia &
              Clove Embassy Tech Village, Outer Ring Road, Devarabeesanahalli
              Village, Bengaluru, 560103, Karnataka, India
            </p>
          </div>

          <hr />

          <div className="footer-links">
            <span>Registered Office Address</span>
            <p>
              Flipkart Internet Private Limited, Buildings Alyssa, Begonia &
              Clove Embassy Tech Village, Outer Ring Road, Devarabeesanahalli
              Village, Bengaluru, 560103, Karnataka, India <br /> CIN :
              U51109KA2012PTC066107 <br /> Telephone: 044-45614700
            </p>
          </div>
        </div>
      </div>
      <div className="footer-2">
        <div className="container">
          <div className="logo-lang-country">
            <div className="logo">
              <Link className="m-0 p-0" to="/">
                RizalMart
              </Link>
              <button>English</button>
            </div>
            <ul className="countries m-0 p-0">
              <li>Australia</li>
              <li>Brazil</li>
              <li>Canada</li>
              <li>China</li>
              <li>France</li>
              <li>Germany</li>
              <li>Italy</li>
              <li>Japan</li>
              <li>Mexico</li>
              <li>Netherlands</li>
              <li>Polabnd</li>
              <li>Singapore</li>
              <li>Spain</li>
              <li>Turkey</li>
              <li>United Arab Emirates</li>
              <li>United Kingdom</li>
              <li>United States</li>
            </ul>
          </div>
          <hr />
          <div className="last-links">
            <div className="images">
              <img src="/payment.png" alt="payment modes" />
            </div>
            <div className="footer-notes">
              <ul className="m-0 p-0">
                <li>Conditions of Use & Sale</li>
                <li>Privacy Notice</li>
                <li>Interest-Based Ads</li>
              </ul>
              <p className="m-0 p-0">
                © {new Date().getFullYear()}, RizalMart.com, Inc. or its
                affiliates
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Footer;
