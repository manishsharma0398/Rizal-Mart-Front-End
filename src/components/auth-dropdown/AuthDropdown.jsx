import { Link } from "react-router-dom";
import "./AuthDropdown.scss";

const AuthDropdown = () => {
  return (
    <div className="auth-dropdown">
      <ul>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/logout">Logout</Link>
        </li>
      </ul>
    </div>
  );
};
export default AuthDropdown;
