import { getServices } from "api";
import { store } from 'index';


const ACTIONS = {
    START_LOADING: 'LIST_START_LOADING',
    DATA_LOADED: 'LIST_DATA_LOADED',
    ERROR_LOADING: 'LIST_ERROR_LOADING',
}

const initialState = {
    services: {
        next: '',
        page: 1,
        count: 0,
        results: []
    },
    isLoading: false,
}

const listReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.START_LOADING:
            return { ...state, isLoading: true };
        case ACTIONS.DATA_LOADED:
            return {
                ...state,
                isLoading: false,
                services: {
                    ...action.payload,
                    page: state.services.page + 1,
                    results: state.services.results.concat(...action.payload.results)
                }
            };
        case ACTIONS.ERROR_LOADING:
            return { ...state, isLoading: false, };
        default:
            return state;
    }
}


export const loadServices = () => async (dispatch) => {
    try {
        dispatch({
            type: ACTIONS.START_LOADING,
        });

        const res = await getServices(store.getState().list.services.page);

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

export default listReducer;