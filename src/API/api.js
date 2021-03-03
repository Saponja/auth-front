import axios from "axios";

const baseUrl = "https://localhost:44355/api/auth/";


export const apilogin = (cred) => {
    return axios
      .post(baseUrl + "login", cred)
      .then((response) => {
        
        localStorage.setItem("token", response.data.token);
        return response.data;
      });
  };
  