import axios from "axios";

// "https://celonedev.online/",

export const axios_instance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  headers: {
    "Content-Type": "application/json",
  },
});
