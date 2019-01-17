import { login } from "api";
import { load } from 'redux-localstorage-simple';

let userStore = load({ namespace: 'serviceApp' })

if (!userStore.login.user || !userStore.login.user.token) {
    userStore = {
        user: {
            token: ''
        }
    }
}


const ACTIONS = {
    LOGIN_START_LOADING: 'LOGIN_START_LOADING',
    LOGIN_DATA_LOADED: 'LOGIN_DATA_LOADED',
    LOGIN_ERROR_LOADING: 'LOGIN_ERROR_LOADING',
}


const loginReducer = (state = userStore, action) => {
    switch (action.type) {
        case ACTIONS.LOGIN_START_LOADING:
            return { ...state, isLoading: true };
        case ACTIONS.LOGIN_DATA_LOADED:
            return { ...state, isLoading: false, user: action.payload };
        default:
            return state;
    }
}

export const loginUser = (username, password) => async (dispatch) => {
    try {
        dispatch({
            type: ACTIONS.LOGIN_START_LOADING,
        });
        const res = await login(username, password);
        console.log(res.data)
        dispatch({
            type: ACTIONS.LOGIN_DATA_LOADED,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);

        dispatch({
            type: ACTIONS.LOGIN_ERROR_LOADING,
        });
    }
}

export default loginReducer;