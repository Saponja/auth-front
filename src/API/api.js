import axios from "axios";


const baseAuthUrl = "https://localhost:44355/api/auth/";
const baseAirplaneUrl = "https://localhost:44355/api/airplane/";



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
      .post(baseAuthUrl + "login", cred)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        return response.data;
      });
  };

export const apiRegister = (user) => {

    return axios.post(baseAuthUrl + "register", user);
}

export const apiDelete = id => {

  return axios.delete(baseAirplaneUrl + id, {headers : getHeader()});

}  

export const apiAdd = data => {
  
  return axios.post(baseAirplaneUrl, data, {headers : getHeader()});
  
}


export const apiUpdate = (id, data) => {

  return axios.put(baseAirplaneUrl + id, data, {headers : getHeader()});

}

export const apiGet = () => {
  return axios.get(baseAirplaneUrl, {headers : getHeader()})
}

export const apiGetOne = (id) => {
  return axios.get(baseAirplaneUrl + id, {headers : getHeader()})
}

export const apiGetPerPage = (pageNum, numOfRows) => {
  console.log(pageNum, numOfRows)
  return axios.post(baseAirplaneUrl + "page", {pageNum, numOfRows}, {headers : getHeader()});
} 