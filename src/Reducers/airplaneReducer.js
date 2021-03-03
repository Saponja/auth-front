import {airplanes} from '../actiontypes';

const initalState = {
    
    airplanes : [],
    oneairplane : {},
    error: ""

}


export const airplaneReducer = (state = initalState, action) => {

    const {type, payload} = action;

    switch(type){
        case airplanes.GETALL_SUCCESS:
            return {
                ...state,
                airplanes : payload
            };
        case airplanes.GETALL_FAILURE:
            return {
                ...state,
                error : payload
            }
        case airplanes.GETONE_SUCCESS:
            return {
                ...state,
                oneairplane : payload
            };
        case airplanes.GETONE_FAILURE:
            return {
                ...state,
                error : payload
            }
        default:
            return state;
    }

}