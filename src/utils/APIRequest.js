import axios from "axios";

export const base_url = import.meta.env.VITE_BASE_URL;

let store;
export const injectStore = (_store) => {
  store = _store;
};

export const privateRequest = axios.create({
  baseURL: base_url,
  withCredentials: true,
});

privateRequest.interceptors.request.use(async function (config) {
  // const token = store?.getState()?.auth?.currentUser?.token;
  config.headers.Authorization = `Bearer ${token}`;
  config.headers.Accept = "application/json";

  // Check if token expired
  // if (token && isTokenExpired()) {
  //   const newToken = await refreshAccessToken(token);
  //   config.headers.Authorization = `Bearer ${newToken}`;
  //   // Update the token in the store
  //   store.dispatch(updateToken(newToken));
  // }

  return config;
});

// // Function to check if token has expired
// async function isTokenExpired() {
//   const d = checkTokenExpired();
//   console.log(d);
//   return false;
//   // return store.dispatch(checkTokenExpired());
// }

// // Function to refresh access token
// async function refreshAccessToken(token) {
//   // your logic to refresh access token
// }

export const publicRequest = axios.create({
  baseURL: base_url,
  withCredentials: true,
});
