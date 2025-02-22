import axios from "axios";

// http://35.78.193.134/

export const axios_instance = axios.create({
  baseURL: "http://3.113.1.155/",
  headers: {
    "Content-Type": "application/json",
  },
});
