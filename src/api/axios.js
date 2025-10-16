import axios from "axios";

export const api = axios.create({
  baseURL:"http://localhost:5000/api"// your backend URL //use for localhost 
  // "https://vasundhara-backend-production.up.railway.app/api"    // for production
}); 
