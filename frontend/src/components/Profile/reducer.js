import { getProfileByUsername } from "api";

const ACTIONS = {
    START_LOADING: 'PROFILE_START_LOADING',
    DATA_LOADED: 'PROFILE_DATA_LOADED',
    ERROR_LOADING: 'PROFILE_ERROR_LOADING',
}

const initialState = {
    user: {
        username: ''
    },
    isLoading: false,
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.START_LOADING:
            return { ...state, isLoading: true };
        case ACTIONS.DATA_LOADED:
            return { ...state, isLoading: false, user: action.payload };
        default:
            return state;
    }
}

export const loadProfile = (username) => async (dispatch) => {
    try {
        dispatch({
            type: ACTIONS.START_LOADING,
        });
        const res = await getProfileByUsername(username);

        dispatch({
            type: ACTIONS.DATA_LOADED,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);

        dispatch({
            type: ACTIONS.ERROR_LOADING,
        });
    }
}

export default profileReducer;