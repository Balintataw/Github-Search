import React, { useReducer } from 'react';
import { SET_ALERT, REMOVE_ALERT } from '../types';

import AlertContext from './alertContext';
import AlertReducer from './alertReducer';

const AlertState = props => {
    const initialState = null;

    const [state, dispatch] = useReducer(AlertReducer, initialState);

    const setAlert = (type, message) => {
        dispatch({ type: SET_ALERT, payload: { type, message } });
        setTimeout(() => dispatch({ type: REMOVE_ALERT }), 3000);
    };

    return (
        <AlertContext.Provider
            value={{
                alert: state,
                setAlert,
            }}
        >
            {props.children}
        </AlertContext.Provider>
    );
};

export default AlertState;
