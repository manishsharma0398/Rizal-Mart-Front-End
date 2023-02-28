import { publicRequest } from "../../utils/APIRequest";

const login = async (userData) => {
  const response = await publicRequest.post("/auth/login", userData);
  if (response.data) {
    localStorage.setItem("rizal_mart", JSON.stringify(response.data));
  }
  return response;
};

const authService = { login };

export default authService;
