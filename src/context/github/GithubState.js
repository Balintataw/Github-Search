import React, { useReducer } from 'react';
import axios from 'axios';

import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
    SEARCH_USERS,
    SET_LOADING,
    SET_DIRTY,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS,
} from '../types';

let githubClientId;
let githubClientSecret;
if (process.env.NODE_ENV === 'production') {
    githubClientId = process.env.GITHUB_CLIENT_ID;
    githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
} else {
    githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
}

const GithubState = props => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false,
        dirty: false,
    };

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    // SEARCH USERS
    const searchUsers = async name => {
        try {
            dispatch({ type: SET_LOADING, payload: true });

            const { data } = await axios.get(
                `https://api.github.com/search/users?q=${name}
                &client_id=${githubClientId}
                &client_secret=${githubClientSecret}`
            );
            dispatch({ type: SEARCH_USERS, payload: data.items });
        } catch (err) {
            throw new Error('Error getting search results: ', err);
        }
    };
    // GET USER
    const getUser = async name => {
        try {
            dispatch({ type: SET_LOADING, payload: true });
            const { data } = await axios.get(
                `https://api.github.com/users/${name}?client_id=${githubClientId}&client_secret=${githubClientSecret}`
            );
            dispatch({ type: GET_USER, payload: data });
        } catch (err) {
            throw new Error('Error getting users data: ', err);
        }
    };
    // GET REPOS
    const getUserRepos = async name => {
        try {
            dispatch({ type: SET_LOADING, payload: true });
            const { data } = await axios.get(
                `https://api.github.com/users/${name}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`
            );
            dispatch({ type: GET_REPOS, payload: data });
        } catch (err) {
            throw new Error('Error getting users data: ', err);
        }
    };
    // CLEAR USERS
    const clearUsers = () => {
        dispatch({ type: CLEAR_USERS });
        dispatch({ type: SET_DIRTY, payload: false });
    };

    return (
        <GithubContext.Provider
            value={{
                users: state.users,
                user: state.user,
                dirty: state.dirty,
                repos: state.repos,
                loading: state.loading,
                searchUsers,
                clearUsers,
                getUser,
                getUserRepos,
            }}
        >
            {props.children}
        </GithubContext.Provider>
    );
};

export default GithubState;
