import {
    SEARCH_USERS,
    SET_LOADING,
    SET_DIRTY,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS,
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        case SEARCH_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false,
                dirty: true,
            };
        case GET_USER:
            return {
                ...state,
                user: action.payload,
                loading: false,
            };
        case GET_REPOS:
            return {
                ...state,
                repos: action.payload,
                loading: false,
            };
        case CLEAR_USERS:
            return {
                ...state,
                users: [],
                loading: false,
                dirty: false,
            };
        case SET_DIRTY:
            return {
                ...state,
                dirty: action.payload,
            };
        default:
            return state;
    }
};
