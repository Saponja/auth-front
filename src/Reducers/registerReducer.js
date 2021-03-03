import * as actions from '../actiontypes'

const initialState = {
    registering : false
}

export const registerReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.register.REGISTER_REQUEST:
            return {
                ...state,
                registering : true,
            }
        case actions.register.REGISTER_FAILURE:
            return {
                ...state,
                registering : false,
                error : action.payload
        }
        case actions.register.REGISTER_SUCCESS:
            return {
                ...state,
                registering : true,
                data : action.payload
        }
        default:
            return state;
    }
}