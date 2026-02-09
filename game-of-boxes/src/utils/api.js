import axios from "axios";

const API = axios.create({
  baseURL: "https://game-of-memory-4k8z.onrender.com",
});

export default API;
