import { useSelector } from "react-redux";

import { selectUserData, selectUserToken } from "../features/auth/authSlice";

const useAuth = () => {
  const token = useSelector(selectUserToken);
  const userData = useSelector(selectUserData);

  let role = "";
  let isUser = false;
  let isAdmin = false;
  let isLoggedIn = false;

  if (token) {
    role = userData?.role;
    isLoggedIn = !!userData?._id;
    isUser = userData?.role === "user";
    isAdmin = userData?.role === "admin";
  }

  return { isLoggedIn, isUser, isAdmin, role };
};

export default useAuth;
