import { getServiceById } from "api";

const ACTIONS = {
    START_LOADING: 'DETAIL_START_LOADING',
    DATA_LOADED: 'DETAIL_DATA_LOADED',
    ERROR_LOADING: 'DETAIL_ERROR_LOADING',
}

const initialState = {
    service: {},
    isLoading: false,
}

const detailReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.START_LOADING:
            return { ...state, isLoading: true };
        case ACTIONS.DATA_LOADED:
            return { ...state, isLoading: false, service: action.payload };
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
        console.log(res.data);

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

export default detailReducer;