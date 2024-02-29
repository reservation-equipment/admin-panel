import axios from "axios";
import { baseUrl } from "../../app/config/api.ts";

const $api = axios.create({
  withCredentials: true,
  baseURL: baseUrl,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${window.localStorage.getItem(
    "token"
  )}`;
  return config;
});

export default $api;
