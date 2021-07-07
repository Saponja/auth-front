import {airplanes} from '../actiontypes';

const initalState = {
    
    airplanes : [],
    allairplanes : [],
    error: {}

}


export const airplaneReducer = (state = initalState, action) => {

    const {type, payload} = action;

    switch(type){
        case airplanes.GETALL_SUCCESS:
            return {
                ...state,
                allairplanes : payload
            };
        case airplanes.GETALL_FAILURE:
            return {
                ...state,
                error : payload
            }

        case airplanes.GETPP_SUCCESS:
            return {
                ...state, 
                airplanes : payload
            }
        case airplanes.GETPP_FAILURE:
            return {
                ...state,
                error : payload
            }
        case airplanes.GETONE_SUCCESS:
            return {
                ...state,
                
            };
        case airplanes.GETONE_FAILURE:
            return {
                ...state,
                error : payload
            };
        case airplanes.DELETE_SUCCESS:
            return {
                ...state,
                airplanes: state.airplanes.filter(x => x.airplaneId != payload),
                error : {...state.error, status : 200}
                
            };
        case airplanes.DELETE_FAILURE:
            return {
                ...state,
                error : payload
            }
        case airplanes.ADD_SUCCESS :
            return {
                ...state,
                airplanes : [...state.airplanes, payload]
            };
        case airplanes.ADD_FAILURE :
            return {
                ...state,
                error : payload
            };   
        case airplanes.UPDATE_SUCCES :
            return {
                ...state,
                airplanes : state.airplanes.map(x => x.airplaneId == payload.id ? payload : x)
            };
        case airplanes.UPDATE_FAILURE :
            return {
                ...state,
                error : payload
            };   
        default:
            return state;
    }

}