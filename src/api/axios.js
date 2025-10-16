import axios from "axios";

export const api = axios.create({
  baseURL:"https://vasundhara-backend-production.up.railway.app/api" //use for localhost ("http://localhost:5000/api", )// your backend URL
});
