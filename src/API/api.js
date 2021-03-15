import axios from "axios";

const baseUrl = "https://localhost:44355/api/auth/";

function getHeader(){
  const token = localStorage.getItem("token");
  if(token){
      return { Authorization: 'Bearer ' + token };
  }else{
      return {};
  }
}


export const apilogin = (cred) => {
    return axios
      .post(baseUrl + "login", cred)
      .then((response) => {
        
        localStorage.setItem("token", response.data.token);
        return response.data;
      });
  };

export const apiDelete = id => {

  return axios.delete(`https://localhost:44355/api/airplane/${id}`, {headers : getHeader()});

}  

export const apiAdd = data => {
  
  return axios.post(`https://localhost:44355/api/airplane`, data, {headers : getHeader()});
}


export const apiUpdate = (id, data) => {

  return axios.put(`https://localhost:44355/api/airplane/${id}`, data, {headers : getHeader()});

}