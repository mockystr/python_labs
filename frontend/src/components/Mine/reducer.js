import { getMineServices, createServiceById, deleteServiceById } from "api";
import { store } from 'index';
import _ from 'lodash';

const ACTIONS = {
    MINE_START_LOADING: 'MINE_START_LOADING',
    MINE_DATA_LOADED: 'MINE_DATA_LOADED',
    MINE_ERROR_LOADING: 'MINE_ERROR_LOADING',

    CREATE_START_LOADING: 'CREATE_START_LOADING',
    CREATE_DATA_LOADED: 'CREATE_DATA_LOADED',
    CREATE_ERROR_LOADING: 'CREATE_ERROR_LOADING',

    DELETE_START_LOADING: 'DELETE_START_LOADING',
    DELETE_DATA_LOADED: 'DELETE_DATA_LOADED',
    DELETE_ERROR_LOADING: 'DELETE_ERROR_LOADING',
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

const mineReducer = (state = initialState, action) => {
    switch (action.type) {
        /* MINE */
        case ACTIONS.MINE_START_LOADING:
            return { ...state, isLoading: true };
        case ACTIONS.MINE_DATA_LOADED:
            return {
                ...state,
                isLoading: false,
                services: {
                    ...action.payload,
                    page: state.services.page + 1,
                    results: state.services.results.concat(...action.payload.results)
                }
            };
        case ACTIONS.MINE_ERROR_LOADING:
            return {
                ...state,
                isLoading: false,
            };

        /* CREATE */
        case ACTIONS.CREATE_START_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case ACTIONS.CREATE_DATA_LOADED:
            return {
                ...state,
                isLoading: false,
                services: {
                    results: [action.payload, ...state.services.results]
                }
            };
        case ACTIONS.CREATE_ERROR_LOADING:
            return {
                ...state,
                isLoading: false,
            };

        /* DELETE */
        case ACTIONS.DELETE_START_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case ACTIONS.DELETE_DATA_LOADED:
            return {
                ...state,
                isLoading: false,
                services: {
                    results: _.filter(state.services.results, (x) => (x.pk !== action.payload.id))
                }
            };
        case ACTIONS.DELETE_ERROR_LOADING:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
}


export const loadMineServices = (token) => async (dispatch) => {
    try {
        dispatch({
            type: ACTIONS.MINE_START_LOADING,
        });

        const res = await getMineServices(store.getState().list.services.page, token);

        dispatch({
            type: ACTIONS.MINE_DATA_LOADED,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: ACTIONS.MINE_ERROR_LOADING,
        });
    }
}

export const createService = (token, name, description, photo, price, active) => async (dispatch) => {
    try {
        dispatch({
            type: ACTIONS.CREATE_START_LOADING,
        });

        console.log('token', token);
        console.log('name', name);
        console.log('description', description);
        console.log('photo', photo);
        console.log('price', price);
        console.log('active', active);

        const res = await createServiceById(token, name, description, photo, price, active);
        console.log('res data create service ', res.data);

        dispatch({
            type: ACTIONS.CREATE_DATA_LOADED,
            payload: res.data
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: ACTIONS.CREATE_ERROR_LOADING,
        });
    }
}

export const deleteService = (id, token) => async (dispatch) => {
    try {
        dispatch({
            type: ACTIONS.DELETE_START_LOADING,
        });

        await deleteServiceById(id, token);

        dispatch({
            type: ACTIONS.DELETE_DATA_LOADED,
            payload: { id }
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: ACTIONS.DELETE_ERROR_LOADING,
        });
    }
}

export default mineReducer;