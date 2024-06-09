import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
});

api.interceptors.request.use((config) => {
  config.headers["tg-init-data"] = window.Telegram.WebApp.initData;
  return config;
});

export default api;