export const access_token = () =>
  localStorage.getItem("rizal_mart")
    ? JSON.parse(localStorage.getItem("rizal_mart")).token
    : null;
