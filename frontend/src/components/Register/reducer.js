import { register } from "api";

const initialState = {
    user: {
        username: '',
        password1: '',
        password2: '',
        email: ''
    },
}

const ACTIONS = {
    START_LOADING: 'REGISTER_START_LOADING',
    DATA_LOADED: 'REGISTER_DATA_LOADED',
    ERROR_LOADING: 'REGISTER_ERROR_LOADING',
}

const registerReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.START_LOADING:
            return { ...state, isLoading: true };
        case ACTIONS.DATA_LOADED:
            return { ...state, isLoading: false, ...action.payload };
        case ACTIONS.ERROR_LOADING:
            return { ...state, isLoading: false, ...action.payload };
        default:
            return state;
    }
}

export const registerUser = (username, password1, password2, email) => async (dispatch) => {
    try {
        dispatch({
            type: ACTIONS.START_LOADING,
        });

        const res = await register(username, password1, password2, email);
        console.log(res);
        dispatch({
            type: ACTIONS.DATA_LOADED,
        });

    } catch (err) {
        console.log('ERROR HANDLED ', err);

        dispatch({
            type: ACTIONS.ERROR_LOADING,
            payload: { error: err }
        });
    }
}

export default registerReducer;