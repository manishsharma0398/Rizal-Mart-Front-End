import { MdClose } from "react-icons/md";
import Imag from "../../assets/products/earbuds-prod-2.webp";

import "./Search.scss";

const Search = ({ closeSearchHandler }) => {
  return (
    <div className="search-modal">
      <div className="form-field">
        <input type="text" autoFocus placeholder="Search for products" />
        <MdClose onClick={closeSearchHandler} />
      </div>
      <div className="search-result-content">
        <div className="search-results">
          <div className="search-result-item">
            <div className="img-container">
              <img src={Imag} alt="" />
            </div>
            <div className="prod-details">
              <span className="name">Name</span>
              <span className="desc">Desc</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Search;
