
import * as actions from  '../actiontypes';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import {apiAdd, apiDelete, apilogin, apiUpdate} from '../API/api'

const baseUrl = "https://localhost:44355/api/auth/";

function getHeader(){
    const token = localStorage.getItem("token");
    if(token){
        return { Authorization: 'Bearer ' + token };
    }else{
        return {};
    }
}

export const register = user => dispatch => {
    
    dispatch({type : actions.register.REGISTER_REQUEST});

    axios.post(baseUrl + "register", user)
    .then(response => {
        dispatch({
            type : actions.register.REGISTER_SUCCESS,
            payload : response.data
        })
    })
    .catch(error => {
        dispatch({
            type : actions.register.REGISTER_FAILURE,
            payload : error
        })
    })
}

// export const login = credentials => dispatch => {
    
//     dispatch({type : actions.login.LOGIN_REQUEST});

//     axios.post(baseUrl + "login", credentials)
//     .then(response => {
//         localStorage.setItem("token", response.data.token);
//         dispatch({
//             type : actions.login.LOGIN_SUCCESS,
//             payload : response.data
//         })
//     })
//     .catch(error => {
//         dispatch({
//             type : actions.login.LOGIN_FAILURE,
//             payload : error
//         })
//     });
// }

export const login = (cred) => (dispatch) => {
    return apilogin(cred).then(
      (data) => {
        dispatch({
          type: actions.login.LOGIN_SUCCESS,
          payload: { user: data },
        });
  
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: actions.login.LOGIN_FAILURE,
          payload : message
        });
  
        return Promise.reject();
      }
    );
  };



export const logout = () => dispatch => {
    localStorage.removeItem('token');

    dispatch({
        type : actions.LOGOUT
    })
}

export const getAirplanes = () => dispatch => {
    axios.get("https://localhost:44355/api/airplane/getall", {headers : getHeader()})
    .then(response => {
        dispatch({
            type : actions.airplanes.GETALL_SUCCESS,
            payload : response.data
        });
    })
    .catch(error => {
        dispatch({
            type : actions.airplanes.GETALL_FAILURE,
            payload : error
        });
    })
}

export const deleteAirplane = (id) => dispatch => {
    axios.delete(`https://localhost:44355/api/airplane/${id}`, {headers : getHeader()})
    .then(response => {
        dispatch({
            type : actions.airplanes.DELETE_SUCCESS,
            payload : id
        });
    })
    .catch((error) => {
        dispatch({
            type : actions.airplanes.DELETE_FAILURE,
            payload : error.response
        });
    })
}

export const addAirplane = (data) => dispatch => {

    const postData = {

        name : data.aname,
        company : data.company,
        model : data.model

    }

    axios.post(`https://localhost:44355/api/airplane`, postData, {headers : getHeader()})
    .then(response => {
        dispatch({
            type : actions.airplanes.ADD_SUCCESS,
            payload : response.data
        })
    })
    .catch(error => {
        dispatch({
            type : actions.airplanes.ADD_FAILURE,
            payload : error
        })
    })
    
}

export const addAirplaneWithFeed = data => dispatch => {

    const postData = {

        name : data.aname,
        company : data.company,
        model : data.model

    }

    return apiAdd(postData).then(
        (response) => {
            dispatch({
                type : actions.airplanes.ADD_SUCCESS,
                payload : response.data
            })

            return Promise.resolve();
        }, (error) => {
            dispatch({
                type : actions.airplanes.ADD_FAILURE,
                payload : error
            })

            return Promise.reject(error.response.status);
        }
    )

}


export const updateAirplane = (id, data) => dispatch => {

    const putData = {
        airplaneId : id,

        name : data.aname,
        company : data.company,
        model : data.model

    }

    axios.put(`https://localhost:44355/api/airplane/${id}`, putData, {headers : getHeader()})
    .then(response => {
        dispatch({
            type : actions.airplanes.UPDATE_SUCCES,
            payload : {id, ...putData}
        })
    })
    .catch(error => {
        dispatch({
            type : actions.airplanes.UPDATE_FAILURE,
            payload : error
        })
    })

}



export const getOne = (id) => dispatch => {
    axios.get(`https://localhost:44355/api/airplane/get/${id}`, {headers : getHeader()})
    .then(response => {
        dispatch({
            type : actions.airplanes.GETONE_SUCCESS,
            payload : response.data
        });
    })
    .catch((error) => {
        dispatch({
            type : actions.airplanes.GETONE_FAILURE,
            payload : error.response
        });
    })
}


export const deleteAirplaneWithFeed = (id) => dispatch => {
    
    return apiDelete(id).then(
        (data) => {
            dispatch({
                type : actions.airplanes.DELETE_SUCCESS,
                payload : id
            });
      
            return Promise.resolve();
          },
          (error) => {
            const message = error.response.status;
            //   (error.response &&
            //     error.response.data &&
            //     error.response.data.message) ||
            //   error.message ||
            //   error.toString();
      
            dispatch({
                type : actions.airplanes.DELETE_FAILURE,
                payload : message
            });
      
            return Promise.reject(message);
          }
        );
}

export const updateAirplaneWithFeed = (id, data) => dispatch => {
    
    const putData = {
        airplaneId : id,

        name : data.aname,
        company : data.company,
        model : data.model

    }

    return apiUpdate(id, putData)
    .then(
        response => {
            
            dispatch({
                type : actions.airplanes.UPDATE_SUCCES,
                payload : {id, ...putData}
            })

            return Promise.resolve();
        },
        error => {
            dispatch({
                type : actions.airplanes.UPDATE_FAILURE,
                payload : error
            })

            return Promise.reject(error.response.status);
        }
    )
}