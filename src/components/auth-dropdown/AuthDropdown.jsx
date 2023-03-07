import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logout } from "../../features/auth/authSlice";

import "./AuthDropdown.scss";

const AuthDropdown = () => {
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    await dispatch(logout());
  };

  return (
    <div className="auth-dropdown">
      <ul>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <button onClick={logoutHandler}>Logout</button>
        </li>
      </ul>
    </div>
  );
};
export default AuthDropdown;
