import axios from "axios";

// "https://celonedev.online/",

export const axios_instance = axios.create({
  baseURL: "https://celonedev.online/",
  headers: {
    "Content-Type": "application/json",
  },
});
