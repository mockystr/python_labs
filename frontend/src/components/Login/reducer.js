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

    LOGOUT_ACTION: 'LOGOUT_ACTION',
}

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.LOGIN_START_LOADING:
            return { ...state, isLoading: true };
        case ACTIONS.LOGIN_DATA_LOADED:
            return { ...state, isLoading: false, user: action.payload };
        case ACTIONS.LOGIN_ERROR_LOADING:
            return { ...state, isLoading: false, ...action.payload };
        case ACTIONS.LOGOUT_ACTION:
            return { isLoading: false, error: '', user: {} };
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
            type: ACTIONS.LOGOUT_ACTION,
        })
        cookie.remove('userData', { path: '/' });
        logout();
    } catch (err) {
        console.log(err);
    }
}

export default loginReducer;