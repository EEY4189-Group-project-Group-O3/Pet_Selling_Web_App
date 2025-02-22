import axios from "axios";

// http://35.78.193.134/

export const axios_instance = axios.create({
  baseURL: "https://celonedev.online/",
  headers: {
    "Content-Type": "application/json",
  },
});
