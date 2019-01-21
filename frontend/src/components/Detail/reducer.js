import { getServiceById, addUserToBids } from "api";

const ACTIONS = {
    START_LOADING: 'DETAIL_START_LOADING',
    DATA_LOADED: 'DETAIL_DATA_LOADED',
    ERROR_LOADING: 'DETAIL_ERROR_LOADING',

    DETAIL_ADD_START_LOADING: 'DETAIL_ADD_START_LOADING',
    DETAIL_ADD_DATA_LOADED: 'DETAIL_ADD_DATA_LOADED',
    DETAIL_ADD_ERROR_LOADING: 'DETAIL_ADD_ERROR_LOADING',
}

const initialState = {
    service: {
        customer: { username: '' }
    },
    isLoading: false,
}

const detailReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.START_LOADING:
            return { ...state, isLoading: true };
        case ACTIONS.DATA_LOADED:
            return { ...state, isLoading: false, service: action.payload };

        case ACTIONS.DETAIL_ADD_START_LOADING:
            return { ...state, isLoading: true, }
        case ACTIONS.DETAIL_ADD_DATA_LOADED:
            return { ...state, isLoading: false, }
        case ACTIONS.DETAIL_ADD_ERROR_LOADING:
            return { ...state, isLoading: false, }
        default:
            return state;
    }
}

export const loadServiceById = (id) => async (dispatch) => {
    try {
        dispatch({
            type: ACTIONS.START_LOADING,
        });
        const res = await getServiceById(id);

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

export const addToBids = (id, token) => async (dispatch) => {
    try {
        dispatch({
            type: ACTIONS.DETAIL_ADD_START_LOADING,
        });

        await addUserToBids(id, token);

        dispatch({
            type: ACTIONS.DETAIL_ADD_DATA_LOADED,
        });
    } catch (err) {
        console.log(err);

        dispatch({
            type: ACTIONS.DETAIL_ADD_ERROR_LOADING,
        });
    }
}

export default detailReducer;