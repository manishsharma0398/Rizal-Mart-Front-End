import axios from "axios";
import jwtDecode from "jwt-decode";
import { updateToken } from "../features/auth/authSlice";

export const base_url = import.meta.env.VITE_BASE_URL;

let store;
export const injectStore = (_store) => {
  store = _store;
};

export const publicRequest = axios.create({
  baseURL: base_url,
  withCredentials: true,
});

export const privateRequest = axios.create({
  baseURL: base_url,
  withCredentials: true,
});

privateRequest.interceptors.request.use(async function (config) {
  const token = store?.getState()?.auth?.currentUser?.token;
  config.headers.Authorization = `Bearer ${token}`;
  config.headers.Accept = "application/json";

  // Check if token expired
  if (token && (await isTokenExpired(token))) {
    console.log("Token expired.... ");
    const newToken = await refreshAccessToken();
    store.dispatch(updateToken(newToken));
    config.headers.Authorization = `Bearer ${newToken}`;
  }

  return config;
});

// Function to check if token has expired
async function isTokenExpired(token) {
  const expiryTime = jwtDecode(token).exp * 1000;
  const currentTime = new Date().getTime();

  console.log({ expiryTime, currentTime });
  console.log(currentTime >= expiryTime);

  return currentTime >= expiryTime;
}

// Function to refresh access token
async function refreshAccessToken() {
  const newToken = await publicRequest.post("/auth/refresh");
  return newToken.data.accessToken;
}
