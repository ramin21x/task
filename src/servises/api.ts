import axios from "axios";

export const API = axios.create({
  baseURL: "http://89.106.206.240:8001/api/v1/",
});
