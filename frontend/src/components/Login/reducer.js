import { login, logout } from "api";
import cookie from "react-cookies";

const userDataFromCookies = cookie.load('userData');

const initialState = {
    user: {
        token: '',
        username: ''
    },
    isLoading: false,
    error: ''
}

if (userDataFromCookies) {
    initialState.user = {
        token: userDataFromCookies.token, username: userDataFromCookies.username
    }
}

const ACTIONS = {
    LOGIN_START_LOADING: 'LOGIN_START_LOADING',
    LOGIN_DATA_LOADED: 'LOGIN_DATA_LOADED',
    LOGIN_ERROR_LOADING: 'LOGIN_ERROR_LOADING',

    LOGOUT_START_LOADING: 'LOGOUT_START_LOADING',
    LOGOUT_DATA_LOADED: 'LOGOUT_DATA_LOADED',
    LOGOUT_ERROR_LOADING: 'LOGOUT_ERROR_LOADING',
}

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.LOGIN_START_LOADING:
            return { ...state, isLoading: true };
        case ACTIONS.LOGIN_DATA_LOADED:
            return { ...state, isLoading: false, user: action.payload };
        case ACTIONS.LOGIN_ERROR_LOADING:
            return { ...state, isLoading: false, ...action.payload };
        case ACTIONS.LOGOUT_START_LOADING:
            return { ...state, isLoading: true }
        case ACTIONS.LOGOUT_DATA_LOADED:
            return { isLoading: false, error: '', user: {} };
        case ACTIONS.LOGOUT_ERROR_LOADING:
            return { isLoading: false, ...action.payload }
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
        console.log('loginUser res.data', res.data)

        dispatch({
            type: ACTIONS.LOGIN_DATA_LOADED,
            payload: { ...res.data, username },
        });

        cookie.save('userData', { ...res.data, username }, { path: '/' })
    } catch (err) {
        console.log('ERROR HANDLED ', err);

        dispatch({
            type: ACTIONS.LOGIN_ERROR_LOADING,
            payload: { error: err }
        });
    }
}

export const logoutUser = () => async (dispatch) => {
    try {
        dispatch({
            type: ACTIONS.LOGOUT_START_LOADING,
        })
        cookie.remove('userData', { path: '/' });
        logout();

        dispatch({
            type: ACTIONS.LOGOUT_DATA_LOADED,
        })
    } catch (err) {
        console.log(err);

        dispatch({
            type: ACTIONS.LOGOUT_ERROR_LOADING,
            payload: { error: err }
        })
    }
}

export default loginReducer;