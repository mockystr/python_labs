import { login, logout } from "api";
import { load } from 'redux-localstorage-simple';

const initialState = {
    user: {
        username: '',
        token: ''
    },
    isLoading: false,
    error: ''
}

let globalStore = load({ states: ['login'] })

if (!globalStore.user || !globalStore.user.token) {
    globalStore = {
        user: {
            username: '',
            token: ''
        },
        isLoading: false,
        error: ''
    }
}


const ACTIONS = {
    LOGIN_START_LOADING: 'LOGIN_START_LOADING',
    LOGIN_DATA_LOADED: 'LOGIN_DATA_LOADED',
    LOGIN_ERROR_LOADING: 'LOGIN_ERROR_LOADING',
    LOGOUT_ACTION: 'LOGOUT_ACTION',
}


const loginReducer = (state = globalStore, action) => {
    switch (action.type) {
        case ACTIONS.LOGIN_START_LOADING:
            return { ...state, isLoading: true };
        case ACTIONS.LOGIN_DATA_LOADED:
            return { ...state, isLoading: false, user: action.payload };
        case ACTIONS.LOGIN_ERROR_LOADING:
            return { ...state, isLoading: false, ...action.payload };
        case ACTIONS.LOGOUT_ACTION:
            return { user: {}, };
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
            payload: { ...res.data, username },
        });
    } catch (err) {
        console.log('ERROR HANDLED ', err);
        dispatch({
            type: ACTIONS.LOGIN_ERROR_LOADING,
            payload: { error: err }
        });
    }
}

export const logoutUser = (username, password) => async (dispatch) => {
    try {
        logout();
        dispatch({
            type: ACTIONS.LOGOUT_ACTION,
        })
    } catch (err) {
        console.log(err);
    }
}

export default loginReducer;