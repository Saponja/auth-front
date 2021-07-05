
import * as actions from  '../actiontypes';
import {apiAdd, apiDelete, apilogin, apiRegister, apiUpdate, apiGet, apiGetOne} from '../API/api'


export const register = user => dispatch => {
    

    dispatch({type : actions.register.REGISTER_REQUEST});

    return apiRegister(user)
    .then(response => {
        dispatch({
            type : actions.register.REGISTER_SUCCESS,
            payload : response.data
        })
        return Promise.resolve();
    })
    .catch(error => {
        dispatch({
            type : actions.register.REGISTER_FAILURE,
            payload : error
        })
        return Promise.reject(error.response.status);
    })
}


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
    apiGet()
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



export const getOne = (id) => dispatch => {
    apiGetOne(id)
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
                payload : {id, ...response.data}
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