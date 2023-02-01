import axios from "axios";

export const base_url = "http://localhost:5000/api";

export const makeRequest = axios.create({
  baseURL: base_url,
});
